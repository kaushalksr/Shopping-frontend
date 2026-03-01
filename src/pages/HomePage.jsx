import { useContext } from "react";
import Header from "../components/Header";
import { data, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { filteredProducts, searchText, cart, addToCart, addToWishlist } =
    useContext(CartContext);
  return (
    <div style={{ backgroundColor: "#d7e3ef" }}>
      <Header />
      {filteredProducts?.length > 0 ? (
        <div className="row mt-2">
          {filteredProducts?.map((product) => {
            const isInCart = cart.some((item) => item._id === product._id);
            return (
              <div key={product._id} className="col-lg-2">
                <div className="card m-2 w-100 text-center">
                  <Link to={`/product/${product._id}`}>
                    <img
                      style={{ position: "relative" }}
                      height={200}
                      src={product.productImage}
                      className="card-img-top"
                      alt={product.productName}
                    />
                    <span
                      className="btn btn-sm rounded-0 p-1 rounded-1"
                      style={{
                        position: "absolute",
                        top: 5,
                        left: 7,
                      }}>
                      <div className="d-inline-flex align-items-center bg-light px-2 py-1 rounded">
                        <span className="fw-bold me-1">
                          {product.productRating}
                        </span>
                        <span style={{ color: "green" }}>★</span>
                      </div>
                      {/* IMAGE */}
                    </span>
                  </Link>
                  <div className="card-body p-0">
                    <div
                      className="p-2"
                      style={{
                        justifyContent: "center",
                        textAlign: "center",
                      }}>
                      <p className="card-title">
                        {"  "}
                        {product.productCategory} {product.productName}
                      </p>
                      <p className="card-text">
                        {" "}
                        <b>₹{product.productPrice}</b>{" "}
                      </p>
                    </div>
                    <Link
                      onClick={() => addToWishlist(product)}
                      style={{ borderRadius: 0, color: "green" }}
                      className="w-100 text-decoration-none">
                      ADD TO WISHLIST
                    </Link>{" "}
                    <br />
                    <button
                      onClick={() =>
                        isInCart ? navigate("/cartlist") : addToCart(product)
                      }
                      style={{ borderRadius: 0 }}
                      className="w-100 text-decoration-none border-0">
                      {isInCart ? "GO TO CART" : "ADD TO CART"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : filteredProducts?.length === 0 && searchText === "" ? (
        <div className="container mt-2">
          <div className="row my-3" style={{ justifyContent: "center" }}>
            <Link
              to="/api/products"
              className="col-lg-3 btn p-0"
              style={{ position: "relative", display: "inline" }}>
              {" "}
              <img
                style={{ width: "100%", height: "100%", padding: 0 }}
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwbW9kZWx8ZW58MHx8MHx8fDA%3D"
                alt="men"
              />
              <p
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0%",
                  backgroundColor: "yellow",
                  width: "100%",
                }}>
                <b>MEN</b>
              </p>
            </Link>
            <Link
              to="/api/products"
              className="col-lg-3 btn p-0"
              style={{ position: "relative", display: "inline" }}>
              {" "}
              <img
                style={{ width: "100%", height: "100%", padding: 0 }}
                src="https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D"
                alt="women"
              />
              <p
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0%",
                  backgroundColor: "yellow",
                  width: "100%",
                }}>
                <b>WOMEN</b>
              </p>
            </Link>

            <Link
              to="/api/products"
              className="col-lg-3 btn p-0"
              style={{ position: "relative", display: "inline" }}>
              {" "}
              <img
                style={{ width: "100%", height: "100%", padding: 0 }}
                src="https://plus.unsplash.com/premium_photo-1687473582281-e7f2cc0aef83?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="kid"
              />
              <p
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0%",
                  backgroundColor: "yellow",
                  width: "100%",
                }}>
                <b>KIDS</b>
              </p>
            </Link>
          </div>

          <div className="my-3 row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 col-sm-12">
              <img
                style={{ width: "100%" }}
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>

          
        </div>
      ) : (
        <div className="text-center">
          {" "}
          <h1>"NO MATCH FOUND"</h1>{" "}
        </div>
      )}
    </div>
  );
};

export default HomePage;
