import { Link } from "react-router-dom";
import cartLogo from "../logo/cartLogo.png";
import heartLogo from "../logo/heartLogo.png";
import { CartContext } from "../context/cartContext";
import { useContext } from "react";

const Header = () => {
  const { cart, products, wishlist } = useContext(CartContext);

  const handleSearchFilter = (value) => {
    const filteredProducts = products.filter((item) => item.productName.includes(value) )
    console.log(filteredProducts)
  }


  return (
    <div className="sticky-top">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MyShopping Site
          </Link>
          <form className="d-flex" role="search">
            <input
            onChange={(e)=>handleSearchFilter(e.target.value)}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <div className="d-flex align-items-center gap-0">
            <Link to="/userProfile">
              <img
              style={{height:30,width:30,borderRadius:50}}
                src="https://1.bp.blogspot.com/-2x5_PZ-J6WI/Wv5jfleTBcI/AAAAAAAAABk/X6_LmKkxxk0sy7qJezEwUDtd0bldhizKACLcBGAs/s640/36738d1c8cabd2f7f172e1eeaceba3e1.jpg"
                alt=""
              />
            </Link>

            <Link className="btn m-0" to="/cartlist">
              {" "}
              <img
                style={{ width: 30, height: 30 }}
                className="my-0"
                src={cartLogo}
                alt="Cart"
              />
            </Link>
            <span className="m-0">({products.length})</span>

            <Link className="btn m-0" to="/wishlist">
              <img
                style={{ width: 30, height: 30 }}
                className="my-0"
                src={heartLogo}
                alt="Wishlist"
              />
            </Link>
            <p className="m-0">({wishlist.length})</p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
