import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";
import exchange from "../logo/exchange.png";
import replace from "../logo/replace.png";
import refund from "../logo/refund.png";
import { CartContext } from "../context/cartContext";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Footer from "../components/Footer";
import ProductCard from "./ProductCard";
import Loader from "../components/Loader";
const ProductDetail = () => {
  // BACKEND API = "https://shopping-backend-khaki.vercel.app/api/products"
  // localhost api = "http://localhost:3000/api/products"
  const { data, loading, error } = useFetch(
    "https://shopping-backend-khaki.vercel.app/api/products",
  );
  const navigate = useNavigate();

  const { addToCart, cart, selectedSize, setSelectedSize, dataLoading } =
    useContext(CartContext);

  const { productId } = useParams();

  const selectedProduct = data?.find((item) => item._id === productId);
  if (!selectedProduct) return <Loader />;

  const sameCategoryProduct = data?.filter(
    (cat) => cat.productCategory === selectedProduct?.productCategory,
  );

  const isInCart = cart.some(
    (item) => item.cartId === selectedProduct._id + "_" + selectedSize,
  );

  if (loading) return <Loader />;
  if (error) return <p className="text-center">Error ocurred...</p>;

  return (
    <>
      <Header />
      <div className="container mb-5">
        <Link
          className="btn btn-outline-secondary btn-sm mb-2"
          to="/api/products">
          {" "}
        Go back
        </Link>
        <div className="row mt-2 p-2">
          <div className="col-lg-3">
            <ProductCard product={selectedProduct} />
            <button
              disabled={dataLoading}
              onClick={() =>
                isInCart ? navigate("/cartlist") : addToCart(selectedProduct)
              }
              style={{ borderRadius: 50 }}
              className={`fw-semibold w-100 btn ${isInCart && !dataLoading ? `btn-outline-warning` : `btn-outline-success`}  btn-sm text-decoration-none`}>
              {isInCart && !dataLoading ? "GO TO CART" : "ADD TO CART"}{" "}
              {dataLoading && (
                <span className="spinner-border spinner-border-sm me-2"></span>
              )}
            </button>
          </div>

          <div className="col-lg-8 mt-1">
            <p className="fs-5 fw-semibold m-0">
              {selectedProduct?.productCategory} {selectedProduct?.productName}
            </p>
            <p className="m-0 fs-5">
              {" "}
              <b>Price:</b> ₹{selectedProduct?.productPrice}
            </p>
            <p className="fs-5">
              {" "}
              <b>Discount:</b> {selectedProduct?.productDiscount}%
            </p>

            <p className="fs-5">
              Size:{" "}
              {["S", "M", "L", "XL"].map((value) => (
                <button
                  key={value}
                  className={`mx-2 fs-5 btn btn-sm btn-${selectedSize === value ? "dark" : "light"}`}
                  onClick={() => setSelectedSize(value)}>
                  {value}
                </button>
              ))}
            </p>
            <hr />
            <div className="d-flex justify-content-left gap-5">
              <div>
                <img src={replace} height={60} width={60} alt="replace" />
                <p>Replacement</p>
              </div>
              <div>
                <img src={refund} height={60} width={60} alt="refund" />
                <p>Refund</p>
              </div>
              <div>
                <img src={exchange} height={60} width={60} alt="exchange" />
                <p>Exchange</p>
              </div>
            </div>
            <hr />
            <div>
              <p className="fs-5 fw-semibold p-0 m-0">Description:</p>
              <p className=" m-0 p-0">{selectedProduct?.productDescription}</p>
            </div>
          </div>
        </div>
        <div>
          <hr />
          <p className="fs-4 my-5 fw-semibold">
            More items you may like in apparel
          </p>
          <div className="row">
            {sameCategoryProduct?.map((product) => (
              <div className="col-lg-3 col-sm-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
