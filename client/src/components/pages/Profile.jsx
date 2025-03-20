import React, { useState, useEffect } from 'react';
import { User, ShoppingBag, LogOut, Settings, Heart, Save, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    state: '',
    city: '',
    address: '',
    pincode: '',
    createdAt: '',
  });
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    state: '',
    city: '',
    address: '',
    pincode: '',
  });

  useEffect(() => {
    fetchUserData();
    fetchOrders();
  }, []);

  const url = import.meta.env.VITE_BACKEND_URL;

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/verify-token`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data.user);
      setFormData({
        name: data.user.name,
        email: data.user.email,
        mobile: data.user.mobile || '',
        gender: data.user.gender || '',
        state: data.user.state || '',
        city: data.user.city || '',
        address: data.user.address || '',
        pincode: data.user.pincode || '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json(); 
      console.log('Orders data:', data);
      
      // Check if data exists and has orders property
      if (data && Array.isArray(data)) {
        setOrders(data);
      } else if (data && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
        console.error('Invalid orders data structure:', data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setUserData(data.user);
      setIsEditing(false);
      setError(null);
      
      // Show success message
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
      console.error('Profile update error:', err);
    }
  };

  const menuItems = [
    { id: 'info', label: 'My Info', icon: <User size={20} /> },
    { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={20} /> },
    { id: 'favorites', label: 'Favorites', icon: <Heart size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-green-600 shadow-lg">
                      {getInitials(userData.name)}
                    </div>
                    <div className="text-white">
                      <h2 className="text-2xl font-bold">{userData.name || 'User'}</h2>
                      <p className="text-green-100">{userData.email}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                  ) : error ? (
                    <div className="text-red-600 text-center py-4">{error}</div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 disabled:bg-gray-50 p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 disabled:bg-gray-50 p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Mobile</label>
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 disabled:bg-gray-50 p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Gender</label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 disabled:bg-gray-50 p-2"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">State</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 disabled:bg-gray-50 p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 disabled:bg-gray-50 p-2"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Address</label>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 disabled:bg-gray-50 p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Pincode</label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 disabled:bg-gray-50 p-2"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4 pt-6 border-t">
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setIsEditing(false);
                                setFormData({
                                  name: userData.name,
                                  email: userData.email,
                                  mobile: userData.mobile || '',
                                  gender: userData.gender || '',
                                  state: userData.state || '',
                                  city: userData.city || '',
                                  address: userData.address || '',
                                  pincode: userData.pincode || '',
                                });
                              }}
                              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center font-medium transition-colors duration-200"
                            >
                              <X size={18} className="mr-2" />
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center font-medium transition-colors duration-200"
                            >
                              <Save size={18} className="mr-2" />
                              Save Changes
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors duration-200"
                          >
                            Edit Profile
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="p-6 font-poppins">
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <div className="bg-white rounded-lg shadow p-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : error ? (
                <div className="text-red-600 text-center py-4">{error}</div>
              ) : orders.length === 0 ? (
                <div className="text-gray-500 text-center py-4">No orders found</div>
              ) : (
                orders.map((order) => (
                  <Link to={`/track/${order._id}`} key={order._id || order.id}>
                  <div key={order._id || order.id} className="border-b py-4 last:border-b-0 ">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order #{order.orderId || order._id}</p>
                        <p className="text-sm text-gray-500">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Date not available'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                         ₹{(order.totalAmount || 0).toFixed(2)}
                        </p>
                        <p className={`text-sm ${
                          order.status === 'delivered' ? 'text-green-500' :
                          order.status === 'pending' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`}>
                          {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown Status'}
                        </p>
                      </div>
                    </div>
                  </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        );
      case 'favorites':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">No favorites found</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notifications</label>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500" />
                      <span className="ml-2">Email notifications</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <button className="mt-2 text-green-600 hover:text-green-800">Change Password</button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 pt-15">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
              {getInitials(userData.name)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Profile</h1>
              <p className="text-sm text-gray-500">{userData.email}</p>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3.5 text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${
                activeTab === item.id ? 'bg-green-50 text-green-600 border-r-4 border-green-600 font-medium' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <button className="w-full flex items-center px-6 py-3.5 text-red-600 hover:bg-red-50 mt-4 transition-colors duration-200" onClick={() => {
            localStorage.removeItem('token');
            navigate('/auth');
          }}>
            <LogOut size={20} className="mr-3" />
            Log Out
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;