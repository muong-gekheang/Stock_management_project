// src/components/ProductCard.jsx
import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col md:flex-row items-start md:items-center">
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
        <button className="bg-green-600 text-white font-medium px-4 py-2 rounded hover:bg-green-700">
          View
        </button>
        <button className="bg-green-600 text-white font-medium px-4 py-2 rounded hover:bg-green-700">
          Update
        </button>
      </div>
    </div>
  );
}
