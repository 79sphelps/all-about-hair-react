import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import HomepageService from "../api/homepage.service.js";
import Loading from "./Loading";
import {
  FOOTER_ABOUT_US_TEXT,
  FOOTER_ABOUT_US_SUBTEXT,
  FOOTER_COPYRIGHT_TEXT,
  FOOTER_FOLLOW_US_TEXT,
  FOOTER_FOLLOW_US_SUBTEXT,
  FOOTER_NEWSLETTER_TEXT,
  FOOTER_NEWSLETTER_SUBTEXT,
  FOOTER_SOCIALS_ARY,
} from "./data";

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
          <Col md="4" className="footer-copywright">
            <h3>{FOOTER_ABOUT_US_TEXT}</h3>
            <p>{FOOTER_ABOUT_US_SUBTEXT}</p>
            <p>{FOOTER_COPYRIGHT_TEXT}</p>
          </Col>
          <Col md="4" className="footer-copywright">
            <h3>{FOOTER_NEWSLETTER_TEXT}</h3>
            <p>{FOOTER_NEWSLETTER_SUBTEXT}</p>
          </Col>
          {/* <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} SB</h3>
          </Col> */}
          <Col md="4" className="footer-body">
            <h3>{FOOTER_FOLLOW_US_TEXT}</h3>
            <p>{FOOTER_FOLLOW_US_SUBTEXT}</p>
            <ul className="footer-icons">
              {FOOTER_SOCIALS_ARY.map((item, idx) => (
                <li className="social-icons">
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
        </Row>
      </Container>
    )
  );
};

export default Footer;
