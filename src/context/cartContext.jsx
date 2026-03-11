import { createContext, useEffect, useState } from "react";
import Loader from "../components/Loader";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

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
    }, 1000);
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
    acc += curr.productPrice * curr.quantity;
    return acc;
  }, 0);

  const totalDiscount = cart?.reduce((acc, curr) => {
    acc += ((curr.productDiscount * curr.productPrice) / 100) * curr.quantity;
    return acc;
  }, 0);

  const totalDeliveryCharge = cart?.reduce((acc, curr) => {
    acc += curr.productDeliveryCharge * curr.quantity;
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
    if (!selectedSize) {
      showAlert(`Please select size of ${product.productName}`, "danger");
      return;
    }
    if (!product.size) {
      const cartItem = {
        ...product,
        size: selectedSize,
        quantity: product.productQuantity,
        cartId: product._id + "_" + selectedSize,
      };
      setCart((prevValue) => [...prevValue, cartItem]);
    } else {
      const cartItem = {
        ...product,
        size: product.size,
        quantity: product.productQuantity,
        cartId: product._id + "_" + product.size,
      };
      setCart((prevValue) => [...prevValue, cartItem]);
    }

    showAlert(`${product.productName} added to cart`, "success");
  };

 

  const addToWishlist = (product) => {
    !product.size ? (product.size = "M") : product.size;
    const wishListItem = {
      ...product,
      size: product.size,
      wishListId: product._id + Math.random(),
    };
    setWishlist((prevValue) => [...prevValue, wishListItem]);
    showAlert(`${product.productName} added to wishlist`, "success");
  };

  const removeFromWishlist = (product) => {
    setWishlist((prevState) =>
      prevState.filter((item) => item._id !== product._id),
    );

    showAlert(`${product.productName} removed from wishlist`, "danger");
  };

  const increment = (id) => {
    setCart((prevValue) =>
      prevValue.map((item) =>
        item.cartId === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrement = (id) => {
    setCart((prevValue) =>
      prevValue.map((item) =>
        item.cartId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // loader

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
        removeFromWishlist,
        selectedSize,
        setSelectedSize,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
