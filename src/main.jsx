import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HomePage from "./pages/HomePage.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import CartProvider from "./context/cartContext.jsx";
import CartPage from "./pages/CartPage.jsx";
import Wishlist from "./pages/WishList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/api/products",
    element: <ProductListing />,
  },
  {
    path: "/cartlist",
    element: <CartPage />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
);
