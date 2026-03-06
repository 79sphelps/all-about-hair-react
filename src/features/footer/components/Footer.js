import { Container, Row } from "react-bootstrap";
import Loading from "../../../ui/feedback/LoadingSpinner.jsx";
import FooterAboutUsCol from "./FooterAboutUsCol.js";
import FooterFollowUsCol from "./FooterFollowUsCol.js";
import FooterNewsletterCol from "./FooterNewsletterCol.js";
import { useHomePageDetails } from "../../admin/homepage/useHomePageDetails.js";

const Footer = () => {
  const { isLoading, isError, data, error } = useHomePageDetails();

  if (isLoading) return <Loading />;
  if (isError) return <div role="alert">{error.message}</div>;

  return (
    <Container fluid className="footer">
      <Row>
        <FooterAboutUsCol homepageDetails={data} />
        <FooterNewsletterCol homepageDetails={data} />
        <FooterFollowUsCol homepageDetails={data} />
      </Row>
    </Container>
  );
};

export default Footer;