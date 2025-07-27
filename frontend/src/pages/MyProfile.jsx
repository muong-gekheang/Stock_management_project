// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import Header from '../components/Header';
import axios from 'axios';

function ProfilePage({ onMenuClick }) {
  const [user, setUser] = useState({
    UserID: '',
    Username: '',
    Email: '',
    StoreName: '',
    StoreCategory: '',
    JoinDate: '',
    ImageURL: '',
    totalProducts: 0,
    totalSales: 0,
    weeklyRevenue: 0,
    lowStockProducts: 0,
  });

  const [editData, setEditData] = useState({});
  const [previewImage, setPreviewImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const [profileRes, dashRes] = await Promise.all([
          axios.get('http://localhost:3001/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:3001/api/dashboard', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const userData = profileRes.data;
        const dashData = dashRes.data;

        setUser({
          ...userData,
          totalProducts: dashData.totalProducts || 0,
          totalSales: dashData.today?.totalOrders || 0,
          weeklyRevenue: dashData.weeklySales?.revenue || 0,
          lowStockProducts: dashData.lowStockAlerts?.length || 0,
        });

        setEditData({
          Username: userData.Username || '',
          Email: userData.Email || '',
          StoreName: userData.StoreName || '',
          StoreCategory: userData.StoreCategory || '',
          ImageURL: userData.ImageURL || '',
        });
        setPreviewImage(userData.ImageURL || 'https://via.placeholder.com/150');
      } catch (err) {
        setMessage('❌ Failed to load profile or stats.');
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (e) => {
    if (!isEditing) {
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setEditData((prev) => ({ ...prev, ImageURL: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3001/api/users/profile', editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...user, ...editData });
      setIsEditing(false);
      showTempMessage('✅ Profile updated successfully!', 1000);
    } catch (err) {
      showTempMessage(err.response?.data?.message || '❌ Failed to update profile.', 1500);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const showTempMessage = (text, duration = 1000) => {
    setMessage(text);
    setTimeout(() => {
      setMessage('');
    }, duration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <Header pageTitle="My Profile" onMenuClick={onMenuClick} />

      <div className="py-8 px-4 max-w-5xl mx-auto space-y-8">

        {/* Status Message */}
        {message && (
          <div
            className={`p-4 text-center rounded-lg font-medium text-white ${
              message.includes('❌') ? 'bg-red-500' :
              message.includes('✅') || message.includes('🔐') ? 'bg-green-500' : 'bg-blue-500'
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-8">

          {/* Combined Profile Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 ${
                    isEditing
                      ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed'
                  } text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md transition`}
                >
                  <Pencil className="h-4 w-4" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                  className="hidden"
                />
              </div>

              {/* User Info */}
              <div className="text-center md:text-left mt-4 md:mt-0">
                <h2 className="text-2xl font-bold text-green-800">{user.Username}</h2>
                <p className="text-gray-500">Store Owner</p>
                <p className="text-sm text-gray-400">Joined {formatDate(user.JoinDate)}</p>
                {user.StoreName && (
                  <p className="text-sm font-medium text-green-600 mt-1">{user.StoreName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards (Grid Below) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition transform">
              <div className="text-2xl font-bold">{user.totalProducts}</div>
              <div className="text-sm opacity-90">Products Listed</div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition transform">
              <div className="text-2xl font-bold">{user.totalSales}</div>
              <div className="text-sm opacity-90">Today's Orders</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition transform">
              <div className="text-2xl font-bold">${user.weeklyRevenue.toFixed(2)}</div>
              <div className="text-sm opacity-90">Weekly Revenue</div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition transform">
              <div className="text-2xl font-bold">{user.lowStockProducts}</div>
              <div className="text-sm opacity-90">Low Stock</div>
            </div>
          </div>

          {/* Editable Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditing ? '✏️ Edit Profile' : '👤 Profile Information'}
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-2 rounded-xl font-medium text-white shadow-md transition transform hover:scale-105 ${
                  isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isEditing ? '❌ Cancel' : '✎ Edit Profile'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={updateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      name="Username"
                      value={editData.Username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="Email"
                      value={editData.Email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                    <input
                      type="text"
                      name="StoreName"
                      value={editData.StoreName}
                      onChange={handleInputChange}
                      placeholder="e.g., CityMart"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Category</label>
                    <select
                      name="StoreCategory"
                      value={editData.StoreCategory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Category</option>
                      <option>Grocery</option>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Pharmacy</option>
                      <option>Stationery</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 disabled:from-gray-400 text-white font-medium rounded-xl shadow transition transform hover:scale-105 hover:bg-green-700"
                  >
                    {loading ? 'Saving...' : '💾 Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-5 text-gray-700">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">Username:</span>
                  <span className="text-gray-600">{user.Username}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">Email:</span>
                  <span className="text-gray-600">{user.Email || 'Not set'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">Store Name:</span>
                  <span className="text-gray-600">{user.StoreName || 'Not set'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">Category:</span>
                  <span className="text-gray-600">{user.StoreCategory || 'Not set'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;