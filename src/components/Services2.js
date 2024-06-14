import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Services2Card } from "./Services2Card";
// import Particle from "../Particle";
import leaf from "../assets/img/leaf.png";
import emotion from "../assets/img/emotion.png";
import editor from "../assets/img/codeEditor.png";
import chatify from "../assets/img/chatify.png";
import suicide from "../assets/img/suicide.png";
import bitsOfCode from "../assets/img/blog.png";


import projImg1 from "../assets/img/hair_extensions.png";
import projImg2 from "../assets/img/waxing2.png";
import projImg3 from "../assets/img/hair-extension.png";
import projImg4 from "../assets/img/red_hair.png";
import projImg5 from "../assets/img/haircut_utensils.png";
import projImg6 from "../assets/img/eyelash.png";
import projImg7 from "../assets/img/girl_w_flower.png";

import '../style.css';

export const Services2 = () => {
  return (
    // <section className="project" id="services">
    <section id="services">
    <Container fluid className="services-section">
      {/* <Particle /> */}
      <Container>
        <h1 className="project-heading animate__animated animate__fadeInRight">
        Choose from Among Our Custom Services
        </h1>
        <p style={{ color: "white" }}>
        Services are subject to stylist availability and may change at any time.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <Services2Card
              imgPath={projImg1}
              // isBlog={false}
              title="Smoothing Service"
              description="VoMor Hair Extensions not only add length, but also add volume & fullness. VoMor Extensions are made of high quality Remy hair, collected & manufactured in a humane manner, packaged according to environmental guidelines, and are tape-in & reusable. VoMor Extensions are safe & do not damage the hair."
              // ghLink="https://github.com/soumyajit4419/Chatify"
              // demoLink="https://chatify-49.web.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <Services2Card
              imgPath={projImg2}
              // isBlog={false}
              title="Waxing"
              description="At least 3 weeks of growth is recommend for a waxing service. You may be asked to reschedule if the hair length is insufficient in order to effectively perform the service."
              // ghLink="https://github.com/soumyajit4419/Bits-0f-C0de"
              // demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <Services2Card
              imgPath={projImg3}
              // isBlog={false}
              title="Hair Extensions"
              description="VoMor Hair Extensions not only add length, but also add volume & fullness. VoMor Extensions are made of high quality Remy hair, collected & manufactured in a humane manner, packaged according to environmental guidelines, and are tape-in & reusable. VoMor Extensions are safe & do not damage the hair."
              // ghLink="https://github.com/soumyajit4419/Editor.io"
              // demoLink="https://editor.soumya-jit.tech/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <Services2Card
              imgPath={projImg4}
              // isBlog={false}
              title="Hair Coloring"
              description="AVEDA Full Spectrum Color immerses hair in 97% naturally derived formulas for our Permanent Color & 99% naturally derived formulas for our Deposit-Only Demi-Permanent Color. (A Gloss/Toner is included in all Foil, Double Process, All Over Bleach, Balayage & Ombre services. A Gloss/Toner can be added to a Root Touch Up, if appropriate, for an additional price.)"
              // ghLink="https://github.com/soumyajit4419/Plant_AI"
              // demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <Services2Card
              imgPath={projImg5}
              // isBlog={false}
              title="Haircut & Style"
              description="Custom cuts use same pricing scale. Enjoy a relaxing head, neck & shoulder massage, shampoo & style."
              // ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <Services2Card
              imgPath={projImg6}
              // isBlog={false}
              title="Lash Extensions"
              description="Xtreme Lashes Eyelash Extensions are your ultimate answer for longer, thicker, more beautiful looking eyelashes."
              // ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col>
        </Row>
      </Container>
    </Container>
    </section>
  );
}

// export default Projects;
