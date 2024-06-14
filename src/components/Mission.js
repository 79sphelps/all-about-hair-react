import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Particle from "../Particle";

// import Github from "./Github";
// import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
// import laptopImg from "../../assets/img/about.png";
import laptopImg from "../assets/img/about-img.jpg";
// import Toolstack from "./Toolstack";

export const Mission = () => {
  return (
    <section id="mission">
    {/* <Container fluid className="about-section"> */}
    <Container fluid className="mission-section">
      {/* <Particle /> */}
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }} className="animate__animated animate__fadeInLeft">
              {/* Know Who <strong className="purple">I'M</strong> */}
              We Believe that Interior beautifies the Total Architecture
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>

        {/* <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1> */}

        {/* <Techstack /> */}

        {/* <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1> */}

        {/* <Toolstack /> */}

        {/* <Github /> */}
      </Container>
    </Container>
    </section>
  );
}

// export default Mission;
