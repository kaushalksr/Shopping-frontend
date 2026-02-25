import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart, addToWishlist } = useContext(CartContext);
  const { increment, decrement, products, totalPrice,totalDiscount,totalDeliveryCharge } =
    useContext(CartContext);




  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    setCart((prev) => prev.filter((product) => product._id !== item._id));
  };

  return (
    <div >
      <Header />
      <div className="m-1 text-center my-1">
        {" "}
        <b>MY CART ( {products.length} )</b>{" "}
      </div>
      <div className="row m-3">
        <div className="col-lg-6 ">
          {products.length === 0 ? (
            <h2>Cart is empty</h2>
          ) : (
            products?.map((item) => (
              <div className="row">
                <div className="col-lg-12 ">
                  <div className="row m-2">
                    <div key={item._id} className="col-lg-6 border h-100">
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
                      <p className="fs-5"> <b>₹{item.productPrice}</b> </p>
                      <p className="fs-5">{item.productDiscount}% OFF</p>
                      <p>
                        Quantity:{" "}
                        <button
                          style={{ backgroundColor: "greenyellow" }}
                          onClick={() => decrement(item._id)}
                          className="btn btn-sm rounded-circle">
                          -
                        </button>{" "}
                        {"  "}
                        <b>{item.productQuantity || 1}</b>{" "}
                        <button
                          style={{ backgroundColor: "greenyellow" }}
                          onClick={() => increment(item._id)}
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
        {products.length === 0 ? (
          ""
        ) : (
          <div className="col-lg-6">
            <p className="fs-1 text-center"> <b>Price Details</b> </p>
            <hr />
            <p className="fs-5 d-flex justify-content-between">
              <span>Price( {products.length} item )</span>
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
              <span> <b>Total Amount</b>  </span>
              <span>
              <b> ₹ {totalPrice + totalDeliveryCharge - totalDiscount}</b> 
              </span>{" "}
            </p>
            <hr />
            <p> You will save ₹{totalDiscount} on this order.</p>
            <Link to="/checkoutpage" className="btn btn-success btn-sm">
              Place order
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
