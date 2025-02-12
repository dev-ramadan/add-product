interface Ipropse {
    name:string;
    imageURL:string;
}

const Category = ({name,imageURL}:Ipropse) => {
    return (
        <span className="flex flex-col items-center"> 
          <img
            src={imageURL}
            alt=""
            className="w-10 h-10 rounded-full object-center"
          />
          {name}
          
        </span>
      
    )
}

export default Category