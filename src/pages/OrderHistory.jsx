import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { CartContext } from "../context/cartContext";
import deleteImg from "../logo/deleteImg.png";

const OrderHistory = () => {
  const { orderData, setOrderData } = useContext(CartContext);

  const today = new Date();

  return (
    <div>
      <Header />
      <div className="container">
        <h3 className="text-center">ORDERS</h3>
        <div className="row">
          {orderData?.map((item, index) => (
            <div className="border border-2 p-2 m-1 d-flex justify-content-between col-lg-12 col-sm-12">
              ({index + 1}) {today.toLocaleDateString()}
              <p className="vr"></p>
              <p>
                Products :{"   "}
                {item.cart
                  .map(
                    (item) =>
                      item.productName + "(" + item.productQuantity + ")",
                  )
                  .join(", ")}
              </p>
              <p className="vr"></p>
              <p>Price : ₹ {item.price}</p>
              <p className="vr"></p>
              <p>Address : {item.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
