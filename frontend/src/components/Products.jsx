import Button from "./Button";
import ProductCard from "./ProductCard";
import Header from "./Header";
import { productData, categoryData } from "../SampleData/sampleData"; 
import { useNavigate } from "react-router-dom";
function Products() {
  const navigate = useNavigate();
  const handleAddProductIsClick = () => {
    navigate('/add-product');
  }

  

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
            {productData.map((product) => (
              <ProductCard 
                key={product.productCode}
                product={product}
                category={categoryData.find(cat => cat.categoryCode === product.categoryCode)} 
              />
            ))}
          </div>
      </div>
    </>
  );
}

export default Products;