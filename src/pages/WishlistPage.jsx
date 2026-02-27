import { useContext } from "react";
import Header from "../components/Header";
import { CartContext } from "../context/cartContext";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
const WishlistPage = () => {
  const { wishlist, addToCart, setWishlist,showAlert } = useContext(CartContext);
  const handleMoveTocart = (item) => {
    addToCart(item);
    setWishlist((prev) => prev.filter((prod) => prod._id !== item._id));
    showAlert("Item Moved to cart","success")
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
            MY WISHLIST
          </h2>{" "}
        </p>
        <div className="row">
          {wishlist.length === 0 ? (
            <div className="text-center d-flex justify-content-center">
              <img
                style={{ height: "90%", width: "60%" }}
                src="https://behalacollege.in/display_board/assets/images/empty-wishlist.png"
                alt="emptyWishlist"
              />
            </div>
          ) : (
            wishlist?.map((item) => (
              <div className="col-lg-2 m-1 ">
                <div class="card w-100">
                  <img
                    style={{ height: 200 }}
                    src={item.productImage}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body p-0 text-center">
                    <h5 className="card-title text-center">
                      {"  "}
                      {item.productName}
                    </h5>

                    <p className="card-text text-center">
                      {"  "}₹{item.productPrice}
                    </p>
                    <Link
                      onClick={() => handleMoveTocart(item)}
                      style={{ border: "none", textDecoration: "none" }}
                      className="w-100 ">
                      <b> MOVE TO CART</b>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
