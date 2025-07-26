// src/pages/RecordSalePage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { X, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';


export default function RecordSalePage({ onMenuClick }) {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProduct = async () => {
      try{
        const response = await fetch("http://localhost:3001/api/products", { headers: { Authorization: `Bearer ${token}`}
        });

        const data = await response.json();
        console.log("Fetched product data (stringtified): ", JSON.stringify (data, null, 2));
        setProductData(data);
      } catch (error){
        console.error("Error fetching data:", error);
      }
    }
    fetchProduct();
  }, []);

  // sale metadata including customer name and date
  const [sale, setSale] = useState({
    customerName: '',
    date: new Date().toISOString().split('T')[0],
  });

  // sale items info
  const [items, setItems] = useState([
    { productId: '', quantity: 1, unitPrice: '' }
  ]);

  const [message, setMessage] = useState('');

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    // Auto-fill unitPrice if productId is in a real system 
    if (field === 'productId') {
      const selectedProduct = productData.find(p => p.ProductID.toString() === value); // converted to string cuz the value from select or input is string 
      console.log("Selected productId:", value);
      console.log("Found product:", selectedProduct);
      if(selectedProduct){
          const price = parseFloat(selectedProduct.SalePrice).toFixed(2);
          console.log("Sale price to set:", price);
          newItems[index].unitPrice = price;
      }
    }


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

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = calculateTotal();

    // Mock success
    setMessage(`✅ Sale recorded! Total: $${total}`);
    console.log({ sale, items, total });

    // Reset form
    setTimeout(() => {
      setSale({ customerName: '', date: new Date().toISOString().split('T')[0] });
      setItems([{ productId: '', quantity: 1, unitPrice: '' }]);
      setMessage('');
    }, 2000);
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
                    <label className="block text-xs text-gray-600">Product ID - Name</label>
                    <select
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select product</option>
                      {productData.map((product) => (
                        <option key={product.ProductID} value={product.ProductID}>
                          [{product.ProductID}] - {product.ProductName}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div className="w-24">
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