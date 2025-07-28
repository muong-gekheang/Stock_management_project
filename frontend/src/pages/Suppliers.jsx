import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useLocation } from 'react-router-dom';



function Suppliers (onMenuClick){
    const location = useLocation()
    const [suppliers, setSuppliers] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('You are not logged in.');
                    return;
                }

                const response = await axios.get('http://localhost:3001/api/suppliers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data;  
                console.log("fetched data stringified: ", JSON.stringify(data));
                setSuppliers(data); 
                setError('');
            } catch (err) {
                console.error('Failed to fetch suppliers', err);
                setError('Failed to fetch suppliers. Please login or try again.');
            }
        };

        fetchSupplier();
    }, []);

    const handleDelete = async (supplierId) => {
        if (!window.confirm('Are you sure you want to delete this supplier?')) {
        return;
        }

        try {
            setLoading(supplierId);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You are not logged in.');
                setLoading(null);
                return;
            }
            await axios.delete(`http://localhost:3001/api/suppliers/${supplierId}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            // Remove deleted supplier from state
            setSuppliers((prevSuppliers) =>
                prevSuppliers.filter((supplier) => supplier.SupplierID !== supplierId)
            );
            setError('');

            // alert the user 
            alert('✅ Supplier deleted successfully!');
        } catch (err) {
            console.error('Failed to delete supplier', err);
            setError('Failed to delete supplier. Please try again.');
        } finally {
            setLoading(null);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <Header pageTitle="My Suppliers" onMenuClick={onMenuClick} />
            <div className="flex items-center justify-between py-6 px-10">
                <Search className="w-6 h-6 text-green-900" />
                <div className="space-x-4">
                <Link to="/add-supplier">
                    <button className="bg-green-600 text-white font-medium px-4 py-2 rounded shadow hover:bg-green-700">
                    + Add Supplier
                    </button>
                </Link>
                </div>
            </div>
            <main className="px-10 py-6 space-y-6">
                {error && <p className="text-red-600">{error}</p>}

                {Array.isArray(suppliers) && suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                    <div
                    key={supplier.SupplierID}
                    className="bg-white rounded shadow p-4 flex flex-col md:flex-row items-start md:items-center"
                    >
                    {/* Placeholder image or icon for supplier */}
                    <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center mr-6 text-gray-500 font-semibold">
                        Supplier
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold">{supplier.SupplierName}</h2>
                        <p className="text-gray-600">Phone: {supplier.PhoneNumber}</p>
                        <p className="text-gray-600">Supplier ID: {supplier.SupplierID}</p>
                    </div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <div className="space-x-4">
                            <Link to={`/update-supplier/${supplier.SupplierID}`}>
                                <button className="bg-green-600 text-white font-medium px-4 py-2 rounded shadow hover:bg-green-700">
                                    Update
                                </button>
                            </Link>
                        </div>

                        <button className="bg-red-600 text-white font-medium px-4 py-2 rounded hover:bg-red-700"
                            onClick={() => handleDelete(supplier.SupplierID)}
                            disabled={loading === supplier.SupplierID}
                        >
                         {loading === supplier.SupplierID ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                    </div>
                ))
                ) : (
                <p className="text-gray-500">No suppliers found.</p>
                )}
            </main>
            </div>
        );
    }

export default Suppliers;
