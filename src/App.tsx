import {ChangeEvent, useState } from "react";
import CartProduct from "./Componants/CartProduct/CartPtoduct";
import Modal from "./Componants/UI/Modal/Modal";
import { formInputsList, productList } from "./data/data";
import Button from "./Componants/UI/Button/Button";
import Input from "./Componants/UI/Input/Input";
import { Idata } from "./interFaces/InterFaces";
const App = () => {


  const [isOpen, setIsOpen] = useState(false);
  const [addProductInput,SetAddProductInput] = useState<Idata>({
    title:'',
    description:'',
    imageURL:'',
    price:'',
    colors:[],
    category:{
      imageURL:'',
      name:""
    }
  
  })

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);
  
  const handlaerProduct = (e:ChangeEvent<HTMLInputElement>) => {
    const {value,name} = e.target;
    SetAddProductInput({
      ...addProductInput,
      [name]:value
    })

  }

    // HANDEEL DATA
    const renderProduct = productList.map((product) => (
      <CartProduct key={product.id} product={product} />
    ));
  
        // HANDELL INPUT
      const  handeelInput = formInputsList.map(input => (
      <div key={input.id} className="flex flex-col">
        <label htmlFor={input.id}>{input.label}</label>
        <Input type="text" id={input.id} name={input.name} value={addProductInput[input.name] } onChange={handlaerProduct} />
      </div>
      ))

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



           <form >
              {/* INPUTS */}
 
              {handeelInput }

              {/* BUTTONS */}
              <div className="flex space-x-2 my-5">
                <Button className="bg-indigo-500" width="w-full">
                  SUBMINT
                </Button>
                <Button
                  className="bg-gray-500"
                  width="w-full"
                  onClick={() => closeModal()}
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
