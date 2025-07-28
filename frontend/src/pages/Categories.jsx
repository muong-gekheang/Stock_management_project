import CategoryCard from "../components/CategoryCard"
import { useEffect, useState } from "react";
import axios from 'axios';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
function Categories({onMenuClick}) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);

        if (!token) {
            console.error("No token found, aborting fetch");
            setLoading(false);
            return;
        }

        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/categories", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched data:", data);
                setCategories(data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);
    return (
        <>  
            <div className = "bg-gray-50">
                <Header pageTitle="Categories" onMenuClick={onMenuClick} />
            </div>

            <div className="flex justify-end mt-5 mr-5">
                <Link to="/add-category">
                    <button className="bg-green-600 text-white font-medium px-4 py-2 rounded shadow hover:bg-green-700">
                            + add category
                    </button>
                </Link>
            </div>

            <div className="flex flex-col gap-4 mt-10">
                
                <div className="flex flex-row flex-wrap justify-center gap-4">
                    {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                    ) : categories.length === 0 ? (
                    <p className="text-center text-gray-500">No category available.</p>
                    ) : (
                    categories.map((category) => (
                        <CategoryCard 
                        key={category.CategoryID}
                        category={category}
                        />
                    ))
                    )}
                </div>
            </div>
        </>  
    );
}

export default Categories;
