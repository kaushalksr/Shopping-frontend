import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
const Cart = () => {
  const [loadingId, setLoadingId] = useState(null);
  const [moveToWishListId, setMoveToWishListId] = useState(null);
  const { cart, setCart, showAlert, addToWishlist } = useContext(CartContext);
  const {
    increment,
    decrement,
    products,
    totalPrice,
    totalDiscount,
    totalDeliveryCharge,
    wishlist,
    selectedSize,
    dataLoading,
    setDataLoading,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const removeFromCart = (id) => {
    setLoadingId(id);
    const product = cart.find((item) => item.cartId === id);

    setTimeout(() => {
      setCart((prev) => prev.filter((item) => item.cartId !== id));
      showAlert(
        `${product.productName} (${product.size}) removed from cart!`,
        "danger",
      );
      setLoadingId(null);
    }, 2000);
  };

  const handleMoveToWishlist = (item) => {
    setMoveToWishListId(item.cartId);
    if (
      wishlist.some(
        (product) =>
          product.productName === item.productName &&
          product.size === item.size,
      )
    ) {
      showAlert(`${item.productName} already present in wishlist`, "warning");
      setCart((prev) =>
        prev.filter((product) => product.cartId !== item.cartId),
      );
      return;
    }

    setTimeout(() => {
      addToWishlist(item);
      setCart((prev) =>
        prev.filter((product) => product.cartId !== item.cartId),
      );
      showAlert(`${item.productName} moved to wishlist`, "warning");
      setMoveToWishListId(null);
    }, 2000);
  };

  const checkOut = () => {
    setDataLoading(true);
    setTimeout(() => {
      setDataLoading(false);
      navigate("/checkoutpage");
    }, 2000);
  };

  return (
    <div>
      <Header />
      <div className="text-center">
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
      <div className="row m-3 mb-5">
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
                  <div className="row m-2 p-1 border text-center">
                    <div key={item._id} className="col-lg-3">
                      <img
                        style={{ height: 200, width: 150 }}
                        className="img-fluid m-1"
                        src={item.productImage}
                        alt="productImage"
                      />

                      <div className="d-flex justify-content-center align-items-center mt-2 px-5">
                        <button
                          onClick={() => decrement(item.cartId)}
                          className={` ${item.quantity === 1 ? "disabled" : "active"} me-1 btn btn-primary rounded-circle d-flex align-items-center justify-content-center`}
                          style={{ width: 25, height: 25 }}>
                          -
                        </button>{" "}
                        {"  "}
                        <b className="border w-50">{item.quantity}</b>{" "}
                        <button
                          onClick={() => increment(item.cartId)}
                          className=" ms-1 btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: 25, height: 25 }}>
                          +
                        </button>{" "}
                      </div>

                      {/* //------------- */}
                    </div>
                    <div
                      className="col-lg-6"
                      style={{ textAlign: "left", justifyContent: "left" }}>
                      <p className="fs-5 m-0 p-0">
                        {item.productCategory} {item.productName}
                      </p>
                      <p className="fs-5">
                        {" "}
                        <b>Selected Size: </b> {item.size}
                      </p>

                      <p className="fs-5 m-0 p-0">
                        {" "}
                        <b>₹{item.productPrice}</b>{" "}
                      </p>
                      <i style={{ color: "green", fontWeight: "bolder" }}>
                        {item.productDiscount}% OFF
                      </i>

                      <div className="my-2">
                        <button
                          disabled={loadingId === item.cartId}
                          onClick={() => removeFromCart(item.cartId)}
                          className="mb-3 text-decoration-none btn btn-sm btn-outline-danger rounded-5 border-5">
                          <b>
                            {loadingId === item.cartId ? (
                              <>
                                Removing...{" "}
                                <span className="spinner-border spinner-border-sm me-2"></span>
                              </>
                            ) : (
                              "REMOVE"
                            )}
                          </b>
                        </button>
                        <br />
                        <button
                          disabled={moveToWishListId === item.cartId}
                          onClick={() => handleMoveToWishlist(item)}
                          className=" btn-sm btn btn-outline-secondary rounded-5 border-5">
                          <b>
                            {moveToWishListId === item.cartId ? (
                              <>
                                Moving...
                                <span className="spinner-border spinner-border-sm me-2"></span>
                              </>
                            ) : (
                              "MOVE TO WISHLIST"
                            )}
                          </b>
                        </button>
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
            <button disabled={dataLoading}
              style={{
                backgroundColor: "#fb641b",
                border: "none",
                color: "#fff",
              }}
              onClick={checkOut}
              className="btn btn-success btn-sm rounded-0 py-2 px-4 fw-semibold">
              {dataLoading ? (
                <>
                  Redirecting...
                  <span className="spinner-border spinner-border-sm me-2"></span>
                </>
              ) : (
                "PLACE ORDER"
              )}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
