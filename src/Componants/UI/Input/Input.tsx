import { InputHTMLAttributes } from "react"

interface IProps extends InputHTMLAttributes<HTMLInputElement>{

} 

const Input = ({...rest}:IProps) =>{
    return(
        <>
        <input  className="outline-indigo-500  border-[1px] border-gray-500 rounded-md py-3 px-3 text-md shadow-md my-1.5" {...rest}/>
        </>
    )
}
export default Input