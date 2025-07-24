import Popup from "reactjs-popup";
import Button from "./Button";
import InputBox from "./InputBox";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
function ProductUpdate({isOpen, onClose, product, category}){
    const [productName, setProductName] = useState(product ? product.name : "Unknown");
    const [productCategory, setProductCategory] = useState(category ? category.name : "Unknown");
    const [importedPrice, setImportedPrice] = useState(product ? product.importedPrice : "Unknown");
    const [sellingPrice, setSellingPrice] = useState(product ? product.sellingPrice : "Unknown");
    const [qunatity, setQuantity] = useState(product ? product.stockQuantity : "Unknown");
    const [lowStockThreshold, setLowStockThreshold] = useState(product ? product.lowStockThreshold : "Unknown")


    return( 
    <>
        <Popup open={isOpen} modal nested onClose={onClose}>
            <div >
                    <InputBox
                        label="Product Name"
                        value={productName}
                        placeHolder="Enter new product name"
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <InputBox 
                        label="Category"
                        value={productCategory}
                        placeHolder="Select the category"
                        onChange={(e) => setProductCategory(e.target.value)}
                    />
                    <InputBox 
                        label="Imported Price"
                        value={importedPrice}
                        placeHolder="Enter the imported price"
                        onChange={(e) => setImportedPrice(e.target.value)}
                    />
                    <InputBox 
                        label="Price"
                        value={sellingPrice}
                        placeHolder="Enter the new price"
                        onChange={(e) => setSellingPrice(e.target.value)}
                    />
                    <InputBox 
                        label="Quantity"
                        value={qunatity}
                        placeHolder="Enter new quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <InputBox 
                        label="Low Stock Threshold"
                        value={lowStockThreshold}
                        placeHolder="Enter new low stock threshold"
                        onChange={(e) => setLowStockThreshold(e.target.value)}
                    />
                    <div className="flex flex-row justify-center gap-4 mt-5">
                        <Button name="Update" bgColor="#6E53AB" />
                        <Button name="Cancel" bgColor="#EB5757" onClick={onClose} />      
                    </div>
                
            </div>
        </Popup>
    </>
    );
}

export default ProductUpdate;