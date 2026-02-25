import Header from "../components/Header";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row my-3" style={{ justifyContent: "center" }}>
          <Link
            to="/api/products"
            className="col-lg-3 btn p-0"
            style={{ position: "relative", display: "inline" }}>
            {" "}
            <img
              style={{ width: "100%", height: "100%", padding: 0 }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkSldh-yUlF8OvuRbev52WdQ_xCqoqJOLsQA&s"
              alt="men"
            />
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "0%",
                backgroundColor: "yellow",
                width: "100%",
              }}>
              <b>MEN</b>
            </p>
          </Link>
          <Link
            to="/api/products"
            className="col-lg-3 btn p-0"
            style={{ position: "relative", display: "inline" }}>
            {" "}
            <img
              style={{ width: "100%", height: "100%", padding: 0 }}
              src="https://i.pinimg.com/474x/70/18/56/70185679be293ba9b20072e798c0ca5d.jpg"
              alt="men"
            />
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "0%",
                backgroundColor: "yellow",
                width: "100%",
              }}>
              <b>WOMEN</b>
            </p>
          </Link>

          <Link
            to="/api/products"
            className="col-lg-3 btn p-0"
            style={{ position: "relative", display: "inline" }}>
            {" "}
            <img
              style={{ width: "100%", height: "100%", padding: 0 }}
              src="https://thumbs.dreamstime.com/b/cute-baby-enjoys-eating-ice-cream-outdoors-child-holds-cone-street-sweet-treat-brings-joy-happiness-summer-kids-snack-421667754.jpg"
              alt="men"
            />
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "0%",
                backgroundColor: "yellow",
                width: "100%",
              }}>
              <b>KIDS</b>
            </p>
          </Link>
        </div>

        <div className="my-3 row" style={{ justifyContent: "center" }}>
          <div className="col-lg-12 col-sm-12">
            <img
              style={{ width: "100%" }}
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div
              className="card mb-3"
              style={{ maxWidth: 540, maxHeight: 400 }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title fst-italic">NEW ARRIVALS</h5>
                    <h5 className="card-title bold">Winter Collection</h5>
                    <p className="card-text">
                      Checkout best winter collection to stay warm in style this
                      season.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="card mb-3"
              style={{ maxWidth: 540, maxHeight: 400 }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title fst-italic">NEW ARRIVALS</h5>
                    <h5 className="card-title bold">Summer Collection</h5>
                    <p className="card-text">
                      Checkout best winsummerter collection to stay cool in
                      style this season.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
