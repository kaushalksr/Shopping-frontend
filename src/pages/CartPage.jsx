import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import Header from "../components/Header";

const Cart = () => {
  const { cart } = useContext(CartContext);
  console.log(cart);
  return (
    <div>
      <Header/>
      {cart.map((item) => (
        <p>{item.productName}</p>
      ))}
    </div>
  );
};

export default Cart;
