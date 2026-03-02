import { Link } from "react-router-dom";
import cartImage from "../logo/cartImage.png";
import heartImage from "../logo/heartImage.png";
import { CartContext } from "../context/cartContext";
import { useContext, useEffect, useState } from "react";
import useFetch from "../useFetch";

const Header = () => {
  const {
    cart,
    products,
    searchText,
    setSearchText,
    wishlist,
    setFilteredProducts,
    filteredProducts,
    alert,
    showAlert,
  } = useContext(CartContext);

  const { data, loading, error } = useFetch(
    "https://shopping-xngt.vercel.app/api/products",
  );

  useEffect(() => {
    if (!searchText) {
      setFilteredProducts([]);
      return;
    }

    const searchValue = searchText.toLowerCase();

    const filtered = data?.filter(
      (item) =>
        item.productName.toLowerCase().includes(searchValue) ||
        item.productCategory.toLowerCase().includes(searchValue),
    );

    setFilteredProducts(filtered);
  }, [searchText]);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ocurred!!</p>;

  return (
    <div
      className="sticky-top px-2"
      style={{ backgroundColor: "#2874f0", color: "#f0f0f0" }}>
      <nav className="navbar text-dark">
        <div className="container-fluid">
          <Link
            onClick={() => setSearchText("")}
            className="navbar-brand"
            to="/">
            <i className="fs-2 fw-bold" style={{ color: "#f0f0f0" }}>
              MyShopping Site
            </i>
          </Link>
          <form className="d-flex" role="search">
            <input
              style={{ borderColor: "blue" }}
              onChange={(e) => setSearchText(e.target.value)}
              className="form-control me-2"
              type="search"
              placeholder="Search products"
              aria-label="Search"
            />
          </form>
          <div className="d-flex align-items-center gap-0 my-3">
            <Link to="/userProfile">
              <img
                style={{ height: 30, width: 30, borderRadius: 50 }}
                src="https://1.bp.blogspot.com/-2x5_PZ-J6WI/Wv5jfleTBcI/AAAAAAAAABk/X6_LmKkxxk0sy7qJezEwUDtd0bldhizKACLcBGAs/s640/36738d1c8cabd2f7f172e1eeaceba3e1.jpg"
                alt=""
              />
            </Link>
            <div
              className="mx-5"
              style={{ position: "relative", display: "inline-block" }}>
              <Link className="btn m-0" to="/cartlist">
                {" "}
                <img
                  style={{ width: 30, height: 30 }}
                  className="my-0 img-fluid"
                  src={cartImage}
                  alt="Cart"
                />
              </Link>
              {products.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {products.length}
                </span>
              )}
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <Link className="btn m-0" to="/wishlist">
                <img
                  style={{ width: 30, height: 30 }}
                  className="my-0"
                  src={heartImage}
                  alt="Wishlist"
                />
              </Link>
              {wishlist.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlist.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
      {alert.show && (
        <div
          className={`alert alert-${alert.type} position-fixed top-50 rounded-0 start-50 translate-middle-x mt-3`}
          style={{ zIndex: 9999, minWidth: "300px" }}>
          {alert.message}
        </div>
      )}
    </div>
  );
};

export default Header;
