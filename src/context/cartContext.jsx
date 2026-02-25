import { createContext, useEffect, useState } from "react";
import useFetch from "../useFetch";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [selectedAddress, setSelectedAddress] = useState("");

  const [cart, setCart] = useState(() => {
    const storedCartValue = localStorage.getItem("cart");
    if (!storedCartValue || storedCartValue === "undefined") return [];

    const parsed = JSON.parse(storedCartValue);
    return Array.isArray(parsed) ? parsed : [];
  });

  const [address, setAddress] = useState(() => {
    const storedAddress = localStorage.getItem("address");
    if (!storedAddress || storedAddress === "undefined") return [];

    const parsed = JSON.parse(storedAddress);

    return Array.isArray(parsed) ? parsed : [];
  });
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);

  const totalPrice = cart?.reduce((acc, curr) => {
    acc += curr.productPrice * curr.productQuantity;
    return acc;
  }, 0);

  const totalDiscount = cart?.reduce((acc, curr) => {
    acc +=
      ((curr.productDiscount * curr.productPrice) / 100) * curr.productQuantity;
    return acc;
  }, 0);

  const totalDeliveryCharge = cart?.reduce((acc, curr) => {
    acc += curr.productDeliveryCharge * curr.productQuantity;
    return acc;
  }, 0);

  const [orderData, setOrderData] = useState([]);

  // useEffect(() => {
  //   if (Array.isArray(order)) {
  //     localStorage.setItem("order", JSON.stringify(order));
  //   }
  // });

  useEffect(() => {
    if (Array.isArray(cart)) {
      setProducts(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  const addToCart = (product) => {
    if (products.some((item) => item._id === product._id)) {
      increment(product._id);
    } else setCart((prevValue) => [...prevValue, product]);
  };

  const addToWishlist = (product) => {
    setWishlist((prevValue) => [...prevValue, product]);
  };

  const increment = (id) => {
    setCart((prevValue) =>
      prevValue.map((item) =>
        item._id === id
          ? { ...item, productQuantity: item.productQuantity + 1 }
          : item,
      ),
    );
  };

  const decrement = (id) => {
    setCart((prevValue) =>
      prevValue.map((item) =>
        item._id === id && item.productQuantity > 1
          ? { ...item, productQuantity: item.productQuantity - 1 }
          : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        increment,
        decrement,
        addToWishlist,
        wishlist,
        setWishlist,
        setCart,
        addToCart,
        products,
        setProducts,
        totalPrice,
        totalDiscount,
        totalDeliveryCharge,
        orderData,
        setOrderData,
        address,
        setAddress,
        selectedAddress,
        setSelectedAddress,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
