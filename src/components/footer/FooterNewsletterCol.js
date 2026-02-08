import { Col } from "react-bootstrap";
import {
  FOOTER_NEWSLETTER_TEXT,
  FOOTER_NEWSLETTER_SUBTEXT,
} from "../../lib/data.js";

const FooterNewsletterCol = () => {
  return (
    <Col md="4" className="footer-copywright">
      <h3>{FOOTER_NEWSLETTER_TEXT}</h3>
      <p>{FOOTER_NEWSLETTER_SUBTEXT}</p>
    </Col>
  );
};

export default FooterNewsletterCol;
