const FullPageLoader = ({ title, subtitle }) => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h5 style={{ marginBottom: "5.0rem" }}>{title}</h5>
    <h5>{subtitle}</h5>
    <div className="loader" />
  </div>
);

export default FullPageLoader;