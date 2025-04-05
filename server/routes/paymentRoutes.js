import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import dotenv from 'dotenv';


dotenv.config();

const router = express.Router();

function generateorderID() {
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

        const response = await fetch('https://api.cashfree.com/pg/orders', options);
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

router.post("/get-order-status", verifyToken, async (req, res) => {
    const { order_id } = req.body;
    const maxAttempts = 12; // Check every 5 seconds for 1 minute (12 attempts)
    let attempts = 0;

    const checkOrderStatus = async () => {
        const options = {
            method: 'GET',
            headers: {
                'x-api-version': '2023-08-01',
                'x-client-id': process.env.CASHFREE_CLIENT_ID,
                'x-client-secret': process.env.CASHFREE_SECRET_KEY,
            }
        };

        try {
            const response = await fetch(`https://api.cashfree.com/pg/orders/${order_id}`, options);
            const data = await response.json();
            
            if (response.ok) {
                if (data.order_status === 'PAID') {
                    return { success: true, data };
                }
                return { success: false, data };
            } else {
                console.error('Error fetching order status:', data);
                return { success: false, error: data };
            }
        } catch (error) {
            console.error('Error in checkOrderStatus:', error);
            return { success: false, error };
        }
    };

    try {
        while (attempts < maxAttempts) {
            const result = await checkOrderStatus();
            
            if (result.success && result.data.order_status === 'PAID') {
                return res.status(200).json(result.data);
            }
            
            attempts++;
            if (attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before next attempt
            }
        }

        // If we've exhausted all attempts
        const finalCheck = await checkOrderStatus();
        if (finalCheck.success) {
            res.status(200).json(finalCheck.data);
        } else {
            res.status(400).json({ 
                message: 'Order status check timed out', 
                finalStatus: finalCheck.data?.order_status || 'UNKNOWN' 
            });
        }
    } catch (error) {
        console.error('Error in order status polling:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

export default router;