import React from 'react'
import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import { Package, CheckCircle2, Truck, Clock } from 'lucide-react'

const Track = () => {
  const { orderId } = useParams();
  
  // Mock data - replace with actual data from your backend
  const orderStatus = "confirmed";
  const orderDetails = {
    items: [
      { name: "Burger", quantity: 2, price: 12.99 },
      { name: "Fries", quantity: 1, price: 4.99 },
      { name: "Soda", quantity: 2, price: 2.99 }
    ],
    subtotal: 28.95,
    tax: 2.90,
    deliveryFee: 3.00,
    total: 34.85
  };

  const statuses = [
    { id: "pending", label: "Pending", icon: Clock },
    { id: "confirmed", label: "Confirmed", icon: CheckCircle2 },
    { id: "shipped", label: "Shipped", icon: Truck },
    { id: "delivered", label: "Delivered", icon: Package }
  ];

  const currentStatusIndex = statuses.findIndex(s => s.id === orderStatus);

  return (
    <div className="max-w-4xl mx-auto p-6 font-poppins">
      <h1 className="text-2xl font-bold mb-8">Track Order #{orderId}</h1>
      
      {/* Status Container */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="relative flex justify-between">
          {/* Connecting Line */}
          <div className="absolute top-8 left-[2rem] right-[2rem] h-1 bg-gray-200 -z-10 rounded-full">
            <motion.div 
              className="h-full bg-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
          
          {statuses.map((status, index) => {
            const Icon = status.icon;
            const isActive = currentStatusIndex >= index;
            
            return (
              <motion.div
                key={status.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center relative"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                  isActive ? 'bg-green-500' : 'bg-gray-200'
                }`}>
                  <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <div className="text-center">
                  <h3 className={`font-semibold text-sm ${isActive ? 'text-green-500' : 'text-gray-500'}`}>
                    {status.label}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isActive ? 'Completed' : 'Pending'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Order Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        
        {/* Items */}
        <div className="mb-6">
          {orderDetails.items.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500 ml-2">x{item.quantity}</span>
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${orderDetails.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${orderDetails.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${orderDetails.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>${orderDetails.total.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Track;
