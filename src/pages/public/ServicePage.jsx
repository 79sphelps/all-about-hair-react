import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import Loading from "../../ui/feedback/LoadingSpinner.jsx";
import { useService } from "../../features/admin/services/hooks"; // Adjust path as needed
import Footer from "../../features/footer/Footer.js";

const ServicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Use the useService hook, passing the id from location.state
  const {
    isLoading,
    isError,
    data: serviceDetails,
    error,
  } = useService(location.state.id);

  if (isLoading || serviceDetails === undefined) {
    return <Loading role="status" aria-live="polite" />;
  }

  if (isError) {
    return <div role="alert">Error: {error.message}</div>;
  }

  return (
    <section className="contact" aria-labelledby="service-heading">
      <Container>
        <button
          type="button"
          className="service-button animate__animated animate__backInLeft"
          onClick={() => {
            navigate("/");
          }}
          style={{
            border: "1px solid rgba(255, 255, 255, 0.5)",
            margin: "15px",
            padding: "15px",
            borderRadius: "25px",
          }}
        >
          <span>Back to Home</span>{" "}
          <ArrowRightCircle size={25} aria-hidden="true" focusable="false" />
        </button>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Row
            className="align-items-center"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.5)",
              margin: "15px",
              paddingLeft: "15px",
              paddingBottom: "15px",
              paddingTop: "15px",
              borderRadius: "25px",
            }}
          >
            <div>
              <h1
                id="service-heading"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {serviceDetails.title}
              </h1>
              <div style={{ alignContent: "center", alignItems: "center" }}>
                <img
                  src={require("../../" + serviceDetails.image)}
                  style={{ width: "20%", boxShadow: "10px 10px 5px grey" }}
                  alt={`${serviceDetails.title} service illustration`}
                />
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.2rem", paddingTop: "10px" }}>
                {serviceDetails.description}
              </div>
            </div>
          </Row>
        </div>

        <h2 style={{ margin: "15px", fontSize: "1.5rem" }}>Pricing Details</h2>

        <div role="list">
          {serviceDetails.pricing.map((service, idx) => (
            <Row
              key={service._id + "." + idx}
              role="listitem"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.5)",
                margin: "15px",
                padding: "15px",
                borderRadius: "25px",
                fontSize: "1.2rem",
              }}
            >
              <div>
                <strong>Type:</strong> {service.type}
              </div>
              <div>
                <strong>Price:</strong> {service.price}
              </div>
              <div>
                <strong>Description:</strong> {service.description}
              </div>
            </Row>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServicePage;
