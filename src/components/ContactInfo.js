import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import "react-multi-carousel/lib/styles.css";
import ContactService from "../api/contact.service.js";
import Loading from "./Loading";

const ContactInfo = () => {
  const {
    isLoading,
    isError,
    data: contactInfo,
    error,
  } = useQuery({
    queryKey: ["contactInfo"],
    queryFn: ContactService.getContactInfo,
  });

  if (isLoading || contactInfo === undefined) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    !isLoading && (
      <section className="skill" id="contact-info">
        <Container fluid className="contact-info-section">
          {/* <Particle /> */}
          <Container>
            <h1 className="project-heading">Salon Information</h1>
            <p style={{ color: "white", marginTop: "0", marginBottom: "20px" }}>
              An experienced team member is almost always available during salon
              hours.
            </p>
            <br />
            <div style={{ fontSize: "1.8rem" }}>Cuts</div>
            Whether you're in need of a clean-up, a new style, or a
            gender-affirming transformation, we've got you covered. Our
            experienced stylists are here for all your haircut needs.
            <br />
            <br />
            <div style={{ fontSize: "1.8rem" }}>Coloring</div>
            From subtle to fantasy, our experienced stylists can give you the
            color you've been dreaming of. Need a little inspiration? Book a
            color consultation with a stylist and we will help you on your color
            journey.
            <br />
            <br />
            <div style={{ fontSize: "1.8rem" }}>A-La-Carte</div>
            We offer a variety of a-la-carte services, from hair treatments and
            styling to beard care, we have all the cutting-edge services you
            need!
            {contactInfo && (
              <Row style={{ marginBottom: "0px", marginTop: "20px" }}>
                <Col md={3} sm={6} xs={10} className="contact-info-card">
                  <h3>Visit Our Salon</h3>
                  {contactInfo[0].location}
                </Col>
                <Col md={3} sm={6} xs={10} className="contact-info-card">
                  <h3>Call Us</h3>
                  {contactInfo[0].phone}
                </Col>
                <Col md={3} sm={6} xs={10} className="contact-info-card">
                  <h3>Email Us</h3>
                  {contactInfo[0].email}
                </Col>
                <Col md={3} sm={6} xs={10} className="contact-info-card">
                  <h3>Salon Hours</h3>
                  <ul>
                    {contactInfo[0].hours.map((time) => {
                      return <li key={time}>{time}</li>;
                    })}
                  </ul>
                </Col>
              </Row>
            )}
          </Container>
        </Container>
      </section>
    )
  );
};

export default ContactInfo;
