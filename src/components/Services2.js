import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import Services2Card from "./Services2Card";
import Loading from "./Loading";
import ServicesService from "../api/services.service.js";
import HomepageService from "../api/homepage.service.js";
import "../style.css";

const Services2 = () => {
  let {
    isLoading,
    isError,
    data: homepageInfo,
    error,
  } = useQuery({
    queryKey: ["homepageInfo"],
    queryFn: HomepageService.getHomepageDetails,
  });

  let {
    isLoading2,
    isError2,
    data: servicesInfo,
    error2,
  } = useQuery({
    queryKey: ["servicesInfo"],
    queryFn: ServicesService.getServiceDetails,
  });

  if (isLoading || isLoading2) return <Loading />;
  if (isError) return `Error: ${error.message}`;
  if (isError2) return `Error: ${error2.message}`;

  return (
    !isLoading &&
    !isLoading2 && (
      <section id="services">
        <Container fluid className="services-section">
          {/* <Particle /> */}
          <Container>
            <h1 className="project-heading animate__animated animate__fadeInRight">
              {/* Choose from Among Our Custom Services */}
              {homepageInfo && homepageInfo[0].serviceDetailsHeadline}
            </h1>
            <p style={{ color: "white" }}>
              {/* Services are subject to stylist availability and may change at any time. */}
              {homepageInfo && homepageInfo[0].serviceDetailsSubMsg}
            </p>
            <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
              {servicesInfo &&
                // servicesInfo.slice(0, servicesInfo.length-1).map((service, idx) => {
                servicesInfo.map((service, idx) => {
                  return (
                    <Col
                      xl={4}
                      lg={4}
                      md={6}
                      sm={6}
                      xm={10}
                      className="project-card"
                      key={service._id}
                    >
                      <Services2Card
                        imgPath={require("../" + service.image)}
                        // imgPath={projImg1}
                        title={service.title}
                        description={service.description}
                        service={service.pricing}
                        id={service._id}
                      />
                    </Col>
                  );
                })}
            </Row>
          </Container>
        </Container>
      </section>
    )
  );
};

export default Services2;
