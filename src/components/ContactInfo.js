// import meter1 from "../assets/img/meter1.svg";
// import meter2 from "../assets/img/meter2.svg";
// import meter3 from "../assets/img/meter3.svg";
// import team1 from "../assets/img/img_5.jpg";
// import team2 from "../assets/img/img_7.jpg";
// import team3 from "../assets/img/person_1.jpg";
// import team4 from "../assets/img/person_4.jpg";
// import team5 from "../assets/img/person_4.jpeg"

// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import arrow1 from "../assets/img/arrow1.svg";
// import arrow2 from "../assets/img/arrow2.svg";
// import colorSharp from "../assets/img/color-sharp.png";

import { Container, Row, Col } from "react-bootstrap";
// import { TeamCard } from "./TeamCard";

import { useQuery } from "@tanstack/react-query";
import { getContactInfo } from "../api/index.js";

import { Loading } from "./Loading.js";

export const ContactInfo = () => {
  let {
    isLoading,
    isError,
    data: contactInfo,
    error,
  } = useQuery({
    queryKey: ["contactInfo"],
    queryFn: getContactInfo, // fetch the posts using the async call
  });

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    !isLoading && (
      <section className="skill" id="contact-info">
        <Container fluid className="contact-info-section">
          {/* <Particle /> */}
          <Container>
            <h1 className="project-heading">Salon Information</h1>
            <p style={{ color: "white", marginTop: "0", marginBottom: "20px" }}>
              An experienced team member is almost always available during salon
              hours.
            </p>
            <br />
            <div style={{ fontSize: "1.8rem" }}>Cuts</div>
            Whether you're in need of a clean-up, a new style, or a
            gender-affirming transformation, we've got you covered. Our
            experienced stylists are here for all your haircut needs.
            <br />
            <br />
            <div style={{ fontSize: "1.8rem" }}>Coloring</div>
            From subtle to fantasy, our experienced stylists can give you the
            color you've been dreaming of. Need a little inspiration? Book a
            color consultation with a stylist and we will help you on your color
            journey.
            <br />
            <br />
            <div style={{ fontSize: "1.8rem" }}>A-La-Carte</div>
            We offer a variety of a-la-carte services, from hair treatments and
            styling to beard care, we have all the cutting-edge services you
            need!
            {contactInfo && (
              // <Row style={{ justifyContent: "center", marginBottom: "0px", marginTop: "20px" }}>
              <Row style={{ marginBottom: "0px", marginTop: "20px" }}>
                <Col md={3} sm={6} xs={10} className="contact-info-card">
                  <h3>Visit Our Salon</h3>
                  {/* <p>9895 SE Sunnyside Rd, Ste B, Happy Valley, OR 97015</p> */}
                  {contactInfo[0].location}
                </Col>

                <Col md={3} sm={6} xs={10} className="contact-info-card">
                  <h3>Call Us</h3>
                  {/* <p>(503) 305-7152</p> */}
                  {contactInfo[0].phone}
                </Col>

                <Col md={3} sm={6} xs={10} className="contact-info-card">
                  <h3>Email Us</h3>
                  {/* <p>admin@allabouthair.com</p> */}
                  {contactInfo[0].email}
                </Col>

                <Col md={3} sm={6} xs={10} className="contact-info-card">
                  <h3>Salon Hours</h3>
                  <ul>
                    {contactInfo[0].hours.map((time) => {
                      return <li key={time}>{time}</li>;
                    })}
                  </ul>
                </Col>

                {/* <Col md={3} sm={6} xs={10} className="contact-info-card">
              <h3>Visit Our Salon</h3>
              <p>9895 SE Sunnyside Rd, Ste B, Happy Valley, OR 97015</p>
            </Col>

            <Col md={3} sm={6} xs={10} className="contact-info-card">
              <h3>Call Us</h3>
              <p>(503) 305-7152</p>
            </Col>

            <Col md={3} sm={6} xs={10} className="contact-info-card">
              <h3>Email Us</h3>
              <p>admin@allabouthair.com</p>
            </Col>

            <Col md={3} sm={6} xs={10} className="contact-info-card">
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
            </Col> */}
              </Row>
            )}
          </Container>
        </Container>
      </section>
    )
  );
};
