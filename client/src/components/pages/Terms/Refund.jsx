import React from 'react';
import { motion } from 'framer-motion';

const Refund = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Refund Policy</h1>
      
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">1. General Refund Policy</h2>
          <p className="text-gray-700">
            At RapidBite, we strive to ensure complete customer satisfaction. 
            If you are not satisfied with your order, we offer refunds under specific circumstances 
            as outlined in this policy.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">2. Eligibility for Refunds</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Wrong or incomplete order delivery</li>
            <li>Quality issues with the food items</li>
            <li>Significant delay in delivery (beyond estimated time)</li>
            <li>Order cancellation before preparation begins</li>
            <li>Technical issues during payment processing</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">3. Refund Process</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Contact our customer support within 24 hours of delivery</li>
            <li>Provide your order details and reason for refund</li>
            <li>Submit any relevant photos or evidence if applicable</li>
            <li>Our team will review your request within 24-48 hours</li>
            <li>If approved, refund will be processed to your original payment method</li>
          </ol>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">4. Refund Timeline</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Credit/Debit Card: 5-7 business days</li>
            <li>Digital Wallets: 24-48 hours</li>
            <li>UPI Payments: 24-48 hours</li>
            <li>Net Banking: 3-5 business days</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">5. Non-Refundable Items</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Orders that have been partially consumed</li>
            <li>Orders cancelled after preparation has begun</li>
            <li>Delivery charges for cancelled orders</li>
            <li>Customized or special orders</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">6. Contact Information</h2>
          <p className="text-gray-700">
            For any refund-related queries, please contact our customer support at:
            <br />
            Email: lucky81205login@gmail.com
            <br />
            Hours: 9:00 AM - 9:00 PM, 7 days a week
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">7. Policy Updates</h2>
          <p className="text-gray-700">
            RapidBite reserves the right to modify this refund policy at any time. 
            Any changes will be effective immediately upon posting to our website. 
            We encourage you to review this policy periodically.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default Refund;
