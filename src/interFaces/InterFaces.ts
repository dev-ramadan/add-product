export interface Idata {
    id ?: string | undefined | number;
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

export interface IFormInput {
    id:string;
    label:string;
    name:'title'|'description'|'price'|'imageURL';
    type:string;
}
