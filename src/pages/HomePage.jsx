import { useContext } from "react";
import Header from "../components/Header";
import { data, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import Footer from "../components/Footer";
import ProductCard from "./ProductCard";

const HomePage = () => {
  const navigate = useNavigate();
  const { filteredProducts, searchText, cart, addToCart, addToWishlist } =
    useContext(CartContext);
  return (
    <div style={{ backgroundColor: "#FAF9F6" }}>
      <Header />
      <div className="container">
        {filteredProducts?.length > 0 ? (
          <div className="row mt-2">
            {filteredProducts?.map((product) => {
              const isInCart = cart.some((item) => item._id === product._id);
              return (
                <div key={product._id} className="col-lg-3 col-sm-12">
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        ) : filteredProducts?.length === 0 && searchText === "" ? (
          <div className="container mt-2">
            <div className="row my-3" style={{ justifyContent: "center" }}>
              <div className="col-lg-2 col-sm-2">
                <Link
                  to="/api/products"
                  className="btn p-0"
                  style={{ position: "relative", display: "inline" }}>
                  {" "}
                  <img
                    className="img-fluid"
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
              </div>
              <div className="col-lg-2 col-sm-2">
                <Link
                  to="/api/products"
                  className=" btn p-0"
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
              </div>
              <div className="col-lg-2 col-sm-2">
                <Link
                  to="/api/products"
                  className=" btn p-0"
                  style={{ position: "relative", display: "inline" }}>
                  {" "}
                  <img
                    style={{ width: "100%", height: "100%", padding: 0 }}
                    src="https://plus.unsplash.com/premium_photo-1710024587933-60607c28de10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNsb3RoaW5nJTIwa2lkfGVufDB8fDB8fHww"
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
              <div className="col-lg-2 col-sm-2">
                <Link
                  to="/api/products"
                  className="btn p-0"
                  style={{ position: "relative", display: "inline" }}>
                  {" "}
                  <img
                    style={{ width: "100%", height: "100%", padding: 0 }}
                    src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="newArrival"
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "0%",
                      backgroundColor: "yellow",
                      width: "100%",
                    }}>
                    <b>NEW</b>
                  </p>
                </Link>
              </div>
              <div className="col-lg-2 col-sm-2">
                <Link
                  to="/api/products"
                  className=" btn p-0"
                  style={{ position: "relative", display: "inline" }}>
                  {" "}
                  <img
                    style={{ width: "100%", height: "100%", padding: 0 }}
                    src="https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="trending"
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "0%",
                      backgroundColor: "yellow",
                      width: "100%",
                    }}>
                    <b>TRENDING</b>
                  </p>
                </Link>
              </div>
            </div>

            <div className="my-5 row" style={{ justifyContent: "center" }}>
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
      <Footer />
    </div>
  );
};

export default HomePage;
