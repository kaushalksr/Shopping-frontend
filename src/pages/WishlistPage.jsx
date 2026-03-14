import { useContext, useState } from "react";
import Header from "../components/Header";
import { CartContext } from "../context/cartContext";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const WishlistPage = () => {
  const { wishlist, addToCart, setWishlist, showAlert, cart, setCart } =
    useContext(CartContext);

  const [movingId, setMovingId] = useState(null);
  const [removeId, setRemoveId] = useState(null);

  const handleMoveTocart = (item) => {
    setMovingId(item.wishListId);

    if (
      cart.some(
        (product) =>
          product.productName.includes(item.productName) &&
          product.size.includes(item.size),
      )
    ) {
      showAlert("Item already present in cart", "warning");
      setWishlist((prev) =>
        prev.filter((prod) => prod.wishListId !== item.wishListId),
      );
      return;
    }

    const cartItem = {
      ...item,
      size: item.size || "M",
      quantity: item.productQuantity,
      cartId: item._id + "_" + item.size,
    };

    setTimeout(() => {
      setMovingId(false);
      setCart((prevValue) => [...prevValue, cartItem]);

      setWishlist((prev) =>
        prev.filter((prod) => prod.wishListId !== item.wishListId),
      );

      showAlert("Item Moved to cart", "success");
    }, 2000);
  };

  const deleteFromWishList = (wId) => {
    setRemoveId(wId);
    setTimeout(() => {
      setWishlist((prevValue) =>
        prevValue.filter((item) => item.wishListId !== wId),
      );
      showAlert("Item Removed from Wishlist", "danger");
      setRemoveId(false);
    }, 2000);
  };

  return (
    <div>
      <Header />
      <div className="container p-4">
        <p className="text-center">
          {" "}
          <h2
            style={{
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "700",
            }}>
            MY WISHLIST ({wishlist.length})
          </h2>{" "}
        </p>
        <div>
          {wishlist.length === 0 ? (
            <div className="text-center justify-content-center align-items-center">
              <p>
                <Link to="/api/products">shop now</Link>{" "}
              </p>{" "}
              <br />
              <p>
                {" "}
                <img
                  style={{ height: "90%", width: "60%" }}
                  src="https://behalacollege.in/display_board/assets/images/empty-wishlist.png"
                  alt="emptyWishlist"
                />{" "}
              </p>
            </div>
          ) : (
            wishlist?.map((item) => (
              <div className="row border p-2 my-2">
                <div className="col-lg-3">
                  <img
                    style={{ height: 150, width: 150 }}
                    src={item.productImage}
                    alt={item.productName}
                  />
                </div>
                <div className="col-lg-9">
                  <p className="fs-5 fw-semibold m-0 p-0">
                    {item.productCategory} {item.productName} 
                  </p>
                  <p className="fs-5 m-0 p-0">Size: {item.size}</p>
                  <p className="fs-5 fw-semibold">₹{item.productPrice}</p>

                  <button disabled={movingId === item.wishListId}
                    onClick={() => handleMoveTocart(item)}
                    className="btn btn-outline-secondary btn-sm m-1 rounded-5 border-5">
                    <b>
                      {" "}
                      {movingId === item.wishListId ? (
                        <>
                          Moving...{" "}
                          <span className="spinner-border spinner-border-sm me-2"></span>
                        </>
                      ) : (
                        "MOVE TO CART"
                      )}
                    </b>
                  </button>

                  <button disabled={removeId === item.wishListId}
                    className="btn btn-outline-danger btn-sm m-1 rounded-5 border-5"
                    onClick={() => deleteFromWishList(item.wishListId)}>
                    <b>
                      {removeId === item.wishListId ? (
                        <>
                          Removing...{" "}
                          <span className="spinner-border spinner-border-sm me-2"></span>{" "}
                        </>
                      ) : (
                        "Remove"
                      )}
                    </b>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;
