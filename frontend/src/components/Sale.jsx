import Header from "./header";
import InputBox from "./InputBox";
import Button from "./Button";
function Sale() {
  return (
    <>
        <div>
            <Header title="Sale" />
        </div>

        <div className="flex flex-row gap-8 m-10 justify-center items-center w-full">
            <div className="flex flex-col justify-center items-center gap-4 bg-[#EBEBEB] p-4 rounded-lg shadow-md w-110 h-110 mr-10">
                <p className="text-2xl font-bold ">Product Image</p>
            </div>
            <div className="flex flex-col gap-4 w-110 ">
                <InputBox
                    label="Quantity"
                    value=""
                    placeHolder="Enter quantity"
                    onChange={() => {}}
                />
                <InputBox
                    label="Sold Price"
                    value=""a
                    placeHolder="Enter sold price"
                    onChange={() => {}}
                />
                <div className="flex flex-row gap-4 mt-5">
                    <Button name="Add Sale" bgColor="#6E53AB" />
                    <Button name="Cancel" bgColor="#EB5757" />      
                </div>

            </div>
            
        </div>
    </>
  );
}

export default Sale;