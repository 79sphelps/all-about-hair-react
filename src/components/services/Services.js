import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ServicesCard from "./ServicesCard";
import Loading from "../Loading";
import { useHomePageDetails } from "../admin/hooks/useHomePageDetails";
import { useServices } from "../admin/hooks/useServices";

const Services = () => {
  const {
    data: homepageInfo,
    isLoading: isHomepageLoading,
    isError: isHomepageError,
    error: homepageError,
  } = useHomePageDetails();

  const {
    data: servicesInfo,
    isLoading: isServicesLoading,
    isError: isServicesError,
    error: servicesError,
  } = useServices();

  if (isHomepageLoading || isServicesLoading) return <Loading />;
  if (isHomepageError) return `Error: ${homepageError.message}`;
  if (isServicesError) return `Error: ${servicesError.message}`;

  const homepage = homepageInfo?.[0];

  return (
    <section id="services">
      <Container fluid className="services-section">
        <Container>
          <h1 className="project-heading animate__animated animate__fadeInRight">
            {homepage?.serviceDetailsHeadline}
          </h1>
          <p style={{ color: "white" }}>
            {homepage?.serviceDetailsSubMsg}
          </p>

          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {servicesInfo.map((service) => (
              <Col
                key={service._id}
                xl={4}
                lg={4}
                md={6}
                sm={6}
                xs={10}
                className="project-card"
              >
                <ServicesCard
                  imgPath={require("../../" + service.image)}
                  title={service.title}
                  description={service.description}
                  service={service.pricing}
                  id={service._id}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </section>
  );
};

export default Services;
