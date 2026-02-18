import { Col } from "react-bootstrap";
import {
  FOOTER_FOLLOW_US_TEXT,
  FOOTER_FOLLOW_US_SUBTEXT,
  FOOTER_SOCIALS_ARY,
} from "../../lib/data.js";

const FooterFollowUsCol = () => {
  return (
    <Col md="4" className="footer-body">
      <h3>{FOOTER_FOLLOW_US_TEXT}</h3>
      <p>{FOOTER_FOLLOW_US_SUBTEXT}</p>
      <ul className="footer-icons">
        {FOOTER_SOCIALS_ARY.map((item, idx) => (
          <li className="social-icons" key={idx}>
            <a
              href={item.url}
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default FooterFollowUsCol;
