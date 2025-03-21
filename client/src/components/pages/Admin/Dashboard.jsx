import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-';
import { Package, ShoppingBag, Settings, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLink = ({ to, icon: Icon, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center p-3 rounded-lg hover:bg-green-100 transition-all duration-200"
    >
      <Icon className="w-5 h-5 mr-3 text-green-500" />
      <span className="font-medium text-gray-700">{children}</span>
    </Link>
  );

  const MobileNavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      onClick={() => setIsMobileMenuOpen(false)}
      className="flex items-center p-3 rounded-lg hover:bg-green-100 transition-all duration-200"
    >
      <Icon className="w-5 h-5 mr-3 text-green-500" />
      <span className="font-medium text-gray-700">{children}</span>
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-green-600">Admin Panel</h2>
          </div>
          <div className="relative">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            {isMobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <MobileNavLink to="/admin/products" icon={Package}>
                  Products
                </MobileNavLink>
                <MobileNavLink to="/admin/orders" icon={ShoppingBag}>
                  Orders
                </MobileNavLink>
                <MobileNavLink to="/admin/settings" icon={Settings}>
                  Settings
                </MobileNavLink>
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
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-lg">
        <div className="p-6 border-b bg-gradient-to-r from-green-500 to-green-600 text-white">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink to="/admin/products" icon={Package} onClick={() => {}}>
            Products
          </NavLink>
          <NavLink to="/admin/orders" icon={ShoppingBag} onClick={() => {}}>
            Orders
          </NavLink>
          <NavLink to="/admin/settings" icon={Settings} onClick={() => {}}>
            Settings
          </NavLink>
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
      <div className="flex-1 p-4 lg:p-8 bg-gray-100 mt-16 lg:mt-0">
        <div className="bg-white shadow-md rounded-lg p-4 lg:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;