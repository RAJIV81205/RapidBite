import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Products.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

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
        const order = await Order.findByIdAndUpdate(req.params.orderId, { status }, { new: true });
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

export default router; 