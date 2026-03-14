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
      <div className="container">
        <h3 className="text-center">ORDERS</h3>

        {orderData?.map((item) => (
          <div className="row w-100 d-flex p-2 rounded-2 m-0 border border-2 border-primary text-center justify-content-center align-items-center">
            <div className="col-lg-4 col-sm-12">
              {item.cart.map((product) => (
                <img
                  className=""
                  style={{ width: 80, height: 80,borderRadius:"50%" }}
                  src={product.productImage}
                />
              ))}
            </div>
            <div className="col-lg-3 col-sm-12">
              <div className="fs-5 h5">
                {item.cart.map((product) => (
                  <p className="p-0 m-0">
                    {product.productName} {product.size} ({product.quantity})
                  </p>
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
