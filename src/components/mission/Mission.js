import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MissionAbout from "./MissionAbout.js";
import Loading from "../Loading.js";
import laptopImg from "../../assets/img/about-img.jpg";

import { useHomePageDetails } from "../admin/hooks/useHomePageDetails"; // Adjust the import path as needed

const Mission = () => {
  const {
    isLoading,
    isError,
    data: bannerInfo,
    error,
  } = useHomePageDetails();

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    <section id="mission">
      <Container fluid className="mission-section">
        <Container>
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={7}
              style={{
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "50px",
              }}
            >
              <h1
                style={{ fontSize: "2.1em", paddingBottom: "20px" }}
                className="animate__animated animate__fadeInLeft"
              >
                We Believe that Interior Beautifies the Total Architecture
              </h1>
              <MissionAbout />
            </Col>
            <Col
              md={5}
              style={{ paddingTop: "120px", paddingBottom: "50px" }}
              className="about-img"
            >
              <img src={laptopImg} alt="about" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
};

export default Mission;
