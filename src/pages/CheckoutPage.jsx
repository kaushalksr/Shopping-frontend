import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { CartContext } from "../context/cartContext";
import deleteImg from "../logo/deleteImg.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const CheckoutPage = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [message, setMessage] = useState();
  const [formData, setFormData] = useState({
    fullAddress: "",
  });
  const [editId, setEditId] = useState(null);

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

  // SAVE ADDRESS

  const saveAddress = (value) => {
    if (editId) {
      const updatedAddress = address.map((item) =>
        item.id === editId ? { ...item, fullAddress: value } : item,
      );
      setAddress(updatedAddress);
      setEditId(null);
      setShowAddressForm(false);
      showAlert("Address Updated Successfully!", "success");
    } else {
      if (!value || value.length < 5) {
        showAlert("Please Enter Complete Address", "danger");
        return;
      }

      const newAddress = {
        id: Date.now(),
        ...formData,
        fullAddress: value,
      };

      setAddress((prev) => [...prev, newAddress]);

      setFormData({
        fullAddress: "",
      });

      setShowAddressForm(false);
      showAlert("Address Added Successfully!", "success");
    }
  };



  // UPDATE ADDRESS

  const editAddress = (addId) => {
    setShowAddressForm(true);
    const addressToUpdate = address.find((add) => add.id === addId).fullAddress;
    setFormData({ fullAddress: addressToUpdate });
    setEditId(addId);
  };

  // SAVE ORDER

  const saveOrder = (event) => {
    event.preventDefault();

    if (!selectedAddress || selectedAddress === "" || address.length < 1) {
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

    showAlert(
      "ORDER PLACED SUCCESSFULLY!  ---> Pls wait while redirecting...",
      "success",
    );

    setTimeout(() => {
      navigate("/orderHistory");
      setCart([]);
      setSelectedAddress("");
    }, 10);
  };

  const deleteAddress = (id) => {
    const deletedAdd = address.find((add) => add.id === id);

    setAddress((prev) => prev.filter((add) => add.id !== id));

    if (deletedAdd && deletedAdd?.fullAddress === selectedAddress) {
      setSelectedAddress("");
    }
    
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
        <div className="row">
          <div className="col-lg-12 col-sm-12 mb-4">
            <p className="fs-3">
              Manage Addresses <br />
              <button
                onClick={() => setShowAddressForm(true)}
                className="btn w-100 border">
                <p className="fs-3">+ ADD NEW ADDRESS</p>
              </button>{" "}
              {address.length < 1 && (
                <p style={{ color: "red" }}>Please add Address</p>
              )}
              {!selectedAddress && selectedAddress === "" && (
                <p style={{ color: "red" }}>Please select Address</p>
              )}
            </p>
            {showAddressForm && (
              <div>
                <textarea
                  value={formData.fullAddress}
                  type="text"
                  rows="5"
                  id="addressInput"
                  col="20"
                  onChange={(e) => setFormData({ fullAddress: e.target.value })}
                  placeholder="Enter full Address"
                />{" "}
                <br />
                <button
                  onClick={() => saveAddress(formData.fullAddress)}
                  type="submit"
                  className="btn btn-sm btn-primary p-1">
                  {editId ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
                </button>
              </div>
            )}
            <div className="row m-2">
              {address &&
                address.map((add) => (
                  <div
                    className={`col-lg-12 d-flex justify-content-between border p-3 ${selectedAddress === add.fullAddress ? "border-primary border-4" : "border"}`}
                    onClick={() => setSelectedAddress(add.fullAddress)}
                    style={{
                      padding: 10,
                      marginBottom: 10,
                      cursor: "pointer",
                      borderRadius: 6,
                    }}>
                    {add.fullAddress}
                    <div>
                      <button
                        onClick={() => editAddress(add.id)}
                        className="btn-warning btn btn-sm mx-2">
                        {" "}
                        <img
                          style={{ height: 15, width: 15, padding: 0 }}
                          src="https://cdn-icons-png.freepik.com/512/8747/8747675.png"
                          alt="EditButton"
                        />{" "}
                      </button>
                      <button
                        onClick={() => deleteAddress(add.id)}
                        className="btn-danger btn btn-sm mx-2">
                        {" "}
                        <img
                          style={{ height: 15, width: 15, padding: 0 }}
                          src={deleteImg}
                          alt="DeleteButton"
                        />{" "}
                      </button>
                    </div>
                  </div>
                ))}
              <p className="m-1" style={{ color: "red" }}>
                {message}
              </p>
            </div>
          </div>
          <div className="col-lg-12 col-sm-12 mx-auto">
            <p className="fs-3 fw-bold">ORDER DETAILS</p>
            <div className="row">
              {products.map((item) => (
                <div className="col-auto m-0 p-0">
                  <img src={item.productImage} alt="" height="70" width="60" />
                  <p
                    style={{
                      color: "#000",
                      backgroundColor: "#fff",
                      padding: 2,
                      alignItems: "center",
                    }}>
                    (<b>{item.size}</b>) x {item.quantity}
                  </p>
                </div>
              ))}
              <h3 className="my-2 p-0">
                Total Price: ₹
                {totalPrice + totalDeliveryCharge - totalDiscount}{" "}
              </h3>
              {address.length > 0 && selectedAddress !== "" && (
                <button onClick={saveOrder} className="btn btn-primary w-50">
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
