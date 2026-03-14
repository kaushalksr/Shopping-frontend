const Footer = () => {
  return (
    <div
      className="p-0 m-0 text-center container-fluid"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        marginTop: 50,
      }}>
      <p
        className="fs-5"
        style={{
          backgroundColor: "#363640",
          padding: 0,
          margin: 0,
          color: "#fff",
          fontSize:15
        }}>
        &copy; Flixcart.All Rights Reserved.
      </p>
    </div>
  );
};
export default Footer;
