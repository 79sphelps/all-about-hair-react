import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import Loading from "./Loading";
import ServicesService from "../api/services.service.js";

const Service = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const {
    isLoading,
    isError,
    data: serviceDetails,
    error,
  } = useQuery({
    queryKey: ["serviceDetails", location.state.id],
    queryFn: () => ServicesService.getServiceDetail(location.state.id),
  });

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    <section className="contact">
      {/* <NavBar /> */}
      {/* <Container style={{ marginTop: "100px" }}> */}
      <Container>
        <button
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
          <span>Back to Home</span> <ArrowRightCircle size={25} />
        </button>
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
          <Col lg={4} md={4} sm={12}>
            <h2>{serviceDetails.title}</h2>
            <div style={{ alignContent: "center", alignItems: "center" }}>
              <img
                src={require("../" + serviceDetails.image)}
                style={{ width: "50%" }}
                alt=""
              ></img>
            </div>
          </Col>
          <Col>
            <div style={{ fontSize: "1.2rem", paddingTop: "10px" }}>
              {serviceDetails.description}
            </div>
          </Col>
        </Row>
        <Row
          className="align-items-center"
          style={{
            margin: "15px",
            paddingTop: "15px",
            fontSize: "1.5rem",
          }}
        >
          Pricing Details:
        </Row>
        {serviceDetails &&
          serviceDetails.pricing.map((service, idx) => {
            return (
              <Row
                key={service._id + "." + idx}
                className="align-items-center"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  margin: "15px",
                  padding: "15px",
                  borderRadius: "25px",
                  fontSize: "1.2rem",
                }}
              >
                <div>Type: {service.type}</div>
                <div>Price: {service.price}</div>
                <div>Description: </div>
                <div>{service.description}</div>
              </Row>
            );
          })}
      </Container>
    </section>
  );
};

export default Service;
