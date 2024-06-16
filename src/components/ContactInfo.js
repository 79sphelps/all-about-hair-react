// import meter1 from "../assets/img/meter1.svg";
// import meter2 from "../assets/img/meter2.svg";
// import meter3 from "../assets/img/meter3.svg";
import team1 from "../assets/img/img_5.jpg";
import team2 from "../assets/img/img_7.jpg";
import team3 from "../assets/img/person_1.jpg";
import team4 from "../assets/img/person_4.jpg";
// import team5 from "../assets/img/person_4.jpeg"

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png";

import { Container, Row, Col } from "react-bootstrap";
import { TeamCard } from "./TeamCard";

export const ContactInfo = () => {
  //   const responsive = {
  //     superLargeDesktop: {
  //       // the naming can be any, depends on you.
  //       breakpoint: { max: 4000, min: 3000 },
  //       items: 5,
  //     },
  //     desktop: {
  //       breakpoint: { max: 3000, min: 1024 },
  //       items: 3,
  //     },
  //     tablet: {
  //       breakpoint: { max: 1024, min: 464 },
  //       items: 2,
  //     },
  //     mobile: {
  //       breakpoint: { max: 464, min: 0 },
  //       items: 1,
  //     },
  //   };

  return (
    <section className="skill" id="contact-info">
      <Container fluid className="contact-info-section">
        {/* <Particle /> */}
        <Container>
          <h1 className="project-heading">Salon Information</h1>
          <p style={{ color: "white", marginTop: "0", marginBottom: "0" }}>
            An experienced team member is almost always available during salon hours. 
            <br/><br/>
            <h3>Cuts</h3>
            Whether you're in need of a clean-up, a new style, or a gender-affirming transformation, we've got you covered. Our experienced stylists are here for all your haircut needs. 
            <br/><br/>
            <h3>Coloring</h3>
            From subtle to fantasy, our experienced stylists can give you the color you've been dreaming of. Need a little inspiration? Book a color consultation with a stylist and we will help you on your color journey.
            <br/><br/>
            <h3>A-La-Carte</h3>
            We offer a variety of a-la-carte services, from hair treatments and styling to beard care, we have all the cutting-edge services you need!
          </p>
          <Row style={{ justifyContent: "center", marginBottom: "0px" }}>
            <Col md={3} className="contact-info-card">
              <h3>Visit Our Salon</h3>
              <p>9895 SE Sunnyside Rd, Ste B, Happy Valley, OR 97015</p>
            </Col>

            <Col md={3} className="contact-info-card">
              <h3>Call Us</h3>
              <p>(503) 305-7152</p>
            </Col>

            <Col md={3} className="contact-info-card">
              <h3>Email Us</h3>
              <p>admin@allabouthair.com</p>
            </Col>

            <Col md={3} className="contact-info-card">
              <h3>Salon Hours</h3>
              <ul>
                <li>Mon: 10:30am - 7:00pm</li>
                <li>Tues: Closed</li>
                <li>Wed: 10:30am - 7:00pm</li>
                <li>Thur: 10:30am - 7:00pm</li>
                <li>Fri: 10:30am - 7:00pm</li>
                <li>Sat: 10:30am - 7:00pm</li>
                <li>Sun: 11:30am - 5:00pm</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
};
