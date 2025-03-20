import React from 'react';
import { Link, Outlet } from 'react-router';
import { Package, ShoppingBag, Settings, LogOut } from 'lucide-react';

const Dashboard = () => {
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
            onClick={() => {/* Add logout logic */}} 
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