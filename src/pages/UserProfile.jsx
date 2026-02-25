import { useContext } from "react";
import Header from "../components/Header";
import { CartContext } from "../context/cartContext";

const UserProfile = () => {
  const { address, orderData } = useContext(CartContext);
 
  
  const today = new Date()

  return (
    <div>
      <Header />
      <div className="container">
        <p className="fs-3 my-2 text-center">User Profile</p>
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
              <b>Name : </b> <span>Elina</span>{" "}
            </p>
            <p className="justify-content-between d-flex">
              <b>Number : </b> <span>+1123972213</span>{" "}
            </p>
            <p className="justify-content-between d-flex">
              <b>Address : </b>{" "}
              <ol>
                {address.map((add) => (
                  <li>{add.fullAddress}</li>
                ))}
              </ol>
            </p>
          </div>
        </div>
        <div>
         
          <hr />
          <div className="row">
            { orderData.length === 0 ? <p className="text-center">No orders</p>  : <p className="fs-3 text-center">Order History</p>}
            { orderData?.map((item, index) => (
              <div className="border border-2 p-2 m-1 d-flex justify-content-between col-lg-12 col-sm-12">
                ({index + 1}) {today.toLocaleDateString()}
                <p className="vr"></p>
                <p>
                  Products :{"   "}
                  {item.cart
                    .map(
                      (item) =>
                        item.productName + "(" + item.productQuantity + ")",
                    )
                    .join(", ")}
                </p>
                <p className="vr"></p>
                <p>Price : ₹ {item.price}</p>
                <p className="vr"></p>
                <p>Address : {item.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
