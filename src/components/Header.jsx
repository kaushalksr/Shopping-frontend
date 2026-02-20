import { Link } from "react-router-dom";
import cartLogo from "../logo/cartLogo.png";
import heartLogo from "../logo/heartLogo.png";
import { CartContext } from "../context/cartContext";
import { useContext } from "react";

const Header = () => {
  const { cart ,wishlist} = useContext(CartContext);
  return (
    <div className="sticky-top" >
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MyShopping Site
          </Link>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <div className="d-flex align-items-center gap-4">
            <button className="btn btn-success btn-sm my-0">Login</button>
            <Link className="btn m-0" to="/cartlist">
              {" "}
              <img
                style={{ width: 30, height: 30 }}
                className="my-0"
                src={cartLogo}
                alt="Cart"
              />
            </Link>
            <p className="m-0" >({cart.length})</p> 
            <Link className="btn m-0" to="/wishlist">
              <img
                style={{ width: 30, height: 30 }}
                className="my-0"
                src={heartLogo}
                alt="Wishlist"
              />
            </Link>
            <p className="m-0" >({wishlist.length})</p> 
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
