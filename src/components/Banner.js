import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import TrackVisibility from "react-on-screen";
import { useQuery } from "@tanstack/react-query";
import "animate.css";
import HomepageService from "../api/homepage.service.js";
import Loading from "./Loading";
import headerImg from "../assets/img/header-img-min.png";

const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  // const [index, setIndex] = useState(1);
  const period = 2000;
  const toRotate = [
    "Special Occasions",
    "All Occasions",
    "Defining Unique You!",
  ];

  const {
    isLoading,
    isError,
    data: bannerInfo,
    error,
  } = useQuery({
    queryKey: ["bannerInfo"],
    queryFn: HomepageService.getHomepageDetails,
  });

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      // setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      // setIndex(1);
      setDelta(500);
    } else {
      // setIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (isLoading || bannerInfo === undefined) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    !isLoading && (
      <section className="banner" id="home">
        <Container>
          <Row className="aligh-items-center">
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__fadeIn" : ""
                    }
                  >
                    <span className="tagline animate__animated animate__bounce">
                      All About Hair
                    </span>
                    {/* <h1>{`Hair Styling is a Must Try Fashion for`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Special Occasions", "All Occasions", "Going to the Dentist" ]'><span className="wrap">{text}</span></span></h1> */}
                    <h1>
                      {`Hair Styling is a Must Try Fashion for`}{" "}
                      <span
                        className="txt-rotate"
                        data-rotate='[ "Special Occasions", "All Occasions", "Defining Unique You!" ]'
                      >
                        <span className="wrap">{text}</span>
                      </span>
                    </h1>
                    {/* <p>At All About Hair, we provide custom salon care at an affordable price.</p> */}
                    <p>{bannerInfo && bannerInfo[0].headlineSubMsg}</p>
                    <button
                      className="animate__animated animate__backInLeft"
                      onClick={() => {
                        document.getElementById("contact").scrollIntoView();
                      }}
                    >
                      Let’s Connect <ArrowRightCircle size={25} />
                    </button>
                  </div>
                )}
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__zoomIn" : ""
                    }
                  >
                    <img src={headerImg} alt="Header Img" />
                  </div>
                )}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
    )
  );
};

export default Banner;
