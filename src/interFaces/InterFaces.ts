export 
interface Idata {
    id : string | undefined | number;
    title : string;
    imageURL : string;
    price:string;
    description :string;
    colors : string[];
    category : {
    name : string;
    imageURL : string;
    };
}