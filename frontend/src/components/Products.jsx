import Button from "./Button";
import ProductCard from "./ProductCard";
import Header from "./header";
function Products() {
  return (
    <>
      <div className="flex flex-col gap-4">
          <div className="bg-[#EBEBEB] pb-3">
            <div>
              <Header title="Products" />
            </div>
            <div className="flex flex-row justify-end gap-4 pl-4 pr-4">
              <Button name="+ Add Product" bgColor="#6E53AB" />
              <Button name="Filter" bgColor="#6E53AB" />
            </div>
          </div>

          <div>
            <ProductCard />
            <ProductCard />
          </div>
      </div>
    </>
  );
}

export default Products;