import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import Header from '../components/Header';
import { Save, ArrowLeft } from 'lucide-react'; // Import icons

export default function UpdateProductPage ({ onMenuClick }){
  const { productId } = useParams() // Get the product ID from the URL
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [product, setProduct] = useState({
    ProductName: '',
    CategoryID: '',
    PurchasePrice: '',
    SalePrice: '',
    CurrentStock: '',
    MinStockLevel: '',
    ImageURL: '' 
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect (() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get(`http://localhost:3001/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Populate the form state with fetched data
        setProduct({
          ProductName: res.data.ProductName || '',
          CategoryID: res.data.CategoryID || '',
          PurchasePrice: res.data.PurchasePrice || '',
          SalePrice: res.data.SalePrice || '',
          CurrentStock: res.data.CurrentStock || '',
          MinStockLevel: res.data.MinStockLevel || '',
          ImageURL: res.data.ImageURL || ''
        });
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.error || 'Failed to load product data.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct()
  }, [productId, navigate])


  
}