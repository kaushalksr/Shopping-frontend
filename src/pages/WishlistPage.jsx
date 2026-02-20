import { useContext } from "react";
import Header from "../components/Header";
import { CartContext } from "../context/cartContext";
import useFetch from "../useFetch";

const WishlistPage = () => {
  const { data, loading, error } = useFetch(
    "https://shopping-jet-two.vercel.app/api/products",
  );
  const { wishlist, addToCart, setWishlist } = useContext(CartContext);
  const handleMoveTocart = (item) => {
    addToCart(item);
    setWishlist((prev) => prev.filter((prod) => prod._id !== item._id));
  };
  return (
    <div>
      <Header />
      <div className="container p-4">
        <p className="text-center">
          {" "}
          <b>MY WISHLIST</b>{" "}
        </p>
        <div className="row">
          {wishlist.length === 0 ? (
            <h2>Wishlist is empty</h2>
          ) : (
            wishlist?.map((item) => (
              <div className="col-lg-3 m-1 ">
                <div class="card w-100">
                  <img
                    style={{ height: 250 }}
                    src={item.productImage}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body p-0">
                    <h5 className="card-title text-center">
                      {"  "}
                      {item.productName}
                    </h5>

                    <p className="card-text text-center">
                      {"  "}₹{item.productPrice}
                    </p>
                    <button
                      onClick={() => handleMoveTocart(item)}
                      style={{ borderRadius: 0 }}
                      className="btn btn-secondary w-100">
                      Move to Cart
                    </button>
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
