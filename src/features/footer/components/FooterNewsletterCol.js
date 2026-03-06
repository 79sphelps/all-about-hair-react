import FooterColumn from "./FooterColumn";
import {
  FOOTER_NEWSLETTER_TEXT,
  FOOTER_NEWSLETTER_SUBTEXT,
} from "../../../lib/data";

const FooterNewsletterCol = () => {
  return (
    <FooterColumn title={FOOTER_NEWSLETTER_TEXT}>
      <p>{FOOTER_NEWSLETTER_SUBTEXT}</p>
    </FooterColumn>
  );
};

export default FooterNewsletterCol;