import { ImgHTMLAttributes } from "react";

interface Ipropse extends ImgHTMLAttributes<HTMLImageElement>{
    imgUrl:string;
    alt:string;
    className:string;
}
const Image = ({imgUrl,alt,className,...imgAtrr}:Ipropse) => {
    return (
        <>
        <img src={imgUrl} alt={alt} className={className} {...imgAtrr}/>
        </>
    )
}
export default Image