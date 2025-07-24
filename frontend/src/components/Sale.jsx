import Header from "./Header";
import InputBox from "./InputBox";
import Button from "./Button";
import PopUp from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
function Sale({isOpen, onClose, product}) {
    const [quantity, setQuantity] = useState("1");
    const [soldPrice, setSoldPrice] = useState(product ? product.sellingPrice : 0);
    useEffect(() => {
        setQuantity("1");
        setSoldPrice(product?.sellingPrice || "");
    }, [product]); 
    return (
    <>
        <PopUp open={isOpen} modal nested onClose={onClose}>
            <div className="flex p-2 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] justify-center">
                <div className="flex flex-row gap-8 m-10 justify-center items-center w-full">
                    <div className="flex flex-col justify-center items-center gap-4 bg-[#EBEBEB] p-2 rounded-lg shadow-md w-80 h-80 mr-4">
                        <p className="text-2xl font-bold ">Product Image</p>
                    </div>
                    <div className="flex flex-col gap-4 w-110 ">
                        <InputBox
                            label="Quantity"
                            value={quantity}
                            placeHolder="Enter quantity"    
                            onChange={(e) => 
                                {
                                    let inputQuantity = e.target.value;
                                    inputQuantity = inputQuantity.replace(/[^0-9]/g, "");
                                    setQuantity(inputQuantity)
                                }}
                        />
                        <InputBox
                            label="Sold Price"
                            value={`$${soldPrice}`}
                            placeHolder="Enter the sold price"
                            onChange={(e) => {
                                let inputSoldPrice = e.target.value;
                                    if (inputSoldPrice.startsWith("$")) {
                                    inputSoldPrice = inputSoldPrice.slice(1);
                                    }
                                
                                // Allow only numbers and dot
                                inputSoldPrice = inputSoldPrice.replace(/[^0-9.]/g, "");
                                setSoldPrice(inputSoldPrice)}}
                        />
                        <div className="flex flex-row gap-4 mt-5">
                            <Button name="Add Sale" bgColor="#6E53AB" />
                            <Button name="Cancel" bgColor="#EB5757" onClick={onClose} />      
                        </div>
                    </div>
                </div>
            </div>
        </PopUp>
        
    </>
  );
}

export default Sale;