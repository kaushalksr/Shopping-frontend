import { useContext } from "react";
import Header from "../components/Header";
import { CartContext } from "../context/cartContext";
import Footer from "../components/Footer";

const UserProfile = () => {
  const { address, orderData } = useContext(CartContext);

  const today = new Date();

  return (
    <div>
      <Header />
      <div className="container mb-5">
        <p className="fs-1 my-2 text-center">User Profile</p>
        <hr />
        <div className="row">
          <div className="col-lg-4">
            <img
              style={{ height: 200, width: 200 }}
              src="https://1.bp.blogspot.com/-2x5_PZ-J6WI/Wv5jfleTBcI/AAAAAAAAABk/X6_LmKkxxk0sy7qJezEwUDtd0bldhizKACLcBGAs/s640/36738d1c8cabd2f7f172e1eeaceba3e1.jpg"
              alt="userImage"
            />
          </div>
          <div className="col-lg-4 ">
            <p className="justify-content-between d-flex">
              <b>Name : </b> <i>Elina</i>{" "}
            </p>
            <p className="justify-content-between d-flex">
              <b>Number : </b> <i>+1123972213</i>{" "}
            </p>
            <p className="justify-content-between d-flex">
              <b>Address : </b>{" "}
              <ol>
                {address.map((add) => (
                  <li>
                    {" "}
                    <i>{add.fullAddress}</i>{" "}
                  </li>
                ))}
              </ol>
            </p>
          </div>
        </div>
        <div>
          <hr />
          <div className="row">
            {orderData.length === 0 ? (
              <p className="text-center">No orders</p>
            ) : (
              <p className="fs-3 text-center">Order History</p>
            )}
            {orderData?.map((item, index) => (
              <div className="border border-primary border-2 p-2 m-1 d-flex flex-coloumn row">
                <div className="col-lg-3 col-sm-12">
                  <p>
                    <b>({index + 1})</b> {today.toLocaleDateString()}
                  </p>
                </div>
                <div className="col-lg-3  col-sm-12">
                  <p>
                    <b>Products :</b> {"   "}
                    {item.cart
                      .map(
                        (item) =>
                          item.productName + "(" + item.productQuantity + ")",
                      )
                      .join(", ")}
                  </p>
                </div>
                <div className="col-lg-2  col-sm-12">
                  <p>
                    {" "}
                    <b>Price :</b> ₹ {item.price}
                  </p>
                </div>
                <div className="col-lg-4  col-sm-12">
                  <p>
                    {" "}
                    <b>Address :</b> {item.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
