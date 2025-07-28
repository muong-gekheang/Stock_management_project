import { useNavigate } from "react-router-dom";
function CategoryCard({ category }) {
    const navigate = useNavigate();
    const handleCategoryClick = () =>{
        navigate(`/product-by-category/${category.CategoryID}`);
    }

    return (
        <>
            <div className="bg-[#53ab5c40] w-80 aspect-[320/290] rounded-2xl overflow-hidden shadow-sm transition hover:shadow-lg hover:scale-105"
                onClick={handleCategoryClick}
            >
                <div className="flex flex-col justify-center items-center h-full p-4"> 
                    <p className="text-3xl font-bold text-black">{category.CategoryName}</p>
                </div>
            </div>
        </>
        
    );
}

export default CategoryCard;