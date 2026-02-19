import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ServicesCard from "./components/ServicesCard";
import Loading from "../../ui/feedback/LoadingSpinner";
import { useHomePageDetails } from "../admin/homepage/useHomePageDetails";
import { useServices } from "../admin/services/useServices";

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

  if (isHomepageLoading || isServicesLoading) {
    return <Loading />;
  }

  if (isHomepageError) {
    return (
      <p role="alert">
        Error loading homepage data: {homepageError.message}
      </p>
    );
  }

  if (isServicesError) {
    return (
      <p role="alert">
        Error loading services: {servicesError.message}
      </p>
    );
  }

  const homepage = homepageInfo?.[0];

  return (
    <section id="services" aria-labelledby="services-heading">
      <Container fluid className="services-section">
        <Container>
          <h2 id="services-heading" className="project-heading animate__animated animate__fadeInRight">
            {homepage?.serviceDetailsHeadline}
          </h2>
          
          {/* Section description */}
          <p id="services-description" style={{ color: "white" }}>
            {homepage?.serviceDetailsSubMsg}
          </p>

          <Row as="ul" role="list" aria-describedby="services-description" style={{ listStyleType: "none", justifyContent: "center", paddingBottom: "10px" }}>
            {servicesInfo.map((service) => (
              <Col
                as="li"
                role="listitem"
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
