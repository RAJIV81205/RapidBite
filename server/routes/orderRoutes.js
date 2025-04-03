import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Products.js';
import User from '../models/User.js';
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
        await sendEmail(req.user.email, "Order created successfully", `Your order ${orderId} has been created successfully`, newOrder);
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
        const user = await User.findById(order.userId);
        res.status(200).json({ message: "Order status updated successfully", order });
        await sendEmail(user.email, "Order status updated", `Your order ${order.orderId} has been ${status}`, order);
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
        const user = await User.findById(order.userId);
        await sendEmail(user.email, "Order canceled", `Your order ${order.orderId} has been canceled`, order);

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

const sendEmail = async (email, subject, text, order) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
                user: '898553001@smtp-brevo.com',
                pass: process.env.PASSWORD,
            },
        });

        // Verify transporter configuration
        await transporter.verify();

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                    }
                    .header {
                        background-color: #4CAF50;
                        color: white;
                        padding: 20px;
                        text-align: center;
                        border-radius: 5px 5px 0 0;
                    }
                    .content {
                        padding: 20px;
                        background-color: #f9f9f9;
                        border: 1px solid #ddd;
                        border-top: none;
                        border-radius: 0 0 5px 5px;
                    }
                    .order-details {
                        background-color: white;
                        padding: 15px;
                        border-radius: 5px;
                        margin-bottom: 20px;
                    }
                    .items-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    .items-table th, .items-table td {
                        padding: 12px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    .items-table th {
                        background-color: #f5f5f5;
                    }
                    .total-section {
                        text-align: right;
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 2px solid #eee;
                    }
                    .footer {
                        text-align: center;
                        padding: 20px;
                        color: #666;
                        font-size: 14px;
                        margin-top: 20px;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #4CAF50;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Order Confirmation</h1>
                        <p>Order ID: ${order.orderId}</p>
                    </div>
                    
                    <div class="content">
                        <p>Dear Customer,</p>
                        <p>${text}</p>
                        
                        <div class="order-details">
                            <h3>Order Details</h3>
                            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                            <p><strong>Delivery Address:</strong> ${order.address}, ${order.city}, ${order.state} - ${order.pincode}</p>
                            <p><strong>Contact:</strong> ${order.mobile}</p>
                        </div>

                        <h3>Order Items</h3>
                        <table class="items-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.items.map(item => `
                                    <tr>
                                        <td>${item.name}</td>
                                        <td>${item.quantity}</td>
                                        <td>${item.price}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>

                        <div class="total-section">
                            <h3>Total Amount: ₹${order.totalAmount}</h3>
                        </div>

                        <div style="text-align: center;">
                            <a href="${process.env.FRONTEND_URL}/track/${order._id}" class="button">View Order Details</a>
                        </div>
                    </div>

                    <div class="footer">
                        <p>If you have any questions, please don't hesitate to contact us.</p>
                        <p>Best regards,<br>RapidBite Team</p>
                    </div>
                </div>
            </body>
            </html>
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