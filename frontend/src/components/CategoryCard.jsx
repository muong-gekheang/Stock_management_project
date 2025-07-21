function CategoryCard({ category }) {
    return (
        <>
            <div className="bg-[#6E53AB40] w-80 aspect-[320/290] rounded-2xl overflow-hidden shadow-sm transition hover:shadow-lg hover:scale-105">
                <div className="flex flex-col justify-center items-center h-full p-4"> 
                    <p className="text-3xl font-bold text-black">{category.name}</p>
                    <p className="text-black text-xl">{category.amount} {category.amount > 1 ? "items" : "item"}</p>
                </div>
            </div>
        </>
        
    );
}

export default CategoryCard;
