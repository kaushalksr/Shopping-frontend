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
    name: "",
    mobile: "",
    fullAddress: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "",
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
    dataLoading,
    setDataLoading,
  } = useContext(CartContext);

  // SAVE ADDRESS

  const saveAddress = () => {
    if (editId) {
      const updatedAddress = address.map((item) =>
        item.id === editId ? { ...item, ...formData } : item,
      );

      setAddress(updatedAddress);
      setEditId(null);
      setShowAddressForm(false);
      showAlert("Address Updated Successfully!", "success");
    } else {
      const newAddress = {
        id: Date.now(),
        ...formData,
      };

      setAddress((prev) => [...prev, newAddress]);

      setFormData({
        name: "",
        mobile: "",
        pincode: "",
        locality: "",
        fullAddress: "",
        city: "",
        state: "",
        addressType: "",
      });

      setShowAddressForm(false);
      showAlert("Address Added Successfully!", "success");
    }
  };

  // UPDATE ADDRESS

  const editAddress = (addId) => {
    setShowAddressForm(true);
    const addressToUpdate = address.find((add) => add.id === addId);
    setFormData({
      name: addressToUpdate.name,
      mobile: addressToUpdate.mobile,
      fullAddress: addressToUpdate.fullAddress,
      locality: addressToUpdate.locality,
      city: addressToUpdate.city,
      state: addressToUpdate.state,
      pincode: addressToUpdate.pincode,
      addressType: addressToUpdate.addressType,
    });
    setEditId(addId);
  };

  // SAVE ORDER

  const saveOrder = (event) => {
    event.preventDefault();
    setDataLoading(true);

    if (!selectedAddress || selectedAddress === "" || address.length < 1) {
      setMessage("Please Select Address!");
      return;
    }

    const orderAddress = address.find((add) => add.id === selectedAddress);
    const completeAddress =
      orderAddress.name +
      ", " +
      orderAddress.mobile +
      ", " +
      orderAddress.fullAddress +
      ", " +
      orderAddress.locality +
      ", " +
      orderAddress.city +
      ", " +
      orderAddress.state +
      ", " +
      orderAddress.pincode;

    const newOrder = {
      id: Date.now(),
      address: completeAddress,
      cart: products,
      price: totalPrice + totalDeliveryCharge - totalDiscount,
    };

    setTimeout(() => {
      setOrderData((prev) => [...prev, newOrder]);

      showAlert("ORDER PLACED SUCCESSFULLY!", "success");
      navigate("/orderHistory");
      setCart([]);
      setSelectedAddress("");
      setDataLoading(false);
    }, 3000);
  };

  const deleteAddress = (id) => {
    const deletedAdd = address.find((add) => add.id === id);

    setAddress((prev) => prev.filter((add) => add.id !== id));

    if (deletedAdd && deletedAdd?.fullAddress === selectedAddress) {
      setSelectedAddress("");
    }
    setSelectedAddress("");
  };

  useEffect(() => {
    const addressExsits = address.some(
      (add) => add.fullAddress === selectedAddress,
    );

    if (!addressExsits) {
      setSelectedAddress("");
    }
  }, [address]);

  useEffect(() => {
    if (Array.isArray(address)) {
      localStorage.setItem("address", JSON.stringify(address));
    }
  }, [address]);

  return (
    <div>
      <Header />
      <div className="container py-2 mb-5">
        <div className="row">
          <div className="col-lg-12 col-sm-12 mb-4">
            <div className="">
              <p className="fs-5 fw-medium" style={{ color: "blueviolet" }}>
                MANAGE ADDRESSES
              </p>
              <button
                onClick={() => setShowAddressForm(true)}
                className="btn w-100 border">
                <p className="fs-5 fw-medium">+ ADD NEW ADDRESS</p>
              </button>{" "}
              {address.length < 1 && (
                <p style={{ color: "red" }}>Please add Address</p>
              )}
            </div>
            {showAddressForm && (
              <form
                className="row g-3 form-floating border p-2 mt-4"
                onSubmit={saveAddress}>
                <div className="col-md-6">
                  <label htmlFor="inputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputMobileNumber" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    required
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    type="number"
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPincode" className="form-label">
                    Pincode
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    id="inputPincode"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputLocality" className="form-label">
                    Locality
                  </label>
                  <input
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, locality: e.target.value })
                    }
                    value={formData.locality}
                    type="text"
                    className="form-control"
                    id="inputLocality"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Address
                  </label>
                  <textarea
                    required
                    className="form-control"
                    value={formData.fullAddress}
                    type="text"
                    rows="3"
                    id="inputAddress"
                    col="20"
                    onChange={(e) =>
                      setFormData({ ...formData, fullAddress: e.target.value })
                    }
                    placeholder="Address (Area & Street)"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">
                    City
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="inputCity"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputState" className="form-label">
                    State
                  </label>
                  <select
                    required
                    id="inputState"
                    className="form-select"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }>
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">Address Type</label>
                  <div className="form-check">
                    <input
                      required
                      type="radio"
                      className="form-check-input"
                      name="addressType"
                      value="Home"
                      checked={formData.addressType === "Home"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          addressType: e.target.value,
                        })
                      }
                    />
                    <label className="form-check-label">Home</label>
                  </div>

                  <div className="form-check">
                    <input
                      required
                      type="radio"
                      className="form-check-input"
                      name="addressType"
                      value="Office"
                      checked={formData.addressType === "Office"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          addressType: e.target.value,
                        })
                      }
                    />
                    <label className="form-check-label">Office</label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="col-md-3 col-sm-3 btn btn-primary m-1">
                  {editId ? "Update Address" : "Save Address"}
                </button>
                <button
                  className="col-md-3 col-sm-3 btn btn-danger m-1"
                  type="button"
                  onClick={() => setShowAddressForm(false)}>
                  Close
                </button>
              </form>
            )}
            <div className="row m-2">
              {address.length > 0 &&
                !selectedAddress &&
                selectedAddress === "" && (
                  <p style={{ color: "red" }}>Please select Address</p>
                )}
              {address &&
                address.map((add) => (
                  <div
                    className={`col-lg-12 d-flex align-items-center justify-content-between border p-3 ${selectedAddress === add.id ? "border-primary border-4" : "border"}`}
                    onClick={() => setSelectedAddress(add.id)}
                    style={{
                      padding: 10,
                      marginBottom: 10,
                      cursor: "pointer",
                      borderRadius: 6,
                    }}>
                    <div className="fs-5">
                      {" "}
                      <span className="btn btn-light btn-sm p-1 border border-1">
                        {add.addressType}
                      </span>{" "}
                      {add.name}, {add.locality}, {add.fullAddress}, {add.city},{" "}
                      {add.state}, {add.pincode}
                    </div>
                    <div className="">
                      <button
                        onClick={() => editAddress(add.id)}
                        className="btn-warning btn btn-sm m-2">
                        {" "}
                        <img
                          style={{ height: "15px", width: "15px", padding: 0 }}
                          src="https://cdn-icons-png.freepik.com/512/8747/8747675.png"
                          alt="EditButton"
                        />{" "}
                      </button>
                      <button
                        onClick={() => deleteAddress(add.id)}
                        className="btn-danger btn btn-sm m-2">
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
          <div className="col-lg-12 col-sm-12 mx-3">
            <p className="fs-5 fw-bold text-center">ORDER DETAILS</p>
            <div className="row d-flex justify-content-center text-center">
              {products.map((item) => (
                <div className="">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    height={150}
                    width={150}
                  />
                  <p
                    className="fs-5"
                    style={{
                      color: "#9d9898",
                      backgroundColor: "#fff",
                      padding: 2,
                      alignItems: "center",
                    }}>
                    (<b>SIZE: {item.size}</b>) x {item.quantity}
                  </p>
                </div>
              ))}
              <h3 className="my-2 p-0">
                Total Price: ₹
                {totalPrice + totalDeliveryCharge - totalDiscount}{" "}
              </h3>
              {address.length > 0 && selectedAddress !== "" && (
                <button
                  onClick={saveOrder}
                  className="btn btn-primary w-50"
                  disabled={dataLoading}>
                  {dataLoading ? (
                    <>
                      Placing order...{" "}
                      <span className="spinner-border spinner-border-sm me-2"></span>{" "}
                    </>
                  ) : (
                    "Checkout"
                  )}
                </button>
              )}
              {dataLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
