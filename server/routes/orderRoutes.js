import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Products.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const generateOrderId = () => {
    return Math.floor(Math.random() * 10000000);
};

router.post('/create-order', verifyToken, async (req, res) => {
    try {
        const { items, totalAmount, address, city, state, pincode, mobile } = req.body;
        
        const orderId = generateOrderId();

        const newOrder = new Order({
            orderId,
            userId: req.user._id,
            items,
            totalAmount,
            address,
            city,
            state,
            pincode,
            mobile: parseFloat(parseFloat(mobile).toFixed(2)),
        });

        await newOrder.save();

        res.status(201).json({ message: "Order created successfully", orderId, newOrder });
        await sendEmail(req.user.email, "Order created successfully", `Your order ${orderId} has been created successfully`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/orders/:orderId', verifyToken, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.orderId });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
       
        if (req.user.userType === 'admin' || order.userId.toString() === req.user._id.toString()) {
            return res.status(200).json({ order });
        }
        return res.status(403).json({ message: "Unauthorized" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Admin routes
router.get('/admin/orders', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.patch('/admin/orders/:orderId', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.orderId, { status , updatedAt: Date.now() }, { new: true });
        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/admin/orders/:orderId/cancel', verifyToken , async (req, res) => {
    try {
        const { orderId } = req.params;

        if (req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const order = await Order.findOne({ _id: orderId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.status === 'canceled') {
            return res.status(400).json({ message: 'Order is already canceled' });
        }

        order.status = 'canceled';
        order.updatedAt = Date.now();
        await order.save();

        res.status(200).json({ message: 'Order canceled successfully', order });
    } catch (error) {
        console.error('Error canceling order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/admin/analytics', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        const totalRevenue = orders.reduce((total, order) => order.status !== 'canceled' ? total + order.totalAmount : total, 0);
        const totalOrders = orders.filter(order => order.status !== 'canceled').length;
        const products = await Product.find();
        const totalProducts = products.length;
        res.status(200).json({ totalRevenue, totalOrders, totalProducts });
    } catch (error) {
        console.log(error); 
        res.status(500).json({ message: "Internal server error" });
    }
});

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'oraxle81205@gmail.com',
                pass: process.env.PASSWORD,
            },
        });

        // Verify transporter configuration
        await transporter.verify();

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Order Confirmation</h2>
                <p>Dear Customer,</p>
                <p>${text}</p>
                <hr style="border: 1px solid #eee; margin: 20px 0;">
                <p style="color: #666; font-size: 14px;">
                    Best regards,<br>
                    RapidBite Team
                </p>
            </div>
        `;

        const mailOptions = {
            from: {
                name: 'RapidBite',
                address: 'oraxle81205@gmail.com'
            },
            to: email,
            subject: subject,
            html: htmlContent,
            headers: {
                'List-Unsubscribe': `<mailto:oraxle81205@gmail.com?subject=unsubscribe>`,
                'Precedence': 'bulk',
                'X-Auto-Response-Suppress': 'OOF, AutoReply'
            }
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Detailed error sending email:', {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response,
            responseCode: error.responseCode
        });
    }
};

export default router; 