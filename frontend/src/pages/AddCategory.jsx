import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function AddCategory({ onMenuClick }) {
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('❌ Not logged in. Please log in again.');
                setLoading(false);
                return;
            }

            const categoryData = {
                categoryName: categoryName,
            };

            const response = await axios.post(
                'http://localhost:3001/api/categories',
                categoryData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(`✅ ${response.data.message || 'Category saved successfully!'}`);
            console.log('Saved category:', response.data.category);

            setCategoryName(''); // Clear the input field
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Failed to save category');
            } else if (error.request) {
                setError('Network error: Could not reach server');
            } else {
                setError(`Request error: ${error.message}`);
            }
            console.error('Error creating category:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-gray-50'>
            <Header pageTitle="Add New Category" onMenuClick={onMenuClick} />
            <div className="py-10 max-w-4xl mx-auto">
                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Category Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                            <input
                                type="text"
                                name="CategoryName"
                                value={categoryName}
                                onChange={handleChange}
                                placeholder="Enter category name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Category"}
                            </button>
                        </div>

                        {/* Error */}
                        {error && <p className="text-red-600">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;
