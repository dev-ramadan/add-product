import {ChangeEvent, FormEvent, useState } from "react";
import CartProduct from "./Componants/CartProduct/CartPtoduct";
import Modal from "./Componants/UI/Modal/Modal";
import {  colors, formInputsList, productList } from "./data/data";
import Button from "./Componants/UI/Button/Button";
import Input from "./Componants/UI/Input/Input";
import { Idata } from "./interFaces/InterFaces";
import { validationProduct } from "./Componants/Validation/Validation";
import Error from "./Componants/Error/Error";
import Colors from "./Componants/UI/Colors/Colors";
import {v4 as uuid } from "uuid";



const App = () => {  
  const defultProduct = {
    title:'',
    description:'',
    imageURL:'',
    price:'',
    colors:[],
    category:{
      imageURL:'',
      name:""
    }
  }
  const [isOpen, setIsOpen] = useState(false);
  const [newProduct,setNewProduct] = useState<Idata[]>(productList)
  const [addProductInput,SetAddProductInput] = useState<Idata>(defultProduct);
  const [tempColor,setTempColor] = useState<string[]>([])
  const [error,setError] = useState({title:"",price:"",description:"",imageURL:""})
  const closeModal = () => setIsOpen(false);
  
  const openModal = () => setIsOpen(true);
  
  const handlaerProduct = (e:ChangeEvent<HTMLInputElement>) => {
    const {value,name} = e.target;
    SetAddProductInput({
      ...addProductInput,
      [name]:value
    })
    setError({
      ...error,
      [name]:""
    })
  }



    // HANDEEL DATA
    const renderProduct = newProduct.map((product) => (
      <CartProduct key={product.id} product={product} />
    ));


  
        // HANDELL INPUT
      const  handeelInput = formInputsList.map(input => (
      <div key={input.id} className="flex flex-col">
        <label htmlFor={input.id}>{input.label}</label>
        <Input type="text" id={input.id} name={input.name} value={addProductInput[input.name] } onChange={handlaerProduct} />
        <Error msg={error[input.name]}/>
      </div>
      ));




      // HANDELL COLORS 
      const colorList = colors.map((color,index)=>(
        <Colors key={index} bg={color} onClick={()=>{
          if(tempColor.includes(color)){
           setTempColor(tempColor.filter(item => item !== color))
          }else{
            setTempColor(prev =>[...prev,color]);
          }
        }}/>
      ))

      const colorChose = tempColor.map(thisColor => (
        <span key={thisColor} className="mx-0.5 rounded-md p-0.5" style={{backgroundColor:`${thisColor}`}}>{thisColor}</span>
      ));



      // HANDELL CATEGORY

      // const categoryList = categories.map(categorie =>(
      //   <Category key={categorie.id} name={categorie.name} imageURL={categorie.imageURL}/>
      // ))


      // HANDEL FORM && FORM BUTTON
      const submintFormHandler = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const {title,price,imageURL,description} = addProductInput
        const errors = validationProduct({
          title,
          price,
          imageURL,
          description
        })
        const handelError = 
        Object.values(errors).some(value => value === "" && Object.values(errors).every(value => value === ""))
        if(!handelError){setError(errors)
          return;
      }else{
        console.log('sucsess') 
        SetAddProductInput(defultProduct)
        setNewProduct(prev => [{...addProductInput,colors:tempColor,id:uuid()},...prev]);
        setTempColor([])
        closeModal()
      }
      
        }

      const canselHandelr = () => {
        SetAddProductInput(defultProduct)
        closeModal()
      }
    
    

  return (
    <>
      <main className="container mx-auto">
        <div className="flex justify-between items-center mt-5 p-3.5">
          <span>ADD NEW PRODUCT</span>
          <div>
            <Modal
              isOpen={isOpen}
              openModal={()=>openModal()}
              closeModal={closeModal}
              title="ADD PTODUCT"
            >



           <form onSubmit={submintFormHandler}>
                {/* INPUTS */}
               {handeelInput}
               {colorChose}
               <div className="flex items-center space-x-2 mt-1">
               {colorList}
               </div>

        {/* <div className="flex items-center justify-between my-2">
          {categoryList}
        </div> */}


              {/* BUTTONS */}
              <div className="flex space-x-2 my-5">
                <Button className="bg-indigo-500" width="w-full">
                  SUBMINT
                </Button>
                <Button
                  className="bg-gray-500"
                  width="w-full"
                  type="button"
                  onClick={() => canselHandelr()}
                >
                  CANCLE
                </Button>
              </div>
           </form>
            </Modal>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {renderProduct}
        </div>
      </main>
    </>
  );
};
export default App;
