import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { CartContext } from "../context/cartContext";
import deleteImg from "../logo/deleteImg.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [message, setMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
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
    showAlert,
  } = useContext(CartContext);

  const handleAddress = (value) => {
    setFormData({ fullAddress: value });
  };
  // SAVE ADDRESS
  const saveAddress = () => {
    if (address.length === 0) setSelectedAddress(null);
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

    if (!selectedAddress || selectedAddress === null || address.length < 1) {
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

    showAlert("ORDER PLACED SUCCESSFULLY !", "success");

    setTimeout(() => {
      navigate("/orderHistory");
      setCart([]);
    }, 3000);
  };

  const [deletedAddress, setDeletedAddress] = useState(null);

  const deleteAddress = (id) => {
    setDeletedAddress(address.find((add) => add.id === id));

    setAddress((prev) => prev.filter((add) => add.id !== id));
    if (selectedAddress === deletedAddress) setSelectedAddress(null);
  };

  useEffect(() => {
    if (Array.isArray(address)) {
      localStorage.setItem("address", JSON.stringify(address));
    }
  }, [address]);

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
          <p className="m-1" style={{ color: "red" }}>
            {message}
          </p>
        </div>
        <div className="m-2">
          <h5>Order Details:</h5>
          <div className="row">
            {products.map((item) => (
              <div className="col-auto m-0 p-0">
                <img src={item.productImage} alt="" height="70" width="60" />
              </div>
            ))}
            <h5 className="my-2">
              Total Price: ₹
              {totalPrice + totalDeliveryCharge - totalDiscount}{" "}
            </h5>
            {address.length > 0 &&
              selectedAddress &&
              selectedAddress !== deletedAddress && (
                <button onClick={saveOrder} className="btn btn-success w-50">
                  Checkout
                </button>
              )}
            <p className="m-2 fw-semibold" style={{ color: "green" }}>
              {successMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
