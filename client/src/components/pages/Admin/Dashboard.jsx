import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { Package, ShoppingBag, Settings, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import Swal from 'sweetalert2';
import { TableRowSkeleton } from "../../Skeletons";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
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

          {/* Recent Orders Table Skeleton */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <TableRowSkeleton key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Products Skeleton */}
          <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 animate-pulse">
                    <div className="h-32 bg-gray-200 rounded mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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