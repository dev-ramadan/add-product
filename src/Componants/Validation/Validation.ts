// insert validation 

export const validationProduct = (product:{title:string,price:string,imageURL:string,description:string}) => {
const errors:{title:string,description:string,price:string,imageURL:string}= {
    title:"",
    description:"",
    price:"",
    imageURL:"",
}
const imgUrlPattern = /^(ftp|http|https):\/\//.test(product.imageURL);

if(!product.title.trim() || product.title.length < 10 || product.title.length > 80){
    errors.title = 'TITLE MUST BETWEEN 10 CHR AND 80 CHR'
}

if(!product.description.trim() || product.description.length < 10 || product.description.length > 80){
    errors.description = 'DESCRIPTION MUST BETWEEN 10 CHR AND 80 CHR'
}

if(!product.price.trim() || isNaN(Number(product.price))){
    errors.price = 'INSERT A VALID PRICE'
}

if(!product.imageURL.trim() || !imgUrlPattern){
    errors.imageURL = 'INSERT A VALID IMAGEURL'
}

return errors
}