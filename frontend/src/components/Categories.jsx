import CategoryCard from "./CategoryCard"
import Header from "./Header"
import Button from "./Button"
import { categoryData } from "../SampleData/sampleData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddCategory from "./AddCategory";

function Categories() {
    const [categoryPopUpOpen, setCategoryPopUpOpen] = useState(false);

    const handleAddCategoryOpen = () => setCategoryPopUpOpen(true);
    const handleAddCategoryClose = () => setCategoryPopUpOpen(false);
    return (
        <>  
            <div className="flex flex-col gap-4">
                <div className="bg-[#EBEBEB] pb-3">
                    <div>
                        <Header title="Categories" />
                    </div>
                    <div className="flex flex-row justify-end gap-4 pl-4 pr-4">
                        <Button name="+ Add Category" bgColor="#6E53AB" 
                            onClick={handleAddCategoryOpen}
                        />
                    </div>
                </div>
                <div className="flex flex-row flex-wrap justify-center gap-4">
                    {categoryData.map((category) => (
                        <CategoryCard
                            key={category.categoryCode}
                            category={category} 
                           
                        />
                    ))}
                </div>
                <AddCategory
                    isOpen={categoryPopUpOpen}
                    onClose={handleAddCategoryClose}
                />
            </div>
        </>  
    );
}

export default Categories;
