import { useContext, useState } from "react";
import Header from "../components/Header";
import useFetch from "../useFetch";
import { CartContext } from "../context/cartContext";

const ProductListing = () => {
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [rating, setRating] = useState(1);
  const [sortType, setSortType] = useState("");

  const { data, loading, error } = useFetch(
    `https://shopping-jet-two.vercel.app/api/products`,
  );

  const { addToCart } = useContext(CartContext);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ocurred...</p>;

  return (
    <div>
      <Header />
      <div className="container">
        <p className="fs-1">Product Listing </p>

        <div className="row">
          <div className="col-lg-3 p-2 border fixed-box">
            <h5>
              {" "}
              Filters:{" "}
              <span>
                <button onClick={handleReset}>Reset</button>
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
              {filteredProducts?.map((product) => (
                <div key={product._id} className="col-lg-4">
                  <div className="card m-2 w-100">
                    <img
                      height={300}
                      src={product.productImage}
                      className="card-img-top"
                      alt={product.productName}
                    />
                    <div className="card-body p-0">
                      <div
                        className="p-2"
                        style={{
                          justifyContent: "center",
                          textAlign: "center",
                        }}>
                        <p className="card-title">
                          {"  "}
                          {product.productName}
                        </p>
                        <p className="card-text">
                          {" "}
                          <b>₹{product.productPrice}</b>{" "}
                        </p>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        style={{ borderRadius: 0 }}
                        className="btn btn-primary w-100">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
