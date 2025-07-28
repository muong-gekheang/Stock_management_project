// src/pages/RecordSalePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { X, Plus, Trash2 } from 'lucide-react';

export default function RecordSalePage({ onMenuClick }) {
  const [sale, setSale] = useState({
    customerName: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [items, setItems] = useState([
    { productId: '', quantity: 1, unitPrice: '' }
  ]);

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([])

  // ✅ Fetch user-specific products
  useEffect(() => {
    const fetchUserProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3001/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched:", res.data);
        setProducts(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products', err);
        showError('Failed to fetch products. Please login or try again.');
      }
    };

    fetchUserProducts();
  }, []);

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleProductSelect = (e, index) => {
    const selectedProductId = e.target.value;
    const selectedProduct = products.find(
      (p) => p.ProductID === parseInt(selectedProductId)
    );
    const autoPrice = selectedProduct?.SalePrice?.toString() || '';
    const currentStock = selectedProduct?.CurrentStock || 0;

    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      productId: selectedProductId,
      unitPrice: autoPrice,
      CurrentStock: currentStock,
    };
    setItems(newItems);
  };


  const addItem = () => {
    setItems([...items, { productId: '', quantity: 1, unitPrice: '' }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      return sum + (qty * price);
    }, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setMessage('')

    const token = localStorage.getItem('token')
    try {
      const res = await axios.post('http://localhost:3001/api/sales', {
        customerName: sale.customerName,
        date: sale.date,
        items: items.map(item => ({
          productId: parseInt(item.productId),
          quantity: parseInt(item.quantity),
          unitPrice: parseFloat(item.unitPrice)
        }))
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    setMessage('💰 Sale recorded successfully!');
    console.log('Sale created:', res.data);

    // Reset form
    setTimeout(() => {
      setSale({ customerName: '', date: new Date().toISOString().split('T')[0] });
      setItems([{ productId: '', quantity: 1, unitPrice: '' }]);
      setMessage('');
    }, 2000);

    } catch (err) {
      console.error('Sale creation failed:', err);
      showError(err.response?.data?.error || 'Sale failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header pageTitle="Record Sale" onMenuClick={onMenuClick} />

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
          {/* Sale Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input
                type="text"
                value={sale.customerName}
                onChange={(e) => setSale({ ...sale, customerName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={sale.date}
                onChange={(e) => setSale({ ...sale, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sale Items</h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600">Product Name</label>
                    <select
                      value={item.productId}
                      onChange={(e) => handleProductSelect(e, index)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select a product</option>
                      {products.map((product) => (
                        <option 
                          key={product.ProductID} 
                          value={product.ProductID}
                          disabled={product.CurrentStock <= 0}
                          >
                          {product.ProductName} {product.CurrentStock <= 0 ? '(Out of stock)' : ''}
                        </option>
                      ))}
                    </select>



                  </div>
                  <div className="w-24">
                    <label className="block text-xs text-gray-600">Qty</label>
                    <input
                      type="number"
                      min="1"
                      max={item.CurrentStock}
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="w-32">
                    <label className="block text-xs text-gray-600">Unit Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
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
              <span>Total Amount:</span>
              <span className="text-green-600">${calculateTotal()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setItems([{ productId: '', quantity: 1, unitPrice: '' }]);
                setMessage('');
              }}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
            >
              💰 Record Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}