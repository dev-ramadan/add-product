import { ChangeEvent, FormEvent, useState } from "react";
import CartProduct from "./Componants/CartProduct/CartPtoduct";
import Modal from "./Componants/UI/Modal/Modal";
import { categories, colors, formInputsList, productList } from "./data/data";
import Button from "./Componants/UI/Button/Button";
import Input from "./Componants/UI/Input/Input";
import { Idata } from "./interFaces/InterFaces";
import { validationProduct } from "./Componants/Validation/Validation";
import Error from "./Componants/Error/Error";
import Colors from "./Componants/UI/Colors/Colors";
import { v4 as uuid } from "uuid";
import SelectMenu from "./Componants/UI/SelectMenu/SelectMenu";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const defultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      imageURL: "",
      name: "",
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Idata[]>(productList);
  const [addProductInput, SetAddProductInput] = useState<Idata>(defultProduct);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [error, setError] = useState({
    title: "",
    price: "",
    description: "",
    imageURL: "",
  });

  const [selected, setSelected] = useState(categories[0]);
  const [editProduct, setEditProduct] = useState<Idata>(defultProduct);
  const [openEditModal, setOPenEditModal] = useState(false);
  const [productIndex, setProductIndex] = useState<number>(0);
  const [openDeleteModal, setOPenDeleteModal] = useState(false);

  // Modal new product
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  // modal Edit Product
  const closeEditModals = () => setOPenEditModal(false);
  const openEditModals = () => setOPenEditModal(true);

  // modal Delete Product
  const openDeleteModals = () => setOPenDeleteModal(true);
  const closeDeleteModals = () => setOPenDeleteModal(false);

  const handlaerProduct = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    SetAddProductInput({
      ...addProductInput,
      [name]: value,
    });
    setError({
      ...error,
      [name]: "",
    });
  };

  // handeler edit ptoduct
  const handlaerEditProduct = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: value,
    });
    setError({
      ...error,
      [name]: "",
    });
  };

  // HANDEEL DATA
  const renderProduct = newProduct.map((product, idx) => (
    <CartProduct
      key={product.id}
      product={product}
      setEditProduct={setEditProduct}
      openEditModals={openEditModals}
      setProductIndex={setProductIndex}
      idx={idx}
      openDeleteModals={openDeleteModals}
    />
  ));

  // HANDELL INPUT
  const handeelInput = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label htmlFor={input.id}>{input.label}</label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={addProductInput[input.name]}
        onChange={handlaerProduct}
      />
      <Error msg={error[input.name]} />
    </div>
  ));

  // HANDELL COLORS
  const colorList = colors.map((color, index) => (
    <Colors
      key={index}
      bg={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
        } else {
          setTempColor((prev) => [...prev, color]);
        }
        if (editProduct.colors.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
        }
        editProduct.colors.map((colorss, idx) => {
          if (colorss.includes(color)) {
            setTempColor(editProduct.colors.splice(idx, 1));
          }
        });

        return;
      }}
    />
  ));

  const colorChose = tempColor.map((thisColor) => (
    <span
      key={thisColor}
      className="mx-0.5 rounded-md p-0.5"
      style={{ backgroundColor: `${thisColor}` }}
    >
      {thisColor}
    </span>
  ));

  // HANDEL FORM && FORM BUTTON
  const submintFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, price, imageURL, description } = addProductInput;
    const errors = validationProduct({
      title,
      price,
      imageURL,
      description,
    });
    const handelError = Object.values(errors).some(
      (value) =>
        value === "" && Object.values(errors).every((value) => value === "")
    );
    if (!handelError) {
      setError(errors);
      return;
    }

    setNewProduct((prev) => [
      {
        ...addProductInput,
        colors: tempColor,
        id: uuid(),
        category: selected,
      },
      ...prev,
    ]);
    setTempColor([]);
    SetAddProductInput(defultProduct);
    closeModal();
    toast.success("Product Add Successfuly ", {
      style: { backgroundColor: "black", color: "white" },
    });
  };

  // HANDEL Edit product
  const submintEditProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, price, imageURL, description } = editProduct;
    const errors = validationProduct({
      title,
      price,
      imageURL,
      description,
    });
    const handelError = Object.values(errors).some(
      (value) =>
        value === "" && Object.values(errors).every((value) => value === "")
    );
    if (!handelError) {
      setError(errors);
      return;
    }

    const updateProduct = [...newProduct];
    updateProduct[productIndex] = {
      ...editProduct,
      colors: tempColor.concat(editProduct.colors),
    };
    setNewProduct(updateProduct);
    setTempColor([]);
    closeEditModals();
    SetAddProductInput(defultProduct);
    toast.success("Product Edited Successfuly ", {
      style: { backgroundColor: "black", color: "white" },
    });
  };

  // HANDEL DELETE product
  const deleteProduct = () => {
    const filterProduct = newProduct.filter(
      (productDeleted) => productDeleted.id !== editProduct.id
    );
    setNewProduct(filterProduct);
    closeDeleteModals();
    toast.success("Product Has Ben Deleted ", {
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const canselHandelr = () => {
    SetAddProductInput(defultProduct);
    closeModal();
  };

  const handelInputEdit = (
    id: string,
    label: string,
    name: "title" | "description" | "imageURL" | "price"
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id}>{label}</label>
        <Input
          type="text"
          id={id}
          name={name}
          value={editProduct[name]}
          onChange={handlaerEditProduct}
        />
        <Error msg={error[name]} />
      </div>
    );
  };

  return (
    <>
      <main className="container mx-auto">
        <div className="flex justify-between items-center mt-5 p-3.5 ">
          <div className="flex items-center  w-full justify-between">
            <span>ADD NEW PRODUCT</span>
            <Button
              className="bg-indigo-400"
              width="w-fit"
              onClick={() => openModal()}
            >
              BULID PRODUCT
            </Button>
          </div>

          {/* modal new product */}
          <div>
            <Modal isOpen={isOpen} closeModal={closeModal} title="ADD PTODUCT">
              <form onSubmit={submintFormHandler}>
                {/* INPUTS */}
                {handeelInput}
                <SelectMenu selected={selected} setSelected={setSelected} />
                {colorChose}
                <div className="flex items-center space-x-2 mt-1">
                  {colorList}
                </div>

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

          {/* model edit product */}
          <div>
            <Modal
              isOpen={openEditModal}
              closeModal={closeEditModals}
              title="EDIT PRODUCT"
            >
              <form onSubmit={submintEditProduct}>
                {handelInputEdit("title", "title", "title")}
                {handelInputEdit("description", "description", "description")}
                {handelInputEdit("imageURL", "imageURL", "imageURL")}
                {handelInputEdit("price", "price", "price")}

                <div className="mb-2.5">
                  <SelectMenu
                    selected={editProduct.category}
                    setSelected={(value) =>
                      setEditProduct({ ...editProduct, category: value })
                    }
                  />
                </div>

                {tempColor.concat(editProduct.colors).map((thisColor) => (
                  <span
                    key={thisColor}
                    className="mx-0.5 rounded-md p-0.5"
                    style={{ backgroundColor: `${thisColor}` }}
                  >
                    {thisColor}
                  </span>
                ))}
                <div className="flex items-center space-x-2 mt-1">
                  {colorList}
                </div>

                {/* BUTTONS */}
                <div className="flex space-x-2 my-5">
                  <Button className="bg-indigo-500" width="w-full">
                    SUBMINT
                  </Button>
                  <Button
                    className="bg-gray-500"
                    width="w-full"
                    type="button"
                    onClick={() => closeEditModals()}
                  >
                    CANCLE
                  </Button>
                </div>
              </form>
            </Modal>
          </div>

          {/*modal remove product */}
          <div>
            <Modal
              isOpen={openDeleteModal}
              closeModal={closeDeleteModals}
              title="Are You Sure You Want Deleted This Product ?"
            >
              <p>
                Are you sure you want to delete this product? This action is
                irreversible and will permanently remove the product from the
                system. Please confirm before proceeding
              </p>

              {/* BUTTONS */}
              <div className="flex space-x-2 my-5">
                <Button
                  className="bg-red-500"
                  width="w-full"
                  onClick={deleteProduct}
                >
                  OK
                </Button>
                <Button
                  className="bg-gray-400"
                  width="w-full"
                  type="button"
                  onClick={() => closeDeleteModals()}
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
        <Toaster />
      </main>
    </>
  );
};
export default App;

// HANDELL CATEGORY const categoryList = categories.map(categorie =>( <Category key={categorie.id} name={categorie.name} imageURL={categorie.imageURL}/>))
