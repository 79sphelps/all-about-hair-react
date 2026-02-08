
import { Container, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import HomepageService from "../../services/homepage.service.js";
import Loading from "../Loading.js";
import FooterAboutUsCol from "./FooterAboutUsCol.js";
import FooterFollowUsCol from "./FooterFollowUsCol.js";
import FooterNewsletterCol from "./FooterNewsletterCol.js";
// import FooterCopyrightCol from "./FooterCopyrightCol.js";

const Footer = () => {
  const {
    isLoading,
    isError,
    // data: bannerInfo,
    error,
  } = useQuery({
    queryKey: ["bannerInfo"],
    queryFn: HomepageService.getHomepageDetails,
  });

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    !isLoading && (
      <Container fluid className="footer">
        <Row>
          <FooterAboutUsCol />
          <FooterNewsletterCol />
          {/* <FooterCopyrightCol /> */}
          <FooterFollowUsCol />
        </Row>
      </Container>
    )
  );
};

export default Footer;
