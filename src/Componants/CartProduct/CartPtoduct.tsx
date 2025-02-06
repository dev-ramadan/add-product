import { Idata } from "../../interFaces/InterFaces";
import { descSeeMore } from "../../Utils/Utils";
import Button from "../Button/Button";
import Colors from "../Colors/Colors";
import Image from "../Image/Image";
interface Ipropse {
  product: Idata;
}
const CartProduct = ({ product }: Ipropse) => {
  const { imageURL, title, description, colors, price, category } = product;
  const colorsList = colors.map((color, index) => (
    <Colors key={index} colors={color} />
  ));
  return (
    <div className="border border-gray-400 flex flex-col p-2 my-5 mx-2">
      <div>
        <Image
          style={{ height: "200px" }}
          imgUrl={imageURL}
          alt="phto"
          className="w-full rounded-md"
        />
        <h4>{title}</h4>
        <p>{descSeeMore(description)}</p>
      </div>
      <div className="flex space-x-2 my-7">{colorsList}</div>
      <div className="flex items-center justify-between">
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
  );
};
export default CartProduct;
