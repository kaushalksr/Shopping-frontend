import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";
import ecom from "../logo/ecom.png";
import { CartContext } from "../context/cartContext";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Footer from "../components/Footer";
import ProductCard from "./ProductCard";
import Loader from "../components/Loader";
const ProductDetail = () => {
  const { data, loading, error } = useFetch(
    "https://shopping-backend-98whru07p-kaushal-kishores-projects-52ddfca8.vercel.app/api/products",
  );
  const navigate = useNavigate();

  const { addToCart, cart, selectedSize, setSelectedSize } =
    useContext(CartContext);


  const { productId } = useParams();

  const selectedProduct = data?.find((item) => item._id === productId);
  if (!selectedProduct) return <p>Loading...</p>;

  const sameCategoryProduct = data?.filter(
    (cat) => cat.productCategory === selectedProduct?.productCategory,
  );

  const isInCart = cart.some(
    (item) => item.cartId === selectedProduct._id + "_" + selectedSize,
  );
  

  if (loading) return <Loader/>;
  if (error) return <p>Error ocurred...</p>;

  return (
    <>
      <Header />
      <div className="container">
        <Link
          className="btn btn-outline-secondary py-2 mb-4 px-5 "
          to="/api/products">
          {" "}
          <img
            height={30}
            width={30}
            src="https://www.svgrepo.com/show/18507/back-button.svg"
            alt="BACK button"
          />{" "}
        </Link>
        <div className="row mt-2 p-2">
          <div className="col-lg-3">
            <ProductCard product={selectedProduct} />
            <button
              onClick={() =>
                isInCart ? navigate("/cartlist") : addToCart(selectedProduct)
              }
              style={{ borderRadius: 50 }}
              className={` fw-semibold w-100 btn ${isInCart ? `btn-outline-warning` : `btn-outline-success`}  btn-sm text-decoration-none`}>
              {isInCart ? "GO TO CART" : "ADD TO CART"}
            </button>
          </div>

          <div className="col-lg-8">
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
            <div className="justify-content-center">
              <img style={{ width: "100%" }} src={ecom} alt="ecomImages" />
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
