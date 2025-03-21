import React from 'react'
import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import { Package, CheckCircle2, Truck, Clock } from 'lucide-react'
import { useState, useEffect } from 'react';

const Track = () => {
  const { orderId } = useParams();
  const url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('token');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  const statuses = [
    { id: "pending", label: "Pending", icon: Clock },
    { id: "confirmed", label: "Confirmed", icon: CheckCircle2 },
    { id: "shipped", label: "Shipped", icon: Truck },
    { id: "delivered", label: "Delivered", icon: Package }
  ];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${url}/orders/${orderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json();
        console.log(data);
        setOrder(data.order);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
    
  }, [orderId, url]);

  useEffect(() => {
    if (order && order.status) {
      const index = statuses.findIndex(s => s.id === order.status);
      setCurrentStatusIndex(index !== -1 ? index : 0);
    }
  }, [order]);

  
 

 
 

  

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      Error: {error}
    </div>
  );

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center">
      Order not found
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 font-poppins my-20 bg-gray-800 rounded-xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Order #{order.orderId}</h1>
        <span className={`px-4 py-1 rounded-full text-sm font-medium capitalize
          ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            order.status === 'canceled' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'}`}>
          {order.status}
        </span>
      </div>

      {order.status === 'canceled' ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-2">This order has been canceled.</h2>
          <p>If you have any questions, please contact support.</p>
        </div>
      ) : (
        <>
          {/* Status Timeline */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-green-500" />
                Delivery Details
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="text-gray-500 w-20">Address:</span>
                  <span className="font-medium">{order.address}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-20">City:</span>
                  <span className="font-medium">{order.city}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-20">State:</span>
                  <span className="font-medium">{order.state}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-20">Pin Code:</span>
                  <span className="font-medium">{order.pincode}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-20">Mobile:</span>
                  <span className="font-medium">{order.mobile}</span>
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-green-500" />
                Order Summary
              </h2>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">{item.price}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-sm text-gray-500 flex justify-between items-center bg-gray-50 rounded-lg p-4"
      >
        <div>
          <p>Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
          <p>Last updated: {new Date(order.updatedAt).toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p>Order ID: {order.orderId}</p>
          <p>User ID: {order.userId}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Track;
