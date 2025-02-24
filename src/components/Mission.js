import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import Aboutcard from "./AboutCard";
import Loading from "./Loading";
import HomepageService from "../api/homepage.service.js";
import laptopImg from "../assets/img/about-img.jpg";

const Mission = () => {
  const {
    isLoading,
    isError,
    // data: bannerInfo,
    error,
  } = useQuery({
    queryKey: ["bannerInfo"],
    queryFn: HomepageService.getHomepageDetails,
  });

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
              <Aboutcard />
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
