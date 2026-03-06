import FooterColumn from "./FooterColumn";
import {
  FOOTER_FOLLOW_US_TEXT,
  FOOTER_FOLLOW_US_SUBTEXT,
  FOOTER_SOCIALS_ARY,
} from "../../../lib/data";

const FooterFollowUsCol = () => {
  return (
    <FooterColumn
      title={FOOTER_FOLLOW_US_TEXT}
      className="footer-body"
    >
      <p>{FOOTER_FOLLOW_US_SUBTEXT}</p>

      <ul className="footer-icons">
        {FOOTER_SOCIALS_ARY.map((item, idx) => (
          <li key={idx} className="social-icons">
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
    </FooterColumn>
  );
};

export default FooterFollowUsCol;