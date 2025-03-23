import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { Package, ShoppingBag, Settings, LogOut, Menu } from 'lucide-react';
import Swal from 'sweetalert2';
import { TableRowSkeleton } from "../../Skeletons";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 font-poppins">
        <div className="max-w-[95%] sm:max-w-[80%] mx-auto py-4 sm:py-6">
          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-32 mb-4" />
                <div className="h-6 bg-gray-200 rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-600">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {/* Analytics Box */}
          <div 
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer group"
            onClick={() => navigate('/admin')}
          >
            <div className="flex items-center gap-4">
              <div  className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Analytics</h3>
                <p className="text-sm text-gray-500">View analytics</p>
              </div>
            </div>
          </div>

          {/* Products Box */}
          <div 
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer group"
            onClick={() => navigate('/admin/products')}
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-50 p-3 rounded-lg group-hover:bg-green-100 transition-colors">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Products</h3>
                <p className="text-sm text-gray-500">Manage your products</p>
              </div>
            </div>
          </div>

          {/* Orders Box */}
          <div 
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer group"
            onClick={() => navigate('/admin/orders')}
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Orders</h3>
                <p className="text-sm text-gray-500">View and manage orders</p>
              </div>
            </div>
          </div>

          {/* Settings Box */}
          <div 
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer group"
            onClick={() => navigate('/admin/settings')}
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-50 p-3 rounded-lg group-hover:bg-purple-100 transition-colors">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">Settings</h3>
                <p className="text-sm text-gray-500">Configure your store</p>
              </div>
            </div>
          </div>

          {/* Logout Box */}
          <div 
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer group"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-3 rounded-lg group-hover:bg-red-100 transition-colors">
                <LogOut className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors">Logout</h3>
                <p className="text-sm text-gray-500">Sign out of your account</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;