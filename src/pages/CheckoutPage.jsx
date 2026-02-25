import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { CartContext } from "../context/cartContext";
import deleteImg from "../logo/deleteImg.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [message, setMessage] = useState();
  const [formData, setFormData] = useState({
    fullAddress: "",
  });

  const navigate = useNavigate();

  const {
    products,
    selectedAddress,
    setSelectedAddress,
    totalPrice,
    address,
    setAddress,
    totalDiscount,
    totalDeliveryCharge,
    setOrderData,
    orderData,
    setCart,
  } = useContext(CartContext);

  const handleAddress = (value) => {
    setFormData({ fullAddress: value });
  };
  // SAVE ADDRESS
  const saveAddress = () => {
    const newAddress = {
      id: Date.now(),
      ...formData,
    };

    setAddress((prev) => [...prev, newAddress]);

    setFormData({
      fullAddress: "",
    });
    setShowAddressForm(false);
  };

  // SAVE ORDER

  const saveOrder = (event) => {
    event.preventDefault();

    if (!selectedAddress) {
      setMessage("Please Select Address!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      address: selectedAddress,
      cart: products,
      price: totalPrice + totalDeliveryCharge - totalDiscount,
    };

    setOrderData((prev) => [...prev, newOrder]);

    navigate("/orderHistory");

    setCart([]);
  };

  const deleteAddress = (id) => {
    setAddress((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (Array.isArray(address)) {
      localStorage.setItem("address", JSON.stringify(address));
    }
  }, [address]);

  console.log("Selected address = ", selectedAddress);

  return (
    <div>
      <Header />
      <div className="container py-2">
        <p className="fs-5">
          Address:{" "}
          <button
            onClick={() => setShowAddressForm(true)}
            className="btn btn-success btn-sm p-1">
            + Add new Address
          </button>{" "}
        </p>
        {showAddressForm && (
          <div>
            <textarea
              value={formData.fullAddress}
              type="text"
              onChange={(e) => handleAddress(e.target.value)}
              placeholder="Enter full Address"
            />{" "}
            <br />
            <button
              onClick={saveAddress}
              type="submit"
              className="btn btn-sm btn-success p-1">
              Save Address
            </button>
          </div>
        )}
        <div className="row m-2">
          {address &&
            address.map((add) => (
              <div
                className={`col-lg-3 d-flex justify-content-between border p-3 ${selectedAddress === add.fullAddress ? "border-success border-4" : "border"}`}
                onClick={() => setSelectedAddress(add.fullAddress)}
                style={{
                  padding: 10,
                  marginBottom: 10,
                  cursor: "pointer",
                  borderRadius: 6,
                }}>
                {add.fullAddress}
                <button
                  onClick={() => deleteAddress(add.id)}
                  className="btn-danger btn btn-sm">
                  {" "}
                  <img
                    style={{ height: 10, width: 10, padding: 0 }}
                    src={deleteImg}
                    alt=""
                  />{" "}
                </button>
              </div>
            ))}
        </div>
        <div className="m-2">
          <h5>Order Details:</h5>
          <div className="row">
            {products.map((item) => (
              <div className="col-auto m-0 p-0">
                <img src={item.productImage} alt="" height="70" width="60" />
              </div>
            ))}
            <h5 className="my-5">
              Total Price: ₹
              {totalPrice + totalDeliveryCharge - totalDiscount}{" "}
            </h5>
            <button onClick={saveOrder} className="btn btn-success w-50">
              Checkout
            </button>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
