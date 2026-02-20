import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import Header from "../components/Header";

const Cart = () => {
  const { cart, setCart, addToWishlist } = useContext(CartContext);
  const { increment, decrement } = useContext(CartContext);

  const totalPrice = cart.reduce((acc, curr) => {
    acc += curr.productPrice;
    return acc;
  }, 0);

  const totalDiscount = cart.reduce((acc, curr) => {
    acc += (curr.productDiscount * curr.productPrice) / 100;
    return acc;
  }, 0);

  const totalDeliveryCharge = cart.reduce((acc, curr) => {
    acc += curr.productDeliveryCharge;
    return acc;
  }, 0);

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    setCart((prev) => prev.filter((product) => product._id !== item._id));
  };

  return (
    <div>
      <Header />
      <div className="m-3 text-center my-5">
        {" "}
        <b>MY CART ( {cart.length} )</b>{" "}
      </div>
      <div className="row m-3">
        <div className="col-lg-6 ">
          {cart.length === 0 ? (
            <h2>Cart is empty</h2>
          ) : (
            cart?.map((item) => (
              <div className="row">
                <div className="col-lg-12 ">
                  <div className="row m-2">
                    <div className="col-lg-6 border h-100">
                      <img
                        style={{ height: "60%" }}
                        className="w-100"
                        src={item.productImage}
                        alt="productImage"
                      />
                    </div>
                    <div
                      className="col-lg-6"
                      style={{ textAlign: "left", justifyContent: "left" }}>
                      <p className="fs-4">{item.productName}</p>
                      <p className="fs-5">₹{item.productPrice}</p>
                      <p className="fs-5">{item.productDiscount}% OFF</p>
                      <p>
                        Quantity:{" "}
                        <button
                          style={{ backgroundColor: "greenyellow" }}
                          onClick={decrement}
                          className="btn btn-sm rounded-circle">
                          -
                        </button>{" "}
                        {"  "}
                        <b>{item.productQuantity || 1}</b>{" "}
                        <button
                          style={{ backgroundColor: "greenyellow" }}
                          onClick={increment}
                          className="btn btn-sm rounded-circle">
                          +
                        </button>{" "}
                      </p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="btn btn-danger btn-sm w-100 rounded-0">
                        Remove from Cart
                      </button>
                      <br />
                      <br />
                      <button
                        onClick={() => handleMoveToWishlist(item)}
                        className="btn btn-primary btn-sm w-100 rounded-0">
                        Move to wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length === 0 ? (
          ""
        ) : (
          <div className="col-lg-6">
            <p className="fs-1 text-center">Price Details</p>
            <hr />
            <p className="fs-5 d-flex justify-content-between">
              <span>Price( {cart.length} item )</span>
              <span>₹{totalPrice}</span>
            </p>
            <p className="fs-5 d-flex justify-content-between">
              <span>Discount</span>
              <span>-₹{totalDiscount}</span>
            </p>
            <p className="fs-5 d-flex justify-content-between">
              <span>Delivery Charge</span>
              <span>₹{totalDeliveryCharge}</span>{" "}
            </p>
            <hr />
            <p className="fs-5 d-flex justify-content-between">
              <span>Total Amount </span>
              <span>
                ₹{totalPrice + totalDeliveryCharge - totalDiscount}
              </span>{" "}
            </p>
            <hr />
            You will save ₹{totalDiscount} on this order.
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
