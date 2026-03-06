import FooterColumn from "./FooterColumn";
import {
  FOOTER_ABOUT_US_TEXT,
  FOOTER_ABOUT_US_SUBTEXT,
  FOOTER_COPYRIGHT_TEXT,
} from "../../../lib/data";

const FooterAboutUsCol = () => {
  return (
    <FooterColumn title={FOOTER_ABOUT_US_TEXT}>
      <p>{FOOTER_ABOUT_US_SUBTEXT}</p>
      <p>{FOOTER_COPYRIGHT_TEXT}</p>
    </FooterColumn>
  );
};

export default FooterAboutUsCol;