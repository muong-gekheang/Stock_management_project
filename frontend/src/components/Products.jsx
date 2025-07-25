import Button from "./Button";
import ProductCard from "./ProductCard";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
function Products() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
   
  const handleAddProductIsClick = () => {
    navigate('/add-product');
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    Promise.all([
      fetch("http://localhost:3001/api/products",  {
        headers: { Authorization: `Bearer ${token}`}
      }).then((res) => res.json()),
      fetch("http://localhost:3001/api/categories", {
          headers: { Authorization: `Bearer ${token}` }
      }).then((res) => res.json())
    ])
      .then(([products, categories]) => {
        console.log("Fetched products:", products);
        console.log("Fetched categories:", categories);
        setProductData(products);
        setCategoryData(categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
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
                  key={product.productCode}
                  product={product}
                  category={categoryData.find(cat => cat.categoryCode === product.categoryCode)} 
                />
              ))
            )}
          </div>
      </div>
    </>
  );
}

export default Products;