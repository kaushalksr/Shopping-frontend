import { createContext, useEffect, useState } from "react";
import useFetch from "../useFetch";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success", 
  });

  const showAlert = (message, type = "success") => {
    setAlert({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        type: "success",
      });
    }, 3000);
  };

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

  useEffect(() => {
    if (Array.isArray(cart)) {
      setProducts(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  const addToCart = (product) => {
    if (products.some((item) => item._id === product._id)) {
      increment(product._id);
      showAlert("Item Added to cart", "success");
    } else {
      setCart((prevValue) => [...prevValue, product]);
      showAlert("Item Added to cart", "success");
    }
  };

  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item._id === product._id)) {
      setWishlist((prevValue) => [...prevValue, product]);
      showAlert("Item added to wishlist", "success");
    }
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
        filteredProducts,
        setFilteredProducts,
        searchText,
        setSearchText,
        alert,
        showAlert,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
