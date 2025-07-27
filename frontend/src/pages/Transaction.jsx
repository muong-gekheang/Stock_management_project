// src/pages/SaleHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { ShoppingCart, Package, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function TransactionPage({ onMenuClick }) {
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [viewType, setViewType] = useState('sales'); // 'sales' or 'purchases'

  // Summary states
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch sales
        const salesRes = await axios.get('http://localhost:3001/api/sales', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userSales = salesRes.data.sales || [];
        setSales(userSales);

        // Fetch purchases
        const purchasesRes = await axios.get('http://localhost:3001/api/purchases', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userPurchases = purchasesRes.data.purchases || [];
        setPurchases(userPurchases);

        const revenue = userSales.reduce((sum, sale) => sum + (parseFloat(sale.TotalAmount) || 0), 0);
        const expenses = userPurchases.reduce((sum, purchase) => sum + (parseFloat(purchase.TotalAmount) || 0), 0);
        const profit = revenue - expenses

        setTotalRevenue(revenue);
        setTotalExpenses(expenses);
        setGrossProfit(profit)

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load history data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header pageTitle="History" onMenuClick={onMenuClick} />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header pageTitle="Transaction History" onMenuClick={onMenuClick} />

      <div className="py-8 px-4 max-w-6xl mx-auto">
        {error && (
          <div className="mb-6 p-4 text-center bg-red-100 text-red-800 rounded-lg font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <TrendingDown className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalExpenses)}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center">
            <div className={`rounded-full ${grossProfit >= 0 ? 'bg-yellow-100' : 'bg-red-100'} p-3 mr-4`}>
              <DollarSign className={`${grossProfit >= 0 ? 'text-yellow-600' : 'text-red-600'}`} size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Gross Profit</p>
              <p className={`text-2xl font-bold ${grossProfit >= 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                {formatCurrency(grossProfit)}
              </p>
            </div>
          </div>
        </div>

        {/* View Toggle - Kept for switching between Sales and Purchases */}
        <div className="flex mb-6 bg-white rounded-xl p-1 shadow">
          <button
            onClick={() => setViewType('sales')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition ${
              viewType === 'sales'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ShoppingCart size={20} />
            <span>Sales</span>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
              {sales.length}
            </span>
          </button>
          <button
            onClick={() => setViewType('purchases')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition ${
              viewType === 'purchases'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Package size={20} />
            <span>Purchases</span>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
              {purchases.length}
            </span>
          </button>
        </div>

        {/* Results */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              {viewType === 'sales' ? 'Sales History' : 'Purchase History'}
              <span className="text-gray-500 text-base font-normal ml-2">
                ({viewType === 'sales' ? sales.length : purchases.length} records)
              </span>
            </h2>
          </div>

          {/* Display Sales or Purchases based on viewType */}
          {viewType === 'sales' ? (
            <div className="overflow-x-auto">
              {sales.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No sales recorded</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    
                    {sales.map((sale) => (
                      <tr key={sale.SaleId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(sale.OrderDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {sale.CustomerName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="space-y-1">
                            {sale.SaleItems?.slice(0, 2).map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span>{item.Product?.ProductName}</span>
                                <span>{item.Quantity} × {formatCurrency(item.UnitPrice)}</span>
                              </div>
                            ))}
                            {sale.SaleItems?.length > 2 && (
                              <div className="text-gray-500 text-xs">
                                + {sale.SaleItems.length - 2} more items
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {formatCurrency(sale.TotalAmount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              {purchases.length === 0 ? (
                <div className="text-center py-12">
                  <Package size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No purchases recorded</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  
                    {purchases.map((purchase) => (
                      <tr key={purchase.PurchaseId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(purchase.PurchaseDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {purchase.Supplier?.SupplierName || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="space-y-1">
                            {purchase.PurchaseItems?.slice(0, 2).map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span>{item.Product?.ProductName}</span>
                                <span>{item.Quantity} × {formatCurrency(item.UnitCost)}</span>
                              </div>
                            ))}
                            {purchase.PurchaseItems?.length > 2 && (
                              <div className="text-gray-500 text-xs">
                                + {purchase.PurchaseItems.length - 2} more items
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {formatCurrency(purchase.TotalAmount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}