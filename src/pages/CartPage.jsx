import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart,showAlert, addToWishlist } = useContext(CartContext);
  const {
    increment,
    decrement,
    products,
    totalPrice,
    totalDiscount,
    totalDeliveryCharge,
  } = useContext(CartContext);

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
    showAlert("Item Removed","danger")
  };

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    setCart((prev) => prev.filter((product) => product._id !== item._id));
    showAlert("Item Moved to wishlist","success")
  };

  return (
    <div>
      <Header />
      <div className="m-1 text-center my-1">
        {" "}
        <h2
          style={{
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "700",
          }}>
          MY CART ( {products.length} )
        </h2>{" "}
      </div>
      <div className="row m-3">
        <div className={products.length === 0 ? "col-lg-12" : "col-lg-8"}>
          {products.length === 0 ? (
            <div className="justify-content-center text-center align-items-center">
              <h2>Your cart is empty</h2>
              <img
                src="https://cdn-icons-png.flaticon.com/256/11329/11329060.png"
                alt="cartEmpty"
              />
            </div>
          ) : (
            products?.map((item) => (
              <div className="row">
                <div className="col-lg-12 ">
                  <div className="row m-2">
                    <div key={item._id} className="col-lg-3 ">
                      <img
                        style={{ height: 116 }}
                        className="w-100 img-fluid"
                        src={item.productImage}
                        alt="productImage"
                      />

                      <p className="d-flex my-2">
                        <button
                          onClick={() => decrement(item._id)}
                          className="p-0 mx-1 btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: 25, height: 25 }}>
                          -
                        </button>{" "}
                        {"  "}
                        <b className="px-4 border">
                          {item.productQuantity}
                        </b>{" "}
                        <button
                          onClick={() => increment(item._id)}
                          className="p-0 mx-1 btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: 25, height: 25 }}>
                          +
                        </button>{" "}
                      </p>

                      {/* //------------- */}
                    </div>
                    <div
                      className="col-lg-6"
                      style={{ textAlign: "left", justifyContent: "left" }}>
                      <p className="fs-5">
                        {item.productCategory} {item.productName}
                      </p>
                      <p className="fs-5">
                        {" "}
                        <b>₹{item.productPrice}</b>{" "}
                      </p>
                      <p style={{ color: "grey" }}>
                        {item.productDiscount}% OFF
                      </p>

                      <div className="d-flex justify-content-between">
                        <Link
                          onClick={() => removeFromCart(item._id)}
                          style={{ color: "red" }}
                          className="w-100 rounded-0 text-decoration-none">
                          REMOVE
                        </Link>
                        <Link
                          onClick={() => handleMoveToWishlist(item)}
                          className="w-100 rounded-0 text-decoration-none">
                          MOVE TO WISHLIST
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {products.length === 0 ? (
          ""
        ) : (
          <div className="col-lg-4">
            <p className=" text-center p-0 m-0">
              {" "}
              <b style={{ color: "grey" }}>PRICE DETAILS</b>{" "}
            </p>
            <hr className="m-0" />
            <p className="fs-5 d-flex justify-content-between m-0">
              <span>Price( {products.length} item )</span>
              <span>₹{totalPrice}</span>
            </p>
            <p className="fs-5 d-flex justify-content-between m-0">
              <span>Discount</span>
              <span>-₹{totalDiscount}</span>
            </p>
            <p className="fs-5 d-flex justify-content-between m-0">
              <span>Delivery Charge</span>
              <span>₹{totalDeliveryCharge}</span>{" "}
            </p>
            <hr className="p-0 m-0" />
            <p className="fs-5 d-flex justify-content-between m-0 p-0">
              <span>
                {" "}
                <b>Total Amount</b>{" "}
              </span>
              <span>
                <b> ₹ {totalPrice + totalDeliveryCharge - totalDiscount}</b>
              </span>{" "}
            </p>
            <hr className="w-100 p-0 m-0" />
            <p>
              {" "}
              <i style={{ color: "green" }}>
                {" "}
                You will save ₹{totalDiscount} on this order.
              </i>
            </p>
            <Link
              style={{
                backgroundColor: "#fb641b",
                border: "none",
                color: "#fff",
              }}
              to="/checkoutpage"
              className="btn btn-success btn-sm rounded-0 py-2 px-4 fw-semibold">
              PLACE ORDER
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
