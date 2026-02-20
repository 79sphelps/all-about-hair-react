import { Col } from "react-bootstrap";
import {
  FOOTER_ABOUT_US_TEXT,
  FOOTER_ABOUT_US_SUBTEXT,
  FOOTER_COPYRIGHT_TEXT,
} from "../../../lib/data.js";

const FooterAboutUsCol = () => {
  return (
    <Col md="4" className="footer-copywright">
      <h3>{FOOTER_ABOUT_US_TEXT}</h3>
      <p>{FOOTER_ABOUT_US_SUBTEXT}</p>
      <p>{FOOTER_COPYRIGHT_TEXT}</p>
    </Col>
  );
};

export default FooterAboutUsCol;
