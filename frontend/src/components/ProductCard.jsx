import Button from "./Button";

function ProductCard(){
    return(
        <>
            <div className="flex bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg px-4 py-3 items-center gap-x-4 outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 hover:">
                <div className="flex flex-col item-center ">
                    <div className="w-64 h-64 bg-blue-100 flex items-center justify-center">
                        <p className="text-blue-500 font-medium">Product Image </p>
                    </div>
                    <p className="p-4">3 stripes cropped t-shirt - BLUE</p>
                </div>
                <div className="flex flex-col px-6 gap-7 justify-center">   
                    <div className="flex flex-row gap-2">
                        <span>Stock:</span>
                        <span>12</span>
                        <span>in stock</span>
                    </div>
                    <div className="flex flex-row gap-2">
                        <span>Category:</span>
                        <span>Crop Tops</span>
                    </div>
                    <div className="flex flex-row gap-2">
                        <span>Price:</span>
                        <span>$12.00</span>
                    </div>
                    <div className="flex flex-row gap-4 ">
                        <Button name="View" bgColor="#6E53AB" />
                        <Button name="Sale" bgColor="#6E53AB" />
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductCard;