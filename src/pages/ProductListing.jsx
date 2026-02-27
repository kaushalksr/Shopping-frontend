import { useContext, useState } from "react";
import Header from "../components/Header";
import useFetch from "../useFetch";
import { CartContext } from "../context/cartContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import star from "../logo/star.jpg";

const ProductListing = () => {
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [rating, setRating] = useState(1);
  const [sortType, setSortType] = useState("");

  const { data, loading, error } = useFetch(
    `https://shopping-jet-two.vercel.app/api/products`,
  );

  const { cart, addToCart, addToWishlist } = useContext(CartContext);

  const priceRangeInput = document.getElementById("priceRange");
  const priceRangeOutput = document.getElementById("priceRange2");
  priceRangeInput?.addEventListener("input", function () {
    priceRangeOutput.textContent = this.value;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const filteredProducts = (data || [])
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
    );

  const handleReset = () => {
    setMaxPrice(5000);
    setSelectedCategory([]);
    setRating(1);
    setSortType("");
  };

  const navigate = useNavigate();

 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ocurred...</p>;

  return (
    <div>
      <Header />
      <div className="container">

        <div className="row">
          <div className="col-lg-3 p-2 border fixed-box">
            <h5 className="d-flex justify-content-between" >
              {" "}
              Filters:{" "}
              <span>
                <Link className="text-decoration-none" onClick={handleReset}>Reset</Link>
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
              <input
                type="checkbox"
                name="category"
                value="Men"
                checked={selectedCategory.includes("Men")}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />{" "}
              Men Clothing <br />
              <input
                type="checkbox"
                name="category"
                value="Women"
                checked={selectedCategory.includes("Women")}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />{" "}
              Women Clothing <br />
              <input
                type="checkbox"
                name="category"
                value="Kid"
                checked={selectedCategory.includes("Kid")}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />{" "}
              Kid Clothing <br />
            </div>

            <div className="m-2">
              <h4>Rating:</h4>
              <input
                type="radio"
                name="rating"
                id=""
                value="4"
                onClick={(e) => setRating(e.target.value)}
              />{" "}
              4 Star & above <br />
              <input
                type="radio"
                name="rating"
                id=""
                value="3"
                onClick={(e) => setRating(e.target.value)}
              />{" "}
              3 star & above <br />
              <input
                type="radio"
                name="rating"
                id=""
                value="2"
                onClick={(e) => setRating(e.target.value)}
              />{" "}
              2 star & above <br />
              <input
                type="radio"
                name="rating"
                id=""
                value="1"
                onClick={(e) => setRating(e.target.value)}
              />{" "}
              1 star & above <br />
            </div>

            <div className="m-2">
              <h4>Sort by:</h4>
              <input
                type="radio"
                name="sortBy"
                value="L2H"
                onClick={(e) => setSortType(e.target.value)}
              />{" "}
              Price - Low to high <br />
              <input
                type="radio"
                name="sortBy"
                value="H2L"
                onClick={(e) => setSortType(e.target.value)}
              />{" "}
              Price - High to low <br />
            </div>
          </div>
          <div className="col-lg-9 p-2 border">
            <div className="row">
              {filteredProducts?.map((product) => {
                const isInCart = cart.some((item)=>item._id === product._id);
               return (
                <div key={product._id} className="col-lg-4">
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
                          isInCart
                            ? navigate("/cartlist")
                            : addToCart(product)
                        }
                        style={{ borderRadius: 0 }}
                        className="w-100 text-decoration-none border-0">
                        {isInCart ? "GO TO CART" : "ADD TO CART"}
                      </button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
