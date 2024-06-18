import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  // AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

export const Footer = () => {
  // let date = new Date();
  // let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>About Us</h3>
          <p>All About Hair is committed to creating a business that allows all staff to be paid a living wage and create careers, not just jobs. Read more about our B Corp Certification.</p>
          <p>Copyright 2018 All About Hair; All rights reserved | This template has been adapted from a template by Colorlib.</p>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Newsletter</h3>
          <p>Stay up-to-date with our latest</p>
        </Col>

        {/* <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} SB</h3>
        </Col> */}

        <Col md="4" className="footer-body">
        <h3>Follow Us</h3>
          <p>Let us be social</p>
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="#home"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiOutlineTwitter />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="#home"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="#home"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>

      </Row>
    </Container>
  );
}
