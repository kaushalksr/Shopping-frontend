import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CartProvider from "./context/cartContext";

function App() {
  return (
    <CartProvider>
      <HomePage />
     </CartProvider>
  );
}

export default App;
