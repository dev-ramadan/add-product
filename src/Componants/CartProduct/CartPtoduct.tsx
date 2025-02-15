import { Idata } from "../../interFaces/InterFaces";
import { descSeeMore, editPrice } from "../../Utils/Utils";
import Button from "../UI/Button/Button";
import Category from "../UI/Category/Category";
import Colors from "../UI/Colors/Colors";
import Image from "../UI/Image/Image";
interface Ipropse {
  product: Idata;
  setEditProduct:(EProduct:Idata) => void;
  openEditModals:()=>void;
  setProductIndex:(value:number)=>void;
  openDeleteModals:()=>void
  idx:number;
}
const CartProduct = ({ product,idx,setEditProduct,openEditModals,setProductIndex,openDeleteModals}: Ipropse) => {


  const { imageURL, title, description, colors, price, category } = product;
  const colorsList = colors.map((color, index) => (
    <Colors key={index} bg={color} />
  ));
  const editProduct = () => {
    setEditProduct(product);
    openEditModals()
    setProductIndex(idx)
  }
  const deleteProduct = () => {
    setEditProduct(product);
    openDeleteModals()

  }
  
  return (
    <>

      <div className="border border-gray-400 flex flex-col p-2 my-5 mx-2">
        <div>
          <Image
            imgUrl={imageURL}
            alt="phto"
            className="rounded-md max-sm:w-md max-md:max-h-64 max-md:w-lg h-50 mx-auto"
          />
          <div className="mx-auto h-32 mt-2">
            <h4>{title}</h4>
            <p>{descSeeMore(description)}</p>
          </div>
        </div>

        <div className="flex space-x-2">{colorsList}</div>
        <div className="flex items-center justify-between my-2">
       <span className="text-green-700 fw-bolder">${editPrice(price)}</span>
       <Category name={category.name} imageURL={category.imageURL}/>
       </div>
        <div className="flex space-x-2 my-5">
          <Button className="bg-indigo-500" width="w-full"
          onClick={editProduct}
          >
            Edit
          </Button>
          <Button className="bg-red-500" width="w-full"
          onClick={()=>deleteProduct()}
          >
            Remove
          </Button>
        </div>
      </div>
    </>
  );
};
export default CartProduct;
