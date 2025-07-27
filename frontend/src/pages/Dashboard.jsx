import react from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  PackageCheck,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  PlusCircle,
} from "lucide-react";

export default function Dashboard ({ onMenuClick }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get("http://localhost:3001/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("✅ Dashboard response received:", response.data);
        setDashboardData(response.data);
      } catch (err) {
        console.error("❌ Error fetching dashboard data:", err.response?.data || err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (!dashboardData) return <div>Something went wrong</div>;

  const barData = [
    { date: "Mon", total: dashboardData.weeklySales.dailySales[0] },
    { date: "Tue", total: dashboardData.weeklySales.dailySales[1] },
    { date: "Wed", total: dashboardData.weeklySales.dailySales[2] },
    { date: "Thu", total: dashboardData.weeklySales.dailySales[3] },
    { date: "Fri", total: dashboardData.weeklySales.dailySales[4] },
    { date: "Sat", total: dashboardData.weeklySales.dailySales[5] },
    { date: "Sun", total: dashboardData.weeklySales.dailySales[6] },
  ];

  

  return (
    <div>
      <div>
        <Header pageTitle="📊 Dashboard" onMenuClick={onMenuClick} />
      </div>
      <main className='px-6 flex flex-col gap-4'>
        <div className="flex gap-4 mt-9">
          <Link
            to="/add-product"
            className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-md text-sm transition"
          >
            <PlusCircle size={18} /> Add Product
          </Link>

          <Link
            to="/sale-record"
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm transition"
          >
            <ShoppingCart size={18} /> Record Sale
          </Link>

          <Link
            to="/purchase-record"
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm transition"
          >
            <PackageCheck size={18} /> Record Purchase
          </Link>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Total Items */}
          <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border">
            <PackageCheck className="text-blue-500" size={32} />
            <div>
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="text-xl font-bold">{dashboardData.totalProducts}</p>
            </div>
          </div>

          {/* Sales Today */}
          <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border">
            <ShoppingCart className="text-green-500" size={32} />
            <div>
              <p className="text-sm text-gray-500">Sales Today</p>
              <p className="text-xl font-bold">${dashboardData.today.salesAmount}</p>
              <p className="text-xs text-gray-400">{dashboardData.today.totalOrders} orders</p>
            </div>
          </div>
          {/* Profit Today */}
          <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border">
            <DollarSign className="text-yellow-500" size={32} />
            <div>
              <p className="text-sm text-gray-500">Profit Today</p>
              <p className="text-xl font-bold">${dashboardData.today.profit}</p>
            </div>
          </div>

          {/* Alerts */}
          <Link to="/products?filter=low-stock">
            <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border">
              <AlertTriangle className="text-red-500" size={32} />
              <div>
                <p className="text-sm text-gray-500">Alerts</p>
                <p className="text-xl font-bold">{dashboardData.lowStockAlerts.length}</p>
                <p className="text-xs text-gray-400">Low stock</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border mt-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-purple-500" size={20} />
            <h2 className="text-lg font-semibold">Weekly Sales Trend</h2>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#15803d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
      
    </div>
  );
}


