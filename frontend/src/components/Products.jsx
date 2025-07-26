import Button from "./Button";
import ProductCard from "./ProductCard";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
function Products() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
   
  const handleAddProductIsClick = () => {
    navigate('/add-product');
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

  return (
    <>
      <div className="flex flex-col gap-4">
          <div className="bg-[#EBEBEB] pb-3">
            <div>
              <Header title="Products" />
            </div>
            <div className="flex flex-row justify-end gap-4 pl-4 pr-4">
              <Button name="+ Add Product" bgColor="#6E53AB" 
                onClick={handleAddProductIsClick}
              />
              <Button name="Filter" bgColor="#6E53AB" />
            </div>
          </div>

          <div>
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : productData.length === 0 ? (
              <p className="text-center text-gray-500">No products available.</p>
            ) : (
              productData.map((product) => (
                <ProductCard 
                  key={product.productID}
                  product={product}
                  category={product.Category} 
                />
              ))
            )}
          </div>
      </div>
    </>
  );
}

export default Products;