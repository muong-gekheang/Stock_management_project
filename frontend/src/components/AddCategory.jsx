import Popup from "reactjs-popup";
import Button from "./Button";
import InputBox from "./InputBox";
import "reactjs-popup/dist/index.css";
import { useState } from "react";


function AddCategory({isOpen, onClose}){
    const [categoryName, setCategoryName] = useState("");
    return(
    <>
        <Popup open={isOpen} modal nested onClose={onClose}>
            <div>
                <InputBox
                    label="Add category"
                    value={categoryName}
                    placeHolder="Enter new product name"
                    onChange={(e) => setCategoryName(e.target.value)} 
                />
                <div className="flex flex-row justify-center gap-4 mt-5">
                    <Button name="Add" bgColor="#6E53AB" />
                    <Button name="Cancel" bgColor="#EB5757" onClick={onClose} />      
                </div>
            </div>

        </Popup>
    </>
    
)}
export default AddCategory;