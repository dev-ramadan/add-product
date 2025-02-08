import { Idata } from "../../interFaces/InterFaces";
import { descSeeMore } from "../../Utils/Utils";
import Button from "../UI/Button/Button";
import Colors from "../UI/Colors/Colors";
import Image from "../UI/Image/Image";
interface Ipropse {
  product: Idata;
}
const CartProduct = ({ product }: Ipropse) => {
  const { imageURL, title, description, colors, price, category } = product;
  const colorsList = colors.map((color, index) => (
    <Colors key={index} colors={color} />
  ));
  return (
    <>
      <div className="border border-gray-400 flex flex-col p-2 my-5 mx-2">
        <div>
          <Image
            imgUrl={imageURL}
            alt="phto"
            className="rounded-md max-sm:w-md max-md:w-xl  mx-auto h-40"
          />
          <div className="mx-auto h-32 mt-2">
            <h4>{title}</h4>
            <p>{descSeeMore(description)}</p>
          </div>
        </div>

        <div className="flex space-x-2">{colorsList}</div>
        <div className="flex items-center justify-between my-2">
          <span>${price}</span>
          <span className="flex flex-col items-center">
            <img
              src={category.imageURL}
              alt=""
              className="w-10 h-10 rounded-full object-center"
            />
            {category.name}
          </span>
        </div>
        <div className="flex space-x-2 my-5">
          <Button className="bg-indigo-500" width="w-full">
            Edit{" "}
          </Button>
          <Button className="bg-red-500" width="w-full">
            Remove
          </Button>
        </div>
      </div>
    </>
  );
};
export default CartProduct;
