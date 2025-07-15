import Button from "./Button";
import Header from "./header";
function ProductInfo() {
    return (
        <>
            <div className="flex flex-col justify-center gap-4">
                <div>
                    <Header title="Product" />
                </div>
                <div></div>
            </div>


            <div className="flex flex-row bg-white rounded-lg pl-5  ">
                <div className="w-150 h-150 bg-blue-100 flex items-center justify-center">
                    <p className="text-blue-500 font-medium">Product Image </p>
                </div>

                <div className="flex flex-col ml-20">
                    <p className="text-4xl font-bold">3 stripes cropped t-shirt - BLUE</p>
                    <div className="flex flex-row gap-4 mt-8 text-2xl">
                        <span>Product Code:</span>
                        <span>12345</span>
                    </div>

                    <div className="flex flex-row gap-4 mt-8 text-2xl">
                        <span>Category:</span>
                        <span>T-shirts</span>
                    </div>

                    <div className="flex flex-row gap-4 mt-8 text-2xl">
                        <span>Imported Price:</span>
                        <span>$7.50</span>
                    </div>
                    <div className="flex flex-row gap-4 mt-8 text-2xl">
                        <span>Selling Price:</span>
                        <span>$18.99</span>
                    </div>
                    <div className="flex flex-row gap-4 mt-8 text-2xl">
                        <span>Stock Quantity:</span>
                        <span>42</span>
                    </div>
                    <div className="flex flex-row gap-4 mt-8 text-2xl">
                        <span>Low Stock Threshold:</span>
                        <span>10</span>
                    </div>

                    <div className="flex flex-col justify-center  gap-4 ml-6 mt-10">
                        <div className="flex flex-row gap-4 mt-6">
                            <Button name="Update" bgColor="#6E53AB" />
                            <Button name="Delete" bgColor="#EF4444" />
                        </div>
                    </div>
                </div>


            </div>

            
        </>
    );
}

export default ProductInfo;