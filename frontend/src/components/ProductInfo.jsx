import Button from "./Button";
import Header from "./Header";
import { useState, useRef} from "react";
import { useLocation } from "react-router-dom";
import ProductUpdate from "./productUpdate";
import axios from 'axios';
function ProductInfo() {
    const location = useLocation();
    const { product, category } = location.state || {};
    const [isUpdateProductOpen, setUpdateProductOpen] = useState(false);


    if (!product) {
        return <div>Product not found</div>;
    }

    const [image, setImage] = useState(null);
    const imageInputRef = useRef(null);

    const handleImageClick = () =>{
        imageInputRef.current.click();
    }
    const handleImageUpdate = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleDeleteProduct = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3001/api/products/${product.ProductID}`, {
            headers: { Authorization: `Bearer ${token}` },
            });

            alert("Product deleted successfully!");
            window.location.href = "/products"
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };

    const hanldeOpenUpdateProduct = () => setUpdateProductOpen(true);
    const handleCloseUpdateProduct = () => setUpdateProductOpen(false);
    return (
        <>
            <div className="flex flex-col justify-center gap-4">
                <div>
                    <Header title="Product Detail" />
                </div>
            </div>

            <div className="flex flex-row bg-white rounded-lg pl-5 mt-10 ">
                <div className="w-150 h-150 bg-blue-100 flex items-center justify-center"
                    onClick ={handleImageClick}>
                    {image ? (
                        <img 
                            src={image}
                            alt="Product Image" 
                            className="w-full h-full object-cover rounded-lg" />
                    ) : (
                        <p className="text-blue-500 font-medium">Product Image </p>
                    )}
                    <input 
                        type="file" 
                        accept="image/*" 
                        ref={imageInputRef} 
                        onChange={handleImageUpdate} 
                        className="hidden" 
                    />
                </div>

                <div className="flex flex-col ml-20">
                    <p className="text-4xl font-bold">{product.ProductName}</p>
                    <div className="flex flex-row gap-4 mt-8 text-2xl">
                        <span>Product Code:</span>
                        <span>{product.ProductID}</span>
                    </div>

                    <div className="flex flex-row gap-4 mt-8 text-2xl">
                        <span>Category:</span>
                        <span>{category ? category.CategoryName : "Unknown"}</span>
                    </div>

                    <div className="flex flex-row gap-4 mt-8 text-2xl">
                        <span>Imported Price:</span>
                        <span>${product.PurchasePrice}</span>
                    </div>
                    <div className="flex flex-row gap-4 mt-8 text-2xl">
                        <span>Selling Price:</span>
                        <span>${product.SalePrice}</span>
                    </div>
                    <div className="flex flex-row gap-4 mt-8 text-2xl">
                        <span>Stock Quantity:</span>
                        <span>{product.CurrentStock}</span>
                    </div>
                    <div className="flex flex-row gap-4 mt-8 text-2xl">
                        <span>Low Stock Threshold:</span>
                        <span>{product.MinStockLevel}</span>
                    </div>

                    <div className="flex flex-col justify-center  gap-4 ml-6 mt-10">
                        <div className="flex flex-row gap-4 mt-6">
                            <Button name="Update" bgColor="#6E53AB" 
                                onClick={hanldeOpenUpdateProduct}
                            />
                            <Button name="Delete" bgColor="#EF4444"
                                onClick={handleDeleteProduct}
                            />

                        </div>

                    </div>
                    <ProductUpdate 
                        isOpen={isUpdateProductOpen} 
                        onClose={handleCloseUpdateProduct} 
                        product={product}
                        category={category}
                    />
                </div>


            </div>

            
        </>
    );
}

export default ProductInfo;