
import Header from "../components/Header";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
function ProductByCategory(){
    const {id} = useParams();
    console.log("params id: ", id);
    const [productData, setProductData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    if (isNaN(id)) {
        return <div>Invalid category</div>;
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        const fetchProduct = async () => {
            try{
            const response = await fetch("http://localhost:3001/api/products", { headers: { Authorization: `Bearer ${token}`}
            });

            const data = await response.json();
            console.log("Fetched product data (stringtified): ", JSON.stringify (data, null, 2));
            setProductData(data);
            } catch (error){
            console.error("Error fetching data:", error);
            } finally {
            setLoading(false);
            }
        }

        const fetchCategories = async () => {
            try {
            const res = await axios.get("http://localhost:3001/api/categories", {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Fetched categories:", res.data);
            setCategoryData(res.data.categories || []);
            } catch (error) {
            console.error('Failed to load categories:', error);
            }
        };
        fetchProduct();
        fetchCategories();

    }, []);
    

    const filteredProducts = productData.filter((product) => {
        console.log("Product:", product); 
        console.log("categoryID value:", product.CategoryID); 
        return parseInt(product.CategoryID) === parseInt(id);

    });
    
    console.log("total Item: ", filteredProducts.length);
    console.log("filteredProducts stringtified: ", JSON.stringify(filteredProducts));


    const category = categoryData.find(cat => parseInt(cat.CategoryID) === parseInt(id))
    const categoryName = category ? category.name : "Unknown Category";

    const handleDeleteCategory = async () => {
        if(filteredProducts.length === 0){
            const confirmed = window.confirm("Are you sure you want to delete this category?");
            if (!confirmed) return;

        

            const token = localStorage.getItem("token");

            try {
                await axios.delete(`http://localhost:3001/api/categories/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("Category deleted successfully!");
                // Optionally navigate back to categories list
                window.location.href = "/categories";
            } catch (error) {
                console.error("Error deleting category:", error);
                alert("Failed to delete category.");
            }
        } else {
            alert("Cannot delete this category because it still has products.");
        }
    }
    
    return(
        <>
            <div>
                <div className="bg-[#EBEBEB] pb-3">
                    <div>
                    <Header  />
                    </div>
                </div>
                <div className="flex justify-end mt-5 mr-5">
                    <button className="bg-red-600 text-white font-medium px-4 py-2 rounded hover:bg-red-700"
                    onClick={handleDeleteCategory}
                    >
                        delete category
                    </button>
                </div>
                <div>
                    <main className=" px-10 py-6 space-y-6">
                        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
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
  
            </div>
        </>
    )
}

export default ProductByCategory;
