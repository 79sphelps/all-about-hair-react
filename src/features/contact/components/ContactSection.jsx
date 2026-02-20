import { Container, Row, Col } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import Loading from "../../../ui/feedback/LoadingSpinner";
import ContactForm from "./ContactForm";
import { useContactInfo } from "../hooks/useContactInfo";
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
} from "../../../lib/data";

const ContactSection = () => {
  const { data, isLoading, isError, error } = useContactInfo();

  if (isLoading) return <Loading />;
  if (isError) return <div role="alert">Error: {error.message}</div>;

  const contact = data[0];

  return (
    <section className="skill" aria-labelledby="contact-heading"
      aria-describedby="contact-subtitle">
      <Container fluid className="contact-info-section">
        <Container>
          <header>
            <h2 id="contact-heading" className="project-heading">
              {CONTACT_INFO_TITLE_TEXT}
            </h2>
            <p id="contact-subtitle" style={{ color: "white", marginBottom: "20px" }}>
              {CONTACT_INFO_SUBTITLE_TEXT}
            </p>
          </header>

          <section aria-labelledby="contact-section-1">
            <h3 id="contact-section-1" style={{ fontSize: "1.8rem" }}>
              {CONTACT_INFO_TITLE2_TEXT}
            </h3>
            <p>{CONTACT_INFO_TITLE2_SUBTEXT}</p>
          </section>

          <section aria-labelledby="contact-section-2">
            <h3 id="contact-section-2" style={{ fontSize: "1.8rem" }}>
              {CONTACT_INFO_TITLE3_TEXT}
            </h3>
            <p>{CONTACT_INFO_TITLE3_SUBTEXT}</p>
          </section>

          <section aria-labelledby="contact-section-3">
            <h3 id="contact-section-3" style={{ fontSize: "1.8rem" }}>
              {CONTACT_INFO_TITLE4_TEXT}
            </h3>
            <p>{CONTACT_INFO_TITLE4_SUBTEXT}</p>
          </section>

          <Row as="section" aria-label="Contact details" style={{ marginTop: "20px" }}>
            <Col md={3} sm={6} xs={10} className="contact-info-card">
              <h3>{CONTACT_INFO_VISIT_LOCATION_TEXT}</h3>
              <address>{contact.location}</address>
            </Col>

            <Col md={3} sm={6} xs={10} className="contact-info-card">
              <h3>{CONTACT_INFO_CALL_US_TEXT}</h3>
              <p>
                <a href={`tel:${contact.phone}`} aria-label={`Call ${contact.phone}`}>
                  {contact.phone}
                </a>
              </p>
            </Col>

            <Col md={3} sm={6} xs={10} className="contact-info-card">
              <h3>{CONTACT_INFO_EMAIL_US_TEXT}</h3>
              <p>
                <a href={`mailto:${contact.email}`} aria-label={`Email ${contact.email}`}>
                  {contact.email}
                </a>
              </p>
            </Col>

            <Col md={3} sm={6} xs={10} className="contact-info-card">
              <h3>{CONTACT_INFO_SALON_HOURS_TEXT}</h3>
              <ul aria-label="Salon hours">
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

export default ContactSection;
