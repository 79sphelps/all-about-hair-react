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

import { useQuery } from "@tanstack/react-query";
import { getTeamDetails, getHomepageDetails } from "../api/index.js";

export const Team = () => {

  let {
    isLoading,
    isError,
    data: homepageInfo,
    error,
  } = useQuery({
    queryKey: ["homepageInfo"],
    queryFn: getHomepageDetails, // fetch the posts using the async call
    // onSuccess: (data) => setBannerDetails(data),
  });

  let {
    isLoading2,
    isError2,
    data: teamInfo,
    error2,
  } = useQuery({
    queryKey: ["teamInfo"],
    queryFn: getTeamDetails, // fetch the posts using the async call
    // onSuccess: (data) => setBannerDetails(data),
  });

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (isLoading || isLoading2) return "loading...";
  if (isError) return `Error: ${error.message}`;
  if (isError2) return `Error: ${error2.message}`;


  return (
    // <section className="skill" id="team">
    //     <div className="container">
    //         <div className="row">
    //             <div className="col-12">
    //                 <div className="skill-bx wow zoomIn">
    //                     <h2>Experienced Stylists</h2>
    //                     <p>Local stylists who love what they do and are able to service their clients directly from our salon.</p>
    //                     <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
    //                         <div className="item">
    //                             {/* <img src={meter1} alt="Image" /> */}
    //                             <img src={team1} alt="Image" />
    //                             <h5>Web Development</h5>
    //                         </div>
    //                         <div className="item">
    //                             {/* <img src={meter2} alt="Image" /> */}
    //                             <img src={team2} alt="Image" />
    //                             <h5>Brand Identity</h5>
    //                         </div>
    //                         <div className="item">
    //                             {/* <img src={meter3} alt="Image" /> */}
    //                             <img src={team3} alt="Image" />
    //                             <h5>Logo Design</h5>
    //                         </div>
    //                         <div className="item">
    //                             {/* <img src={meter1} alt="Image" /> */}
    //                             <img src={team4} alt="Image" />
    //                             <h5>Web Development</h5>
    //                         </div>
    //                     </Carousel>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     <img className="background-image-left" src={colorSharp} alt="Image" />
    // </section>

    <section className="skill" id="team" >
    <Container fluid className="team-section" >
      {/* <Particle /> */}
      <Container>

        <div style={{ marginLeft: "7px" }}>
          <h1 className="project-heading">
          {/* Experienced Stylists */}
          { homepageInfo && homepageInfo[0].stylistsHeadline }
          </h1>
          {/* <p style={{ color: "white" }}> */}
          
          {/* Local stylists who love what they do and are able to service their clients directly from our salon. */}
          { homepageInfo && homepageInfo[0].stylistsSubMsg }
          </div>
          {/* </p> */}

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

          { teamInfo && teamInfo.slice(1, teamInfo.length).map((team) => {
            return (<Col md={3} className="project-card">
              <TeamCard
                imgPath={require('../' + team.photo)}
                title={team.name}
                description={team.role.split(" ").join("-")}
              />
            </Col>)
          })}

          {/* <Col md={3} className="project-card">
            <TeamCard
              imgPath={team1}
              isBlog={false}
              title="Ana Nguyen"
              description="Local Stylist"
            />
          </Col>

          <Col md={3} className="project-card">
            <TeamCard
              imgPath={team2}
              isBlog={false}
              title="Rodney Cooper"
              description="Local Stylist"
            />
          </Col>

          <Col md={3} className="project-card">
            <TeamCard
              imgPath={team3}
              isBlog={false}
              title="Dora Walker"
              description="Local Stylist"
            />
          </Col>

          <Col md={3} className="project-card">
            <TeamCard
              imgPath={team4}
              isBlog={false}
              title="Aron Hart"
              description="Local Stylist"
            />
          </Col> */}

        </Row>
      </Container>
    </Container>
    </section>
  );
};
