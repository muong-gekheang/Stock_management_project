import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

const Product = ({ onMenuClick }) => {
    const [products, setProducts] = useState([])

    const [error, setError] = useState(null);

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


    return (
        <div className="min-h-screen bg-gray-50">
            <Header pageTitle="My Products" onMenuClick={onMenuClick} />
            <div className="flex items-center justify-between py-6 px-10  ">
                <Search className="w-6 h-6 text-black" />
                <div className="space-x-4">
                    <Link to="/products/add">
                        <button className="bg-purple-600 text-white font-medium px-4 py-2 rounded shadow hover:bg-purple-700">
                           + add product
                        </button>
                    </Link>
                    <button className="bg-purple-600 text-white font-medium px-4 py-2 rounded shadow hover:bg-purple-700">
                        filter
                    </button>
                </div>
            </div>
            <main className=" px-10 py-6 space-y-6">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.ProductID} className="bg-white rounded shadow p-4 flex flex-col md:flex-row items-start md:items-center">
                            <img
                                src={product.ImageURL}
                                alt={product.ProductName}
                                className="w-32 h-32 object-cover rounded mr-6"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{product.ProductName}</h2>
                                <p className="text-gray-600">Stock: {product.CurrentStock} in stock</p>
                                <p className="text-gray-600">Category: {product.Category?.CategoryName || 'Uncategorized'}</p>
                                <p className="text-gray-800 font-semibold">Price: ${product.SalePrice}</p>
                            </div>
                            <div className="flex space-x-4 mt-4 md:mt-0">
                                <button className="bg-purple-600 text-white font-medium px-4 py-2 rounded hover:bg-purple-700">
                                    View
                                </button>
                                <button className="bg-purple-600 text-white font-medium px-4 py-2 rounded hover:bg-purple-700">
                                    Sale
                                </button>
                            </div>
                        </div>
                    ))
                    ) : (
                        <p className="text-gray-500">No products found or not logged in.</p>
                    )}
            </main>
        </div>
       
    )
}

export default Product;