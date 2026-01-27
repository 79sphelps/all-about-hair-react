import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import "react-multi-carousel/lib/styles.css";
import ContactService from "../api/contact.service.js";
import Loading from "./Loading";
import Contact2 from "./Contact2";
import {
  CONTACT_INFO_TITLE_TEXT,
  CONTACT_INFO_SUBTITLE_TEXT,
  CONTACT_INFO_TITLE2_TEXT,
  CONTACT_INFO_TITLE2_SUBTEXT,
  CONTACT_INFO_TITLE3_TEXT,
  CONTACT_INFO_TITLE3_SUBTEXT,
  CONTACT_INFO_TITLE4_TEXT,
  CONTACT_INFO_TITLE4_SUBTEXT,
  CONTACT_INFO_VISIT_LOCATION_TEXT,
  CONTACT_INFO_CALL_US_TEXT,
  CONTACT_INFO_EMAIL_US_TEXT,
  CONTACT_INFO_SALON_HOURS_TEXT,
} from './data';


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
            <h1 className="project-heading">{ CONTACT_INFO_TITLE_TEXT }</h1>
            <p style={{ color: "white", marginTop: "0", marginBottom: "20px" }}>
              { CONTACT_INFO_SUBTITLE_TEXT }
            </p>
            <br />
            <div style={{ fontSize: "1.8rem" }}>{ CONTACT_INFO_TITLE2_TEXT }</div>
            { CONTACT_INFO_TITLE2_SUBTEXT }
            <br />
            <br />
            <div style={{ fontSize: "1.8rem" }}>{ CONTACT_INFO_TITLE3_TEXT }</div>
            { CONTACT_INFO_TITLE3_SUBTEXT }
            <br />
            <br />
            <div style={{ fontSize: "1.8rem" }}>{ CONTACT_INFO_TITLE4_TEXT }</div>
            { CONTACT_INFO_TITLE4_SUBTEXT }
            {contactInfo && (
              <Row style={{ marginBottom: "0px", marginTop: "20px" }}>
                <Col md={3} sm={6} xs={10} className="contact-info-card">
                  <h3>{ CONTACT_INFO_VISIT_LOCATION_TEXT }</h3>
                  {contactInfo[0].location}
                </Col>
                <Col md={3} sm={6} xs={10} className="contact-info-card">
                  <h3>{ CONTACT_INFO_CALL_US_TEXT }</h3>
                  {contactInfo[0].phone}
                </Col>
                <Col md={3} sm={6} xs={10} className="contact-info-card">
                  <h3>{ CONTACT_INFO_EMAIL_US_TEXT }</h3>
                  {contactInfo[0].email}
                </Col>
                <Col md={3} sm={6} xs={10} className="contact-info-card">
                  <h3>{ CONTACT_INFO_SALON_HOURS_TEXT }</h3>
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
        <div style={{ marginTop: '20px' }}>
          <Contact2 />
        </div>
      </section>
    )
  );
};

export default ContactInfo;
