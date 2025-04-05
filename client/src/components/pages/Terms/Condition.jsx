import React from 'react';
import { motion } from 'framer-motion';

const Condition = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Terms and Conditions</h1>
      
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using RapidBite's services, you agree to be bound by these Terms and Conditions. 
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">2. Ordering and Delivery</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Orders are subject to availability of items</li>
            <li>Delivery time estimates are approximate and not guaranteed</li>
            <li>Minimum order value may apply for delivery</li>
            <li>Free delivery is available for orders above ₹250</li>
            <li>Delivery charges of ₹40 apply for orders below ₹250</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">3. Pricing and Payment</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>All prices are inclusive of applicable taxes</li>
            <li>CGST and SGST of 9% each are applied to all orders</li>
            <li>A 10% discount is applied to all orders</li>
            <li>Payment must be made in full at the time of ordering</li>
            <li>We accept various payment methods including credit/debit cards and digital wallets</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">4. Cancellation Policy</h2>
          <p className="text-gray-700">
            Orders can be cancelled before the restaurant starts preparing your food. 
            Once preparation begins, cancellation may not be possible. 
            For cancellations, please contact our customer support immediately.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">5. Quality Assurance</h2>
          <p className="text-gray-700">
            We strive to maintain the highest quality standards for all our food items. 
            However, if you are not satisfied with your order, please contact our customer support 
            within 24 hours of delivery for assistance.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">6. Privacy Policy</h2>
          <p className="text-gray-700">
            Your privacy is important to us. We collect and use your personal information 
            only for the purpose of providing our services and improving your experience. 
            Please refer to our Privacy Policy for detailed information.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
          <p className="text-gray-700">
            RapidBite reserves the right to modify these terms at any time. 
            Changes will be effective immediately upon posting to our website. 
            Your continued use of our services constitutes acceptance of any modified terms.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default Condition;
