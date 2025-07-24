import ProductCard from "./ProductCard";
import Header from "./Header"
import Button from "./Button"
import { productData, categoryData} from "../SampleData/sampleData";
import { useParams } from "react-router-dom";

function ProductByCategory(){
    const {categoryCode} = useParams();

    if (isNaN(categoryCode)) {
        return <div>Invalid category</div>;
    }
    
    const filteredProducts = productData.filter((product) => parseInt(product.categoryCode) === parseInt(categoryCode))

    if(filteredProducts.length === 0) {
        return <div>There is no product in this category</div>
    }

    const category = categoryData.find(cat => parseInt(cat.categoryCode) === parseInt(categoryCode))
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
                    key={product.productCode}
                    product={product}
                    category={category} 
                    />
                ))}   
            </div>
        </>
    )
}

export default ProductByCategory;