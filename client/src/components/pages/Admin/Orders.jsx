import React, { useState, useEffect } from "react";
import { Link } from "react-router";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statuses = [
    { id: "pending", label: "Pending" },
    { id: "confirmed", label: "Confirmed" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/orders/${orderId}/cancel`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) { 
        console.error("Error canceling order:", data.message);
        return;
      }
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Orders Management</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm sm:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order._id}
                className={order.status === "canceled" ? "bg-red-50" : ""}
              >
                <td className="px-4 sm:px-6 py-4">
                  <Link
                    to={`/track/${order._id}`}
                    className={`${
                      order.status === "canceled"
                        ? "text-red-500"
                        : "text-blue-800 hover:text-blue-500"
                    }`}
                  >
                    {order.orderId}
                  </Link>
                </td>
                <td className="px-4 sm:px-6 py-4">{order.userId}</td>
                <td className="px-4 sm:px-6 py-4">₹{order.totalAmount}</td>
                <td className="px-4 sm:px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${getStatusBgColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  {order.status !== "canceled" ? (
                    <div className="space-x-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                        className="border rounded p-1 mb-2"
                      >
                        {statuses.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Cancel Order
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">No actions available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
