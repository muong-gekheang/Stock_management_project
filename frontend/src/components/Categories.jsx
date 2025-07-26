
import CategoryCard from "./CategoryCard"
import Header from "./Header"
import Button from "./Button"
import { useEffect, useState } from "react";
import AddCategory from "./AddCategory";

function Categories() {
    const [categoryPopUpOpen, setCategoryPopUpOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleAddCategoryOpen = () => setCategoryPopUpOpen(true);
    const handleAddCategoryClose = () => setCategoryPopUpOpen(false);

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
            <div className="flex flex-col gap-4">
                <div className="bg-[#EBEBEB] pb-3">
                    <div>
                        <Header title="Categories" />
                    </div>
                    <div className="flex flex-row justify-end gap-4 pl-4 pr-4">
                        <Button name="+ Add Category" bgColor="#6E53AB" 
                            onClick={handleAddCategoryOpen}
                        />
                    </div>
                </div>

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

                <AddCategory
                    isOpen={categoryPopUpOpen}
                    onClose={handleAddCategoryClose}
                />
            </div>
        </>  
    );
}

export default Categories;
