import ProductCard from "./ProductCard";
import Header from "./Header";
import Button from "./Button";
import { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";

function ProductByCategory(){
    const {categoryID} = useParams();
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    if (isNaN(categoryCode)) {
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
        fetchProduct();
        }, []);
    
    
    const filteredProducts = productData.filter((product) => product.CategoryCode === parseInt(categoryID))

    if(filteredProducts.length === 0) {
        return <div>There is no product in this category</div>
    }

    const category = categoryData.find(cat => parseInt(cat.categoryCode) === parseInt(categoryID))
    const categoryName = category ? category.name : "Unknown Category";
    return(
        <>
            <div>
                <div className="bg-[#EBEBEB] pb-3">
                    <div>
                    <Header title={categoryName} />
                    </div>
                    <div className="flex flex-row justify-end gap-4 pl-4 pr-4">
                    <Button name="+ Add Product" bgColor="#6E53AB" />
                    <Button name="Filter" bgColor="#6E53AB" />
                    </div>
                </div>
                {filteredProducts.map((product) => (
                    <ProductCard 
                    key={product.ProductID}
                    product={product}
                    category={product.Category} 
                    />
                ))}   
            </div>
        </>
    )
}

export default ProductByCategory;