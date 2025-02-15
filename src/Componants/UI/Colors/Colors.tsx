import { HTMLAttributes} from "react"
interface Ipropse extends HTMLAttributes<HTMLSpanElement>{
    bg:string
}
const Colors = ({bg,...rest}:Ipropse) => {
    return (
        
            <span {...rest} style={{backgroundColor:bg}} className="w-5 h-5 rounded-full block mt-2"></span>
    )
}
export default Colors