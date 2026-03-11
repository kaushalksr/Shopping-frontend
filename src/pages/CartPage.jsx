import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
const Cart = () => {
  const { cart, setCart, showAlert, addToWishlist } = useContext(CartContext);
  const {
    increment,
    decrement,
    products,
    totalPrice,
    totalDiscount,
    totalDeliveryCharge,
    selectedSize
  } = useContext(CartContext);

  const removeFromCart = (id) => {
    const product = cart.find((item) => item.cartId === id);
    setCart((prev) => prev.filter((item) => item.cartId !== id));
    showAlert(
      `${product.productName} (${product.size}) removed from cart!`,
      "danger",
    );
  };
 

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    setCart((prev) => prev.filter((product) => product.cartId !== item.cartId));
    showAlert(`${item.productName} moved to wishlist`, "warning");
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
              <p className="fs-5">
                Your cart is empty!{" "}
                <span>
                  {" "}
                  <Link to="/api/products" style={{ color: "blue" }}>
                    shop now
                  </Link>
                </span>
              </p>
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
                    <div key={item._id} className="col-lg-3">
                      <img
                        style={{height:100 }}
                        className="img-fluid m-1"
                        src={item.productImage}
                        alt="productImage"
                      />

                      <p className="d-flex">
                        <button
                          onClick={() => decrement(item.cartId)}
                          className={` ${item.quantity === 1 ? "disabled" : "active"} p-0 btn btn-primary rounded-circle d-flex align-items-center justify-content-center`}
                          style={{ width: 25, height: 25 }}>
                          -
                        </button>{" "}
                        {"  "}
                        <b className="px-2 border">{item.quantity}</b>{" "}
                        <button
                          onClick={() => increment(item.cartId)}
                          className="p-0 btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: 25, height: 25 }}>
                          +
                        </button>{" "}
                      </p>

                      {/* //------------- */}
                    </div>
                    <div
                      className="col-lg-6"
                      style={{ textAlign: "left", justifyContent: "left" }}>
                      <p className="fs-5 m-0 p-0">
                        {item.productCategory} {item.productName} ({item.size})
                      </p>

                      <p className="fs-5 m-0 p-0">
                        {" "}
                        <b>₹{item.productPrice}</b>{" "}
                      </p>
                      <i style={{ color: "green", fontWeight: "bolder" }}>
                        {item.productDiscount}% OFF
                      </i>

                      <div className="d-flex gap-3 my-2">
                        <Link
                          onClick={() => removeFromCart(item.cartId)}
                          className="rounded-0 text-decoration-none btn btn-outline-danger rounded-5 border-5">
                          <b> REMOVE</b>
                        </Link>
                        <Link
                          onClick={() => handleMoveToWishlist(item)}
                          className="rounded-0 text-decoration-none btn btn-outline-secondary rounded-5 border-5">
                          <b>MOVE TO WISHLIST</b>
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
      <Footer />
    </div>
  );
};

export default Cart;
