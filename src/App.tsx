import { useState } from "react";
import CartProduct from "./Componants/CartProduct/CartPtoduct";
import Modal from "./Componants/UI/Modal/Modal";
import { productList } from "./data/data";
import Button from "./Componants/UI/Button/Button";

const App = () => {
  const renderProduct = productList.map((product) => (
    <CartProduct key={product.id} product={product} />
  ));

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <main className="container mx-auto">
        <div className="flex justify-between items-center mt-5 p-3.5">
          <span>ADD NEW PRODUCT</span>
          <div>
            <Modal
              isOpen={isOpen}
              openModal={openModal}
              closeModal={closeModal}
              title="ADD PTODUCT"
            >
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
