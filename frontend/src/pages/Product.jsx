import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useLocation } from 'react-router-dom';


const Product = ({ onMenuClick }) => {
    const location = useLocation()
    const isLowStock = new URLSearchParams(location.search).get('filter') === 'low-stock'
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearch, setIsSearch] = useState(false);
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

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsSearch(value.trim() !== '');
    };

    const filteredProducts = products.filter((product) => 
        product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const displayProducts = isSearch ? filteredProducts : products;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header pageTitle="My Products" onMenuClick={onMenuClick} />
            <div className="flex items-center justify-between py-6 px-10 space-x-4 ">
                <div className="flex items-center bg-white px-3 py-2 rounded shadow w-full max-w-md">
                    <Search className="w-6 h-6 text-green-900" />
                    <input
                            type="text"
                            placeholder="Search by product name..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full outline-none"
                        />
                </div>   
                <div className="space-x-4">
                    <Link to="/add-product">
                        <button className="bg-green-600 text-white font-medium px-4 py-2 rounded shadow hover:bg-green-700">
                           + add product
                        </button>
                    </Link>
                </div>
            </div>
            <main className=" px-10 py-6 space-y-6">
                {Array.isArray(displayProducts) && displayProducts.length > 0 ? (
                    displayProducts.map((product) => (
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
                                <div className="space-x-4">
                                    <Link to={`/view-product/${product.ProductID}`}>
                                        <button className="bg-green-600 text-white font-medium px-4 py-2 rounded hover:bg-green-700">
                                            View
                                        </button>
                                    </Link>
                                </div>
                                

                                <div className="space-x-4">
                                    <Link to={`/update-product/${product.ProductID}`}>
                                        <button className="bg-green-600 text-white font-medium px-4 py-2 rounded hover:bg-green-700">
                                            Update
                                        </button>
                                    </Link>
                                </div>
                                
                            </div>
                        </div>
                    ))
                    ) : (
                        <p className="text-gray-500">No products found.</p>
                    )}
            </main>
        </div>
       
    )
}

export default Product;