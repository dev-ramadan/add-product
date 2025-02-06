
interface Ipropse {
    colors:string
}
const Colors = (colors:Ipropse) => {
    return (
        <>
        <span style={{backgroundColor:`${colors.colors}`}} className="w-5 h-5"></span>
        </>
    )
}
export default Colors