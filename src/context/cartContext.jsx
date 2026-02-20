import { createContext, useState } from "react";
import useFetch from "../useFetch";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { data } = useFetch("http://localhost:3000/api/products");
  const [cart, setCart] = useState([]);
  const [wishlist,setWishlist] = useState([])

  const addToCart = (product) => {
    setCart((prevValue) => [...prevValue, product]);
  };

   const addToWishlist = (product) => {
    setWishlist((prevValue) => [...prevValue, product]);
  };

  

  const increment = (id) => {
    const product = data?.find((item) => item._id === id);
    product.productQuantity += 1;
  };

  const decrement = (id) => {
    const product = data?.find((item) => item._id === id);
    if (product.productQuantity > 1) {
      product.productQuantity -= 1;
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, increment, decrement,addToWishlist,wishlist,setWishlist, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
