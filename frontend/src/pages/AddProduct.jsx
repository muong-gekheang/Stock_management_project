
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../components/Header';

export default function AddProduct({ onMenuClick }) {

    const [formData, setFormData] = useState({
        productName: '',
        categoryId: '',
        purchasePrice: '',
        salePrice: '',
        currentStock: '',
        minStockLevel: '',
        imageUrl: '', // will store base64 or URL
    });

    const [categories, setCategories] = useState([]);
    // Fetch categories 
    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await axios.get("http://localhost:3001/api/categories", {
                headers: { Authorization: `Bearer ${token}` },
                });
                setCategories(res.data.categories || []);
            } catch (error) {
                console.error('Failed to load categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({ ...prev, imageUrl: reader.result })); // Base64 string
        };
        reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                alert('❌ Not logged in. Please log in again.');
                return;
            }

            const productData = {
                ...formData,
                categoryId: parseInt(formData.categoryId),
                purchasePrice: parseFloat(formData.purchasePrice) || 0,
                salePrice: parseFloat(formData.salePrice) || 0,
                currentStock: parseInt(formData.currentStock) || 0,
                minStockLevel: parseInt(formData.minStockLevel) || 0,
            };

            // Send POST request using axios
            const response = await axios.post('http://localhost:3001/api/products', productData, {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Send JWT
                },
            });

            // On success
            alert(`✅ ${response.data.message || 'Product saved successfully!'}`);
            console.log('Saved product:', response.data.product);

            // Reset form
            setFormData({
                productName: '',
                categoryId: '',
                purchasePrice: '',
                salePrice: '',
                currentStock: '',
                minStockLevel: '',
                imageUrl: '',
            });

        } catch (error) {
            // Handle errors
            if (error.response) {
                // Server responded with error status
                alert(`❌ ${error.response.data.message || 'Failed to save product'}`);
            } else if (error.request) {
                // No response received
                alert('❌ Network error: Could not reach server');
            } else {
                // Other errors
                alert(`❌ Request error: ${error.message}`);
            }
            console.error('Error creating product:', error);
        }
    }
    
  return (
    <div className='bg-gray-50'>
        <Header pageTitle="Add New Product" onMenuClick={onMenuClick} />
        <div className="py-10 max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-2xl p-6">
                
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            placeholder="Enter product name"
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
                    Save Product
                    </button>
                </div>
                </form>
            </div>
        </div>
    </div>
    
  );
}

