import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { CartContext } from "../context/cartContext";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const OrderHistory = () => {
  const { orderData, setOrderData } = useContext(CartContext);

  const today = new Date();
  

  if (!orderData) return <Loader />;

  return (
    <div>
      <Header />
      <div className="container mb-5 p-2">
        <h3 className="text-center">ORDERS</h3>

        {orderData?.map((item) => (
          <div className="row d-flex text-center rounded-2 m-2 border border-2 border-primary justify-content-start align-items-center">
            <div className="col-lg-7 col-sm-12">
              <div className="fs-5 h5">
                {item.cart.map((product) => (
                  <span className="border border-3 m-1 btn fs-5 fw-medium">
                    {product.productName} {product.size} ({product.quantity}) 
                  </span>
                ))}
              </div>
            </div>
            <div className="col-lg-2 col-sm-11">
              {" "}
              <i className="fs-5 h5">TOTAL PRICE: ₹{item.price}.00</i>{" "}
            </div>
            <div className="col-lg-3 col-sm-12">
              <h5>
                <i>
                  Ordered on <span>{today.toLocaleDateString()}</span>
                </i>{" "}
                <br />
                <i>Ordered At: {item.address}</i>
              </h5>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
