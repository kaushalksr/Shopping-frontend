import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import useFetch from "../useFetch";
import { CartContext } from "../context/cartContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../App.css";
import Footer from "../components/Footer";
import ProductCard from "./ProductCard";
import Loader from "../components/Loader";

const ProductListing = () => {
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [rating, setRating] = useState(1);
  const [sortType, setSortType] = useState("");

  const { data, loading, error } = useFetch(
    "https://shopping-backend-f0w2huqzb-kaushal-kishores-projects-52ddfca8.vercel.app/api/products",
  );

  const {
    cart,
    addToCart,
    addToWishlist,
    wishlist,
    removeFromWishlist,
    loader,
    setLoader,
  } = useContext(CartContext);

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const filteredProducts = Array.isArray(data)
    ? data
        .filter((item) => item.productPrice <= maxPrice)
        .filter((item) => item.productRating >= rating)
        .sort((a, b) => {
          if (sortType === "L2H") return a.productPrice - b.productPrice;
          if (sortType === "H2L") return b.productPrice - a.productPrice;
          return 0;
        })
        .filter((item) =>
          selectedCategory.length === 0
            ? true
            : selectedCategory.includes(item.productCategory),
        )
    : [];

  const handleReset = () => {
    setMaxPrice(5000);
    setSelectedCategory([]);
    setRating(1);
    setSortType("");
  };

  const navigate = useNavigate();

  if (loading) return <Loader />;
  if (error) return <p>Error ocurred...</p>;

  return (
    <div>
      <Header />
      <div className="container mb-5">
        <Link className="btn btn-outline-secondary py-2 mb-4 px-5 " to="/">
          <img
            height={30}
            width={30}
            src="https://www.svgrepo.com/show/18507/back-button.svg"
            alt="BACK button"
          />
        </Link>
        <div className="row">
          <div className="col-lg-3 p-2 border fixed-box">
            <h5 className="d-flex justify-content-between">
              {" "}
              Filters:{" "}
              <span>
                <Link className="text-decoration-none" onClick={handleReset}>
                  Reset
                </Link>
              </span>{" "}
            </h5>
            <div className="m-2">
              <h4>Price:</h4>
              <input
                onChange={(e) => setMaxPrice(e.target.value)}
                className="form-range"
                type="range"
                name=""
                id="priceRange"
                min="0"
                max="5000"
                step="500"
              />
              <p id="priceRange2"></p>
            </div>

            <div className="m-2">
              <h4>Category:</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    name="category"
                    value="Men"
                    id="men"
                    checked={selectedCategory.includes("Men")}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  />{" "}
                  <label
                    htmlFor="men"
                    className="form-check-label stretched-link">
                    {" "}
                    Men Clothing
                  </label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    name="category"
                    value="Women"
                    id="women"
                    checked={selectedCategory.includes("Women")}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  />
                  <label
                    htmlFor="women"
                    className="form-input-label  stretched-link">
                    Women Clothing
                  </label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    name="category"
                    value="Kid"
                    id="kid"
                    checked={selectedCategory.includes("Kid")}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  />{" "}
                  <label
                    htmlFor="kid"
                    className="form-check-label stretched-link">
                    Kid Clothing
                  </label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    name="category"
                    value="New"
                    id="newArrival"
                    checked={selectedCategory.includes("New")}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  />{" "}
                  <label
                    htmlFor="newArrival"
                    className="form-check-label stretched-link">
                    New Arrivals
                  </label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    name="category"
                    value="Trending"
                    id="trending"
                    checked={selectedCategory.includes("Trending")}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  />{" "}
                  <label
                    htmlFor="trending"
                    className="form-check-label stretched-link">
                    Trending
                  </label>
                </li>
              </ul>
            </div>

            <div className="m-2">
              <h4>Rating:</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="rating"
                    id="4starRadio"
                    value="4"
                    onClick={(e) => setRating(e.target.value)}
                  />
                  <label
                    htmlFor="4starRadio"
                    className="form-check-label stretched-link">
                    {" "}
                    4 Star & above
                  </label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="rating"
                    id="3starRadio"
                    value="3"
                    onClick={(e) => setRating(e.target.value)}
                  />
                  <label
                    className="form-check-label stretched-link"
                    htmlFor="3starRadio">
                    3 star & above
                  </label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="rating"
                    id="2starRadio"
                    value="2"
                    onClick={(e) => setRating(e.target.value)}
                  />
                  <label
                    htmlFor="2starRadio"
                    className="form-check-label stretched-link">
                    2 star & above
                  </label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="rating"
                    id="1starRadio"
                    value="1"
                    onClick={(e) => setRating(e.target.value)}
                  />
                  <label
                    className="form-check-label stretched-link"
                    htmlFor="1starRadio">
                    {" "}
                    1 star & above
                  </label>
                </li>
              </ul>
            </div>

            <div className="m-2">
              <h4>Sort by:</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="sortBy"
                    value="L2H"
                    id="l2h"
                    onClick={(e) => setSortType(e.target.value)}
                  />
                  <label
                    htmlFor="l2h"
                    className="form-check-label stretched-link">
                    Price - Low to high
                  </label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="sortBy"
                    id="h2l"
                    value="H2L"
                    onClick={(e) => setSortType(e.target.value)}
                  />
                  <label
                    htmlFor="h2l"
                    className="form-check-label  stretched-link">
                    Price - High to low{" "}
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9 p-2 border">
            <div className="row px-2">
              {filteredProducts?.map((product) => {
                return (
                  <div
                    key={product._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-4">
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListing;
