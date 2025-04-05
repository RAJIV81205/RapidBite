import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

function generateorderID () { 
    const order = Math.floor(Math.random() * 1000000000).toString() 
    return order
}


router.post("/create-checkout-session", verifyToken, async (req, res) => {
    const { amount, customer_name, customer_phone, customer_email } = req.body;
    console.log('Request body:', req.body);

    const requestBody = {
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
            customer_id: req.user._id,
            customer_phone: customer_phone,
            customer_email: customer_email,
            customer_name: customer_name
        },
        order_id: generateorderID(),
        order_meta: {
            payment_methods: "upi"
        }
    };

    const options = {
        method: 'POST',
        headers: {
            'x-api-version': '2023-08-01',
            'x-client-id': process.env.CASHFREE_CLIENT_ID,
            'x-client-secret': process.env.CASHFREE_SECRET_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    };

    try {
        console.log('Making request to Cashfree with options:', {
            ...options,
            headers: {
                ...options.headers,
                'x-client-secret': '***' // Hide the secret key in logs
            }
        });

        const response = await fetch('https://sandbox.cashfree.com/pg/orders', options);
        const data = await response.json();

        if (response.ok) {
            res.status(200).json(data);
        } else {
            console.error('Cashfree API Error:', {
                status: response.status,
                statusText: response.statusText,
                data: data
            });
            res.status(response.status).json({ message: 'Error creating order', error: data });
        }
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

export default router;