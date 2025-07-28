import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header'
function ProductView ({ onMenuClick }){
    const { id: productId } = useParams();

    const [productData, setProductData] = useState({
        ProductName: '',
        CategoryID: '',
        PurchasePrice: '',
        SalePrice: '',
        CurrentStock: '',
        MinStockLevel: '',
        ImageURL: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProductByID = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
            setError('❌ Not logged in.');
            return;
            }

            const response = await axios.get(`http://localhost:3001/api/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            setProductData(response.data);

            console.log("Product Data: ", JSON.stringify(response.data, null, 2));
        } catch (err) {
            console.error('Failed to fetch product', err);
            setError('Failed to fetch product. Please try again.');
        }
    };

        fetchProductByID();
    }, [productId]);

    return (
        <div className="min-h-screen bg-green-50">
            <Header pageTitle="My Products" onMenuClick={onMenuClick} />

            <div className="p-6 max-w-2xl mx-auto mt-6 bg-white shadow-lg rounded-2xl border border-green-200">
            {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}

            <h1 className="text-3xl font-bold text-green-700 mb-4 border-b border-green-300 pb-2">
                {productData.ProductName}
            </h1>

            <div className="grid gap-4 text-gray-800 text-base">
                <div className="flex justify-between">
                <span className="font-semibold text-green-800">Category ID:</span>
                <span>{productData.CategoryID}</span>
                </div>
                <div className="flex justify-between">
                <span className="font-semibold text-green-800">Purchase Price:</span>
                <span>${productData.PurchasePrice}</span>
                </div>
                <div className="flex justify-between">
                <span className="font-semibold text-green-800">Sale Price:</span>
                <span>${productData.SalePrice}</span>
                </div>
                <div className="flex justify-between">
                <span className="font-semibold text-green-800">Current Stock:</span>
                <span>{productData.CurrentStock}</span>
                </div>
                <div className="flex justify-between">
                <span className="font-semibold text-green-800">Minimum Stock Level:</span>
                <span>{productData.MinStockLevel}</span>
                </div>
            </div>

            {productData.ImageURL ? (
                <img
                src={productData.ImageURL}
                alt="Product"
                className="w-64 h-auto mt-6 mx-auto rounded-lg shadow border border-green-200"
                />
            ) : (
                <p className="mt-6 text-center italic text-gray-400">No image available.</p>
            )}
            </div>
        </div>
    );

}

    


export default ProductView;