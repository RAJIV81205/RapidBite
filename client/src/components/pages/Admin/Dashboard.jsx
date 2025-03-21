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
    <div className="flex min-h-screen bg-gray-100 mt-15">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="p-4">
          <Link to="/admin/products" 
            className="flex items-center p-3 mb-2 rounded hover:bg-gray-100">
            <Package className="w-5 h-5 mr-3" />
            Products
          </Link>
          <Link to="/admin/orders" 
            className="flex items-center p-3 mb-2 rounded hover:bg-gray-100">
            <ShoppingBag className="w-5 h-5 mr-3" />
            Orders
          </Link>
          <Link to="/admin/settings" 
            className="flex items-center p-3 mb-2 rounded hover:bg-gray-100">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/auth', { replace: true });
            }} 
            className="flex items-center p-3 mb-2 rounded hover:bg-gray-100 w-full text-red-500">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;