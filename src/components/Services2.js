import React, { useState, useEffect }  from "react";
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



  const [service, setService] = useState([]);


  const setServiceDetails = (service) => {
    // console.log('service: ', service);

    switch(service) {
      case "haircutAndStyle": 
        setService(serviceDetailsFull.haircutAndStyle);
        break;
      default: break;
    }

  }




  const serviceDetailsFull = {
    waxing: [
      {
        type: "Brow Shaping",
        price: "$20",
        description: "description..."
      },
      {
        type: "Lip",
        price: "$10",
        description: "description..."
      },
      {
        type: "Chin",
        price: "$10",
        description: "description..."
      },
      {
        type: "Face (forehead, cheeks, chin)",
        price: "$30",
        description: "description..."
      },
      {
        type: "Nose",
        price: "$10",
        description: "description..."
      },
      {
        type: "Underarm",
        price: "$30",
        description: "description..."
      },
      {
        type: "1/2 Arm",
        price: "$30",
        description: "description..."
      },
      {
        type: "Full Arm",
        price: "$40",
        description: "description..."
      },
      {
        type: "1/2 Leg",
        price: "$40",
        description: "description..."
      },
      {
        type: "Full Leg",
        price: "$60",
        description: "description..."
      },
    ],
    hairExtensions: [
      {
        type: "Fashion Colors (2 ext)",
        price: "$90",
        description: "description..."
      },
      {
        type: "6-8 Week Maintenance",
        price: "$83-$415",
        description: "description..."
      }
    ],
    lashExtensions: [
      {
        type: "Full Set",
        price: "$200",
        description: "description..."
      },
      {
        type: "Lash Fill",
        price: "$60-$95",
        description: "description..."
      },
      {
        type: "Lash Removal",
        price: "$30-$50",
        description: "description..."
      }
    ],
    specialOccasions: [
      {
        type: "Treatment Added (shampoo & blow-dry included)",
        price: "$30",
        description: "description..."
      },
      {
        type: "Glossing Shine",
        price: "$55",
        description: "description..."
      },
      {
        type: "Thermal Style",
        price: "$40-$60",
        description: "description..."
      },
      {
        type: "Updo",
        price: "$45-$75",
        description: "description..."
      },
      {
        type: "Wedding Trial & Updo",
        price: "$130+",
        description: "description..."
      }
    ],
    smoothingService: [
      {
        type: "Short Hair to Medium Length",
        price: "$95-$125",
        description: "description..."
      },
      {
        type: "Long Hair (below collar bone)",
        price: "$125-$150",
        description: "description..."
      }
    ],
    hairColoring: [
      {
        type: "Consultation",
        price: "free",
        description: "description..."
      },
      {
        type: "Full Foil",
        price: "$135+",
        description: "description..."
      },
      {
        type: "Partial Foil",
        price: "$115+",
        description: "description..."
      },
      {
        type: "Balayage or Ombre",
        price: "$140+",
        description: "description..."
      },
      {
        type: "Express Foil (~10 foils)",
        price: "$55+",
        description: "description..."
      },
      {
        type: "Root Color & Foil",
        price: "$140+",
        description: "description..."
      },
      {
        type: "All Over Color & Foil",
        price: "$160+",
        description: "description..."
      },
      {
        type: "All Over Lightening (bleach)",
        price: "$105+",
        description: "description..."
      },
      {
        type: "Bleach Retouch",
        price: "$90",
        description: "description..."
      },
      {
        type: "All Over Color",
        price: "$85+",
        description: "description..."
      },
      {
        type: "Root Touch Up",
        price: "$65",
        description: "description..."
      },
      {
        type: "Each Additional Bowl of Color",
        price: "$20",
        description: "description..."
      }
    ],
    haircutAndStyle: [
      { 
        type: "Women's",
        price: "$40-$70",
        description: "description..."
      },
      {
        type: "Men's",
        price: "$30-$60",
        description: "description..."
      },
      {
        type: "Children (under 12)",
        price: "$25-$55",
        description: "description..."
      },
      {
        type: "Neck Trim",
        price: "$15",
        description: "description..."
      },
      {
        type: "Bang Trim",
        price: "$10",
        description: "description..."
      },
      {
        type: "Wash & Style",
        price: "$25-$55",
        description: "description..."
      }
    ]
  }

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
              service={serviceDetailsFull.smoothingService}
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
              service={serviceDetailsFull.waxing}
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
              service={serviceDetailsFull.hairExtensions}
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
              service={serviceDetailsFull.hairColoring}
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
              service={serviceDetailsFull.haircutAndStyle}
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
              service={serviceDetailsFull.lashExtensions}
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
