import CartProduct from "./Componants/CartProduct/CartPtoduct"
import { productList } from "./data/data"

const App = () => {
  const renderProduct = productList.map((product) =>
     <CartProduct key={product.id} product={product}/>)
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {renderProduct}
    </div>
    </>
  )
}
export default App