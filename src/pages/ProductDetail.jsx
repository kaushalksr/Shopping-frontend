import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";
import ecom from "../logo/ecom.png";
import { CartContext } from "../context/cartContext";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
const ProductDetail = () => {
  const { data, loading, error } = useFetch(
    `https://shopping-we7n.vercel.app/api/products`,
  );

  const { addToCart, increment, decrement } = useContext(CartContext);

  const { productId } = useParams();

  const selectedProduct = data?.find((item) => item._id === productId);
  if (!selectedProduct) return <p>Loading...</p>;

  const sameCategoryProduct = data?.filter(
    (cat) => cat.productCategory === selectedProduct?.productCategory,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ocurred...</p>;

  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt-2 p-2">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card text-center">
              <div>
                <img
                  height={250}
                  src={selectedProduct?.productImage}
                  className="card-img-top m-0"
                  alt={selectedProduct?.productName}
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
                      {selectedProduct?.productRating}
                    </span>
                    <span style={{ color: "green" }}>★</span>
                  </div>
                  {/* IMAGE */}
                </span>
              </div>

              <br />
              <Link
                onClick={() => addToCart(selectedProduct)}
                className="rounded-0 text-decoration-none">
                ADD TO CART
              </Link>
            </div>
          </div>
          <div className="col-lg-8 col-md-4 col-sm-12">
            <p className="fs-5 fw-semibold m-0">
              {selectedProduct?.productCategory} {selectedProduct?.productName}
            </p>
            <p className="m-0">
              {" "}
              <b>Price:</b> ₹{selectedProduct?.productPrice}
            </p>
            <p>
              {" "}
              <b>Discount:</b> {selectedProduct?.productDiscount}%
            </p>

            <p>
              Size: <button className="btn btn-sm btn-light">S</button>{" "}
              <button className="btn btn-sm btn-light">M</button>{" "}
              <button className="btn btn-sm btn-light">L</button>{" "}
            </p>
            <hr />
            <div className="row">
              <img
                style={{ height: 60, width: "50%" }}
                src={ecom}
                alt="ecomImages"
              />
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
          <h4>More items you may like in apparel</h4>
          <div className="row">
            {sameCategoryProduct?.map((product) => (
              <div className="col-lg-3">
                <div className="card m-2 w-100">
                  <Link to={`/product/${product._id}`}>
                    <img
                      height={300}
                      src={product.productImage}
                      className="card-img-top"
                      alt={product.productName}
                    />
                  </Link>
                  <div className="card-body p-0">
                    <button
                      onClick={() => addToCart(product)}
                      style={{ borderRadius: 0 }}
                      className="btn btn-primary w-100">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
