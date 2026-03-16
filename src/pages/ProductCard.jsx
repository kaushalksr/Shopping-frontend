import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { removeFromWishlist, cart, wishlist, addToWishlist, addToCart } =
    useContext(CartContext);

  const isWishListed = wishlist.some((item) => item._id === product._id);

  return (
    <div
      className=" p-0 mx-5 text-center"
      style={{ position: "relative", borderRadius: 0 }}>
      <Link to={`/product/${product._id}`}>
        <img
          style={{ position: "relative", borderRadius: 0 }}
          src={product.productImage}
          height={250}
          width="100%"
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
            <span className="fw-bold me-1">{product.productRating}</span>
            <span style={{ color: "green" }}>★</span>
          </div>
        </span>
      </Link>
      <div className="card-body p-0 m-0">
        <div
          className="p-2"
          style={{
            justifyContent: "center",
            textAlign: "center",
          }}>
          <p className="card-title p-0 m-0">
            {"  "}
            {product.productCategory} {product.productName}{" "}
            {product.productSize}
          </p>
          <p className="card-text p-0 m-0">
            {" "}
            <p className="fs-5">
              <p className="fw-bold m-0 p-0"> ₹{product.productPrice}</p>{" "}
              <span className="p-0 m-0" style={{ color: "green" }}>
                <b>
                  <i> {product.productDiscount}% off </i>
                </b>
              </span>{" "}
            </p>{" "}
          </p>
        </div>
        <label
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            isWishListed ? removeFromWishlist(product) : addToWishlist(product);
          }}
          className="heart-container"
          style={{
            position: "absolute",
            top: 20,
            right: 20,
          }}>
          <input type="checkbox" checked={isWishListed} readOnly />
          <span className="heart"></span>
        </label>
      </div>
    </div>
  );
};

export default ProductCard;
