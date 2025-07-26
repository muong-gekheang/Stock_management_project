// src/pages/RecordPurchasePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { X, Plus, Trash2 } from 'lucide-react';

export default function RecordPurchasePage({ onMenuClick }) {
  const [purchase, setPurchase] = useState({
    supplierId: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [items, setItems] = useState([
    { productId: '', quantity: 1, unitCost: '' }
  ]);

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null)
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3001/api/suppliers', {
        headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          console.log("Suppliers fetched:", res.data);
          setSuppliers(res.data);
        })
        .catch((err) => {
        console.error('Error fetching supplier:', err);
        });
    }, []);
  useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:3001/api/products', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Fetched:", res.data); 
                setProducts(res.data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch products', err);
                setError('Failed to fetch products. Please login or try again.');
            }
        };
        fetchUserProducts();
    }, []);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { productId: '', quantity: 1, unitCost: '' }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const cost = parseFloat(item.unitCost) || 0;
      return sum + (qty * cost);
    }, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setMessage('')

    const token = localStorage.getItem('token')
    try {
      const res = await axios.post('http://localhost:3001/api/purchases', {
        supplierId: purchase.supplierId,
        date: purchase.date,
        items: items.map(item => ({
          productId: parseInt(item.productId),
          quantity: parseInt(item.quantity),
          unitCost: parseFloat(item.unitCost)
        }))
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    setMessage('Purchase recorded successfully!');
    console.log('Purchase created:', res.data);

    // Reset form
    setTimeout(() => {
      setPurchase({ supplierId: '', date: new Date().toISOString().split('T')[0] });
      setItems([{ productId: '', quantity: 1, unitCost: '' }]);
      setMessage('');
    }, 2000);

    } catch (err) {
      console.error('Purchase creation failed:', err);
      showError(err.response?.data?.error || 'Purchase failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header pageTitle="Record Purchase" onMenuClick={onMenuClick} />

      <div className="py-8 px-4 max-w-4xl mx-auto">
        {message && (
          <div className="mb-6 p-4 text-center bg-green-100 text-green-800 rounded-lg font-medium">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 text-center bg-red-100 text-red-800 rounded-lg font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 space-y-8">
          {/* Purchase Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
              <select
                value={purchase.supplierId}
                onChange={(e) => setPurchase({ ...purchase, supplierId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 5"
              >
                <option value="">Select a supplier</option>
                  {suppliers.map((supplier) => (
                  <option key={supplier.SupplierID} value={supplier.SupplierID}>
                    {supplier.SupplierName}
                  </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={purchase.date}
                onChange={(e) => setPurchase({ ...purchase, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Purchased Items</h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="block text-xs text-gray-600">Product ID</label>
                    <select
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select a product</option>
                      {products.map((product) => (
                        <option key={product.ProductID} value={product.ProductID}>
                          {product.ProductName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600">Unit Cost ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.unitCost}
                        onChange={(e) => handleItemChange(index, 'unitCost', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="mt-4 flex items-center gap-1 text-green-600 hover:text-green-800 font-medium"
            >
              <Plus size={16} /> Add Item
            </button>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Cost:</span>
              <span className="text-green-600">${calculateTotal()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setItems([{ productId: '', quantity: 1, unitCost: '' }])}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
            >
              ✅ Record Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}