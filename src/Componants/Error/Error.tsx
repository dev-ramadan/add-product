interface  IPropse{
    msg:string
}
const ValdationText = ({msg}:IPropse) => {
    return  msg?<span className="text-red-700 block">{msg}</span>:null
}
export default ValdationText