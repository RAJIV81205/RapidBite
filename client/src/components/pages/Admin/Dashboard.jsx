import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { Package, ShoppingBag, Settings, LogOut } from 'lucide-react';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateAdmin = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        await Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'You must be logged in as an admin to access this page.',
        });
        navigate('/auth', { replace: true });
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/verify-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok || data.user.userType !== 'admin') {
          await Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'You do not have admin privileges.',
          });
          navigate('/auth', { replace: true });
        }
      } catch (error) {
        console.error('Authentication error:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to authenticate. Please try again.',
        });
        navigate('/auth', { replace: true });
      }
    };

    authenticateAdmin();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b bg-gradient-to-r from-green-500 to-green-600 text-white">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            to="/admin/products"
            className="flex items-center p-3 rounded-lg hover:bg-green-100 transition-all duration-200"
          >
            <Package className="w-5 h-5 mr-3 text-green-500" />
            <span className="font-medium text-gray-700">Products</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center p-3 rounded-lg hover:bg-green-100 transition-all duration-200"
          >
            <ShoppingBag className="w-5 h-5 mr-3 text-green-500" />
            <span className="font-medium text-gray-700">Orders</span>
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center p-3 rounded-lg hover:bg-green-100 transition-all duration-200"
          >
            <Settings className="w-5 h-5 mr-3 text-green-500" />
            <span className="font-medium text-gray-700">Settings</span>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/auth', { replace: true });
            }}
            className="flex items-center p-3 rounded-lg hover:bg-red-100 transition-all duration-200 w-full text-red-500"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;