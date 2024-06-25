import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Services2Card } from "./Services2Card";
import '../style.css';
import { Loading } from "./Loading.js";
import { useQuery } from "@tanstack/react-query";
import { getServiceDetails, getHomepageDetails } from "../api/index.js";

export const Services2 = () => {
  let {
    isLoading,
    isError,
    data: homepageInfo,
    error,
  } = useQuery({
    queryKey: ["homepageInfo"],
    queryFn: getHomepageDetails, // fetch the posts using the async call
  });

  let {
    isLoading2,
    isError2,
    data: servicesInfo,
    error2,
  } = useQuery({
    queryKey: ["servicesInfo"],
    queryFn: getServiceDetails, // fetch the posts using the async call
  });

  if (isLoading || isLoading2) return <Loading />;
  if (isError) return `Error: ${error.message}`;
  if (isError2) return `Error: ${error2.message}`;

  return (!isLoading && !isLoading2 && 
    // <section className="project" id="services">
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
                  <Col xl={4} lg={4} md={6} sm={6} xm={10} className="project-card" key={service._id}>
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

            {/* 
              <Col md={4} className="project-card">
                <Services2Card
                  imgPath={projImg1}
                  title="Smoothing Service"
                  description="VoMor Hair Extensions not only add length, but also add volume & fullness. VoMor Extensions are made of high quality Remy hair, collected & manufactured in a humane manner, packaged according to environmental guidelines, and are tape-in & reusable. VoMor Extensions are safe & do not damage the hair."
                  service={serviceDetailsFull.smoothingService}
                />
              </Col>

              <Col md={4} className="project-card">
                <Services2Card
                  imgPath={projImg2}
                  title="Waxing"
                  description="At least 3 weeks of growth is recommend for a waxing service. You may be asked to reschedule if the hair length is insufficient in order to effectively perform the service."
                  service={serviceDetailsFull.waxing}
                />
              </Col>

              <Col md={4} className="project-card">
                <Services2Card
                  imgPath={projImg3}
                  title="Hair Extensions"
                  description="VoMor Hair Extensions not only add length, but also add volume & fullness. VoMor Extensions are made of high quality Remy hair, collected & manufactured in a humane manner, packaged according to environmental guidelines, and are tape-in & reusable. VoMor Extensions are safe & do not damage the hair."
                  service={serviceDetailsFull.hairExtensions}           
                />
              </Col>

              <Col md={4} className="project-card">
                <Services2Card
                  imgPath={projImg4}
                  title="Hair Coloring"
                  description="AVEDA Full Spectrum Color immerses hair in 97% naturally derived formulas for our Permanent Color & 99% naturally derived formulas for our Deposit-Only Demi-Permanent Color. (A Gloss/Toner is included in all Foil, Double Process, All Over Bleach, Balayage & Ombre services. A Gloss/Toner can be added to a Root Touch Up, if appropriate, for an additional price.)"
                  service={serviceDetailsFull.hairColoring}
                />
              </Col>

              <Col md={4} className="project-card">
                <Services2Card
                  imgPath={projImg5}
                  title="Haircut & Style"
                  description="Custom cuts use same pricing scale. Enjoy a relaxing head, neck & shoulder massage, shampoo & style."
                  service={serviceDetailsFull.haircutAndStyle}
                />
              </Col>

              <Col md={4} className="project-card">
                <Services2Card
                  imgPath={projImg6}
                  title="Lash Extensions"
                  description="Xtreme Lashes Eyelash Extensions are your ultimate answer for longer, thicker, more beautiful looking eyelashes."
                  service={serviceDetailsFull.lashExtensions}
                />
              </Col> */}
          </Row>
        </Container>
      </Container>
    </section>
  );
}

// export default Projects;
