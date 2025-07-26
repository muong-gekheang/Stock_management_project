import { useState } from "react";
import Button from "./Button";
import Sale from "./Sale";
import { useNavigate } from "react-router-dom";

function ProductCard({product, category}) {
    console.log("Product prop: stringify", JSON.stringify(product, null, 2));
    console.log("Category prop: stringify", JSON.stringify(category, null, 2));
    const navigate = useNavigate();
    if (!product) {
        return <div>Product not found</div>;
    }
    const handleViewButtonClick = () => {
        navigate(`/products/${product.ProductID}`, {state: { product, category }});
        
    }
    
    const [isSalePopUpOpen, setSalePopUpOpen] = useState(false);

    const handleOpenSale = () => setSalePopUpOpen(true);
    const handleCloseSale = () => setSalePopUpOpen(false);

    return(
        <>
            <div className="flex bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg px-4 py-3 items-center gap-x-4">
                <div className="flex flex-col item-center ">
                    <div className="w-64 h-64 bg-blue-100 flex items-center justify-center">
                        <p className="text-blue-500 font-medium">Product Image </p>
                    </div>
                    <p className="p-4">{product.ProductName}</p>
                </div>
                <div className="flex flex-col px-6 gap-7 justify-center">   
                    <div className="flex flex-row gap-2">
                        <span>Stock:</span>
                        <span>{product.CurrentStock}</span>
                        <span>in stock</span>
                    </div>
                    <div className="flex flex-row gap-2">
                        <span>Category:</span>
                        <span>{category ? category.CategoryName : "Unknown"}</span>
                    
                    </div>
                    <div className="flex flex-row gap-2">
                        <span>Selling Price:</span>
                        <span>${product.SalePrice}</span>
                    </div>

                    
                    <div className="flex flex-row gap-4 ">
                        <Button name="View" bgColor="#6E53AB"
                            onClick={handleViewButtonClick}
                        />
                        <Button name="Add Sale" bgColor="#6E53AB"
                            onClick={handleOpenSale}
                        />
                        <Sale isOpen={isSalePopUpOpen} onClose={handleCloseSale} product={product}/>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductCard;