import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateProduct({ onMenuClick }) {
  const { id } = useParams(); // product ID
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: '',
    categoryId: '',
    purchasePrice: '',
    salePrice: '',
    currentStock: '',
    minStockLevel: '',
    imageUrl: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const product = res.data; // direct product object

        setFormData({
          productName: product.ProductName || '',
          categoryId: product.CategoryID || '',
          purchasePrice: product.PurchasePrice || '',
          salePrice: product.SalePrice || '',
          currentStock: product.CurrentStock || '',
          minStockLevel: product.MinStockLevel || '',
          imageUrl: product.ImageURL || '',
        });
        console.log("fetch form data stringified: ", JSON.stringify(product));
      } catch (err) {
        if (err.response) {
          console.error('Error response:', err.response.data);
        } else if (err.request) {
          console.error('No response:', err.request);
        } else {
          console.error('Error message:', err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const updatedProduct = {
      productName: formData.productName,
      categoryId: parseInt(formData.categoryId),
      importedPrice: parseFloat(formData.purchasePrice) || 0,
      sellingPrice: parseFloat(formData.salePrice) || 0,
      quantity: parseInt(formData.currentStock) || 0,
      lowStockThreshold: parseInt(formData.minStockLevel) || 0,
      imageURL: formData.imageUrl,
    };

    const res = await axios.put(`http://localhost:3001/api/products/${id}`, updatedProduct, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    alert(`✅ ${res.data.message || 'Product updated successfully!'}`);
    navigate('/products');
  } catch (err) {
    console.error('Update error:', err);
    alert('❌ Failed to update product.');
  }
};


  if (loading) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="bg-gray-50">
      <Header pageTitle="Update Product" onMenuClick={onMenuClick} />
      <div className="py-10 max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.CategoryID} value={cat.CategoryID}>
                      {cat.CategoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price and Quantity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
                        <input
                            type="number"
                            step="0.01"
                            name="purchasePrice"
                            value={formData.purchasePrice}
                            onChange={handleChange}
                            placeholder="0.00"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
                        <input
                            type="number"
                            step="0.01"
                            name="salePrice"
                            value={formData.salePrice}
                            onChange={handleChange}
                            placeholder="0.00"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity in Stock</label>
                            <input
                                type="number"
                                name="currentStock"
                                value={formData.currentStock}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stock Level</label>
                            <input
                                type="number"
                                name="minStockLevel"
                                value={formData.minStockLevel}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                        </div>
                    </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;