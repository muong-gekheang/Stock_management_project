import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Search } from 'lucide-react';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';

const Product = ({ onMenuClick }) => {
    const location = useLocation()
    const isLowStock = new URLSearchParams(location.search).get('filter') === 'low-stock'
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = isLowStock
                    ? 'http://localhost:3001/api/products/low-stock'
                    : 'http://localhost:3001/api/products';
                const res = await axios.get(url, {
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
                <Search className="w-6 h-6 text-green-900" />
                <div className="space-x-4">
                    <Link to="/add-product">
                        <button className="bg-green-600 text-white font-medium px-4 py-2 rounded shadow hover:bg-green-700">
                           + add product
                        </button>
                    </Link>
                </div>
            </div>
            <main className=" px-10 py-6 space-y-6">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.ProductID} product={product} />
                    ))
                ) : (
                    <p className="text-gray-500">No products found.</p>
                )}

            </main>
        </div>
    )
}

export default Product;