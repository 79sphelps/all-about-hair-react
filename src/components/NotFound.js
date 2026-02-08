import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="page-not-found-section">
      <div className="page-not-found">Page Not Found</div>
      <button className="page-not-found-btn" onClick={() => navigate("/")}>
        Go Back
      </button>
    </section>
  );
};

export default NotFound;
