import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

function UpdateSupplier({ onMenuClick }) {
    const { supplierId } = useParams();
    const [supplierName, setSupplierName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('❌ Not logged in.');
                    return;
                }

                const response = await axios.get(`http://localhost:3001/api/suppliers/${supplierId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSupplierName(response.data.SupplierName);
                setPhoneNumber(response.data.PhoneNumber || 'Unknown');

                console.log("Supplier Name stringtified: ", JSON.stringify(supplierName));
                console.log("Supplier Phone number stringtified: ", JSON.stringify(phoneNumber));
            } catch (err) {
                console.error('Failed to fetch supplier', err);
                setError('Failed to fetch supplier. Please try again.');
            }
        };

        fetchSupplier();
    }, [supplierId]);

    const handleSupplierNameChange = (e) => {
        setSupplierName(e.target.value);
        
    };
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    }
    

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

            const supplierData = {
                supplierName: supplierName,
                phoneNumber: phoneNumber,
            };

            const response = await axios.put(
                `http://localhost:3001/api/suppliers/${supplierId}`,
                supplierData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(`✅ ${response.data.message || 'Supplier update successfully!'}`);
            console.log('update supplier:', response.data.category);
            setSupplierName(''); 
            setPhoneNumber('');  
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Failed to update supplier');
            } else if (error.request) {
                setError('Network error: Could not reach server');
            } else {
                setError(`Request error: ${error.message}`);
            }
            
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
                        {/* Supplier Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
                            <input
                                type="text"
                                name="supplierName"
                                value={supplierName}
                                onChange={handleSupplierNameChange}
                                placeholder="Enter Suppliers name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                placeholder="Enter phone number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end">
                            
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Update Supplier"}
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

export default UpdateSupplier;
