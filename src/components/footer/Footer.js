import { Container, Row } from "react-bootstrap";
import Loading from "../Loading.js";
import FooterAboutUsCol from "./FooterAboutUsCol.js";
import FooterFollowUsCol from "./FooterFollowUsCol.js";
import FooterNewsletterCol from "./FooterNewsletterCol.js";
// import FooterCopyrightCol from "./FooterCopyrightCol.js";
import { useHomePageDetails } from "../admin/hooks/useHomePageDetails"; // adjust the path as needed

const Footer = () => {
  const {
    isLoading,
    isError,
    data: homepageDetails,
    error,
  } = useHomePageDetails();

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    <Container fluid className="footer">
      <Row>
        {/* You can pass homepageDetails as props if needed */}
        <FooterAboutUsCol homepageDetails={homepageDetails} />
        <FooterNewsletterCol homepageDetails={homepageDetails} />
        {/* <FooterCopyrightCol /> */}
        <FooterFollowUsCol homepageDetails={homepageDetails} />
      </Row>
    </Container>
  );
};

export default Footer;
