import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { CartContext } from "../context/cartContext";
import deleteImg from "../logo/deleteImg.png";

const OrderHistory = () => {
  const { orderData, setOrderData } = useContext(CartContext);

  console.log(orderData);

  const today = new Date();

  return (
    <div>
      <Header />
      <div className="container">
        <h3 className="text-center">ORDERS</h3>
        <div className="row m-0 p-0">
          {orderData?.map((item, index) => (
            <div className="row w-100 p-0 m-0 border border-2 border-warning">
              <div className="col-lg-6 m-0 p-0">
                <div className="row ">
                  <div className="col-lg-8">
                  {item.cart.map((product) =>  <img
                      className="rounded-0"
                      style={{ width: 100, height: 100 }}
                      src={product.productImage}
                    />) }
                  </div>
                  <div className="col-lg-4">
                    <div className=" h5">
                      {item.cart.map((product) => (
                        <p className="p-0 m-0">
                          {" "}
                          {product.productName} ({product.productQuantity})
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-5 px-2">
                    {" "}
                    <p className="fs-5 h5">₹{item.price}.00</p>{" "}
                  </div>
                  <div className="col-lg-7">
                    <h5>
                      Ordered on <span className="col-6" >{today.toLocaleDateString()}</span>{" "}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
