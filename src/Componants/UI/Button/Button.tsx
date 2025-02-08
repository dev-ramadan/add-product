import { ButtonHTMLAttributes, ReactNode } from "react";

interface Ipropse extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?:string;
    children:ReactNode;
    width?:'w-full' | 'w-fit'
}
const Button = ({className,children,width,...events}:Ipropse) => {
    return (
        <>
        <button className={`${className} ${width} rounded-sm p-2 text-white`} {...events} >{children}</button>
        </>
    )
}
export default Button