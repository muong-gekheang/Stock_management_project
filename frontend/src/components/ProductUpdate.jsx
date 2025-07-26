import Popup from "reactjs-popup";
import Button from "./Button";
import InputBox from "./InputBox";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import axios from 'axios';
function ProductUpdate({isOpen, onClose, product, category}){
    const [productName, setProductName] = useState(product ? product.ProductName : "");
    const [productCategory, setProductCategory] = useState(category ? category.CategoryName : "");
    const [importedPrice, setImportedPrice] = useState(product ? product.PurchasePrice : "");
    const [sellingPrice, setSellingPrice] = useState(product ? product.SalePrice : "");
    const [quantity, setQuantity] = useState(product ? product.CurrentStock : "");
    const [lowStockThreshold, setLowStockThreshold] = useState(product ? product.MinStockLevel : "")
    const [selectedCategoryId, setSelectedCategoryId] = useState(
        product ? String(product.CategoryID) : ""
    );
    const [categoryList, setCategoryList] = useState([]);
 
    useEffect(() =>{ 
        const fetchCategories = async () => {
            try{
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:3001/api/categories", { 
                    headers: {"Authorization": `Bearer ${token}`}});
                const data = await response.json();
                console.log("fetched category stringtify: ", JSON.stringify(data))
                setCategoryList(data.categories);
                console.log("Data in category list stringtified: ", JSON.stringify(categoryList));
            }catch(error){
                console.error("Failed to fetch categories:", error);
            }
        }
        fetchCategories()
    }, [categoryList])

    const handleUpdate = async () => {
    try {
        console.log("update Button is clicked");
        const token = localStorage.getItem("token");
        const updatedData = {
        productName: productName,
        categoryId: parseInt(selectedCategoryId),
        importedPrice: parseFloat(parseFloat(importedPrice).toFixed(2)),
        sellingPrice: parseFloat(parseFloat(sellingPrice).toFixed(2)),
        quantity: parseInt(quantity),
        lowStockThreshold: parseInt(lowStockThreshold),
        };

        await axios.put(`http://localhost:3001/api/products/${product.ProductID}`, updatedData, {
            headers: { "Authorization": `Bearer ${token}` },
        });

      alert("Product updated successfully!");
      onClose(); // Close popup
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

    return( 
    <>
        <Popup open={isOpen} modal nested onClose={onClose}>
            <div>
                    <InputBox
                        label="Product Name"
                        value={productName}
                        placeHolder="Enter new product name"
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    {/* <InputBox 
                        label="Category"
                        value={productCategory}
                        placeHolder="Select the category"
                        onChange={(e) => setProductCategory(e.target.value)}
                    /> */}

                    {/* Category dropdown */}
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Category</label>
                        <select
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md"
                        >
                            <option value="">Select Category</option>
                            {categoryList.map((cat) => (
                            <option key={cat.CategoryID} value={String(cat.CategoryID)}>
                                {cat.CategoryName}
                            </option>
                            ))}
                        </select>
                    </div>
                    
                    <InputBox 
                        label="Imported Price"
                        value={importedPrice}
                        placeHolder="Enter the imported price"
                        onChange={(e) => setImportedPrice(e.target.value)}
                    />
                    <InputBox 
                        label="Selling Price"
                        value={sellingPrice}
                        placeHolder="Enter the new price"
                        onChange={(e) => setSellingPrice(e.target.value)}
                    />
                    <InputBox 
                        label="Quantity"
                        value={quantity}
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
                        <Button name="Update" bgColor="#6E53AB" 
                        onClick={handleUpdate}
                        />
                        <Button name="Cancel" bgColor="#EB5757" onClick={onClose} />      
                    </div>
                
            </div>
        </Popup>
    </>
    );
}

export default ProductUpdate;