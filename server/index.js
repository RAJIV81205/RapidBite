import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

dotenv.config();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', productRoutes);
app.use('/api/payment', paymentRoutes);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});










