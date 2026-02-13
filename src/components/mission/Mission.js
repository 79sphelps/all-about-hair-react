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
    data: homepageInfo,
    error,
  } = useHomePageDetails();

if (isLoading) {
    return (
      <Loading
        role="status"
        aria-live="polite"
        aria-label="Loading mission content"
      />
    );
  }

if (isLoading) {
    return (
      <Loading
        role="status"
        aria-live="polite"
        aria-label="Loading mission content"
      />
    );
  }

  return (
    <section 
          id="mission"
      aria-labelledby="mission-heading"
    >
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
              <header>
                <h2
                  id="mission-heading"
                  className="animate__animated animate__fadeInLeft"
                  style={{ fontSize: "2.1em", paddingBottom: "20px" }}
                >
                  We Believe that Interior Beautifies the Total Architecture
                </h2>
              </header>

              {/* Mission description */}
              <MissionAbout />
            </Col>
            <Col
              md={5}
              style={{ paddingTop: "120px", paddingBottom: "50px" }}
              className="about-img"
            >
              {/* <img src={laptopImg} alt="about" className="img-fluid" /> */}
              <figure>
                <img
                  src={laptopImg}
                  alt="Interior design workspace showcasing architectural planning"
                  className="img-fluid"
                  loading="lazy"
                />
              </figure>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
};

export default Mission;
