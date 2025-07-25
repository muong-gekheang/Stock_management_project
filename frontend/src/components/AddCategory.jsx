import Popup from "reactjs-popup";
import Button from "./Button";
import InputBox from "./InputBox";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import axios from 'axios';


function AddCategory({isOpen, onClose}){
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddCategory = async () => {
        console.log("Add button clicked");
        setError("");
        if (!categoryName.trim()) {
            setError("Category name cannot be empty");
            return;
        }
        setLoading(true);
        try{
            const token = localStorage.getItem('token');
            if(!token){
                setError("You must be logged in to add a category.");
                setLoading(false);
                return;
            }

            const response = await axios.post('http://localhost:3001/api/categories', 
                { categoryName }, 
                { headers: { Authorization: `Bearer ${token}` }}
            );
            alert(response.data.message);
            setCategoryName("");
            onClose();
        }catch(error){
            console.error('Add category error:', error.response?.data || error.message);
            setError(err.response?.data?.message || "Failed to add category.");
        } finally {
            setLoading(false);
        }
    }

    return(
    <>
        <Popup open={isOpen} modal nested onClose={onClose}>
            <div>
                <InputBox
                    label="Add category"
                    value={categoryName}
                    placeHolder="Enter new category name"
                    onChange={(e) => setCategoryName(e.target.value)} 
                />
                <div className="flex flex-row justify-center gap-4 mt-5">
                    <Button name="Add" bgColor="#6E53AB" 
                        onClick={handleAddCategory}
                    />
                    <Button name="Cancel" bgColor="#EB5757" onClick={onClose} />      
                </div>
            </div>

        </Popup>
    </>
    
)}
export default AddCategory;