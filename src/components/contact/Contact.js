import { Container, Row, Col } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import Loading from "../Loading";
import ContactForm from "./ContactForm";
import { useContactInfo } from "./hooks/useContactInfo";
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
} from "../../lib/data";

const Contact = () => {
  const { data, isLoading, isError, error } = useContactInfo();

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  const contact = data[0];

  return (
    <section className="skill" id="contact">
      <Container fluid className="contact-info-section">
        <Container>
          <h1 className="project-heading">{CONTACT_INFO_TITLE_TEXT}</h1>

          <p style={{ color: "white", marginBottom: "20px" }}>
            {CONTACT_INFO_SUBTITLE_TEXT}
          </p>

          <div style={{ fontSize: "1.8rem" }}>{CONTACT_INFO_TITLE2_TEXT}</div>
          {CONTACT_INFO_TITLE2_SUBTEXT}

          <br />
          <br />

          <div style={{ fontSize: "1.8rem" }}>{CONTACT_INFO_TITLE3_TEXT}</div>
          {CONTACT_INFO_TITLE3_SUBTEXT}

          <br />
          <br />

          <div style={{ fontSize: "1.8rem" }}>{CONTACT_INFO_TITLE4_TEXT}</div>
          {CONTACT_INFO_TITLE4_SUBTEXT}

          <Row style={{ marginTop: "20px" }}>
            <Col md={3} sm={6} xs={10} className="contact-info-card">
              <h3>{CONTACT_INFO_VISIT_LOCATION_TEXT}</h3>
              {contact.location}
            </Col>

            <Col md={3} sm={6} xs={10} className="contact-info-card">
              <h3>{CONTACT_INFO_CALL_US_TEXT}</h3>
              {contact.phone}
            </Col>

            <Col md={3} sm={6} xs={10} className="contact-info-card">
              <h3>{CONTACT_INFO_EMAIL_US_TEXT}</h3>
              {contact.email}
            </Col>

            <Col md={3} sm={6} xs={10} className="contact-info-card">
              <h3>{CONTACT_INFO_SALON_HOURS_TEXT}</h3>
              <ul>
                {contact.hours.map((time) => (
                  <li key={time}>{time}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>

      <div style={{ marginTop: "20px" }}>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
