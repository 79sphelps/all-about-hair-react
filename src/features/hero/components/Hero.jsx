import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import TrackVisibility from "react-on-screen";
import "animate.css";
import Loading from "../../../ui/feedback/LoadingSpinner.jsx";
import {
  HERO_TITLE_TEXT,
  HERO_HEADLINE_TEXT,
  HERO_CONNECT_TEXT,
  HERO_ROTATING_TEXT_ARY,
  HERO_IMAGE_PATH,
} from "../../../lib/data.js";
import { useHomePageDetails } from "../../admin/homepage/useHomePageDetails.js";


const Hero = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  const { isLoading, isError, data: bannerInfo, error } = useHomePageDetails();

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
    // eslint-disable-next-line
  }, [text, delta]); // include delta to avoid stale interval timing

  const tick = () => {
    let i = loopNum % HERO_ROTATING_TEXT_ARY.length;
    let fullText = HERO_ROTATING_TEXT_ARY[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prev) => prev / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum((prev) => prev + 1);
      setDelta(500);
    }
  };

  if (isLoading || bannerInfo === undefined) return <Loading />;
  if (isError) return <p role="alert">Error: {error.message}</p>;

  return (
    <section className="banner" id="home" aria-labelledby="hero-heading">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline animate__animated animate__bounce">
                    {HERO_TITLE_TEXT}
                  </span>
                  {/* <h1>
                    {BANNER_HEADLINE_TEXT}{" "}
                    <span
                      className="txt-rotate"
                      data-rotate={BANNER_ROTATING_TEXT_ARY}
                    >
                      <span className="wrap">{text}</span>
                    </span>
                  </h1> */}
                  <h1 id="hero-heading" style={{ height: "130px" }}>
                    {HERO_HEADLINE_TEXT}{" "}
                    <span className="txt-rotate" aria-hidden="true" tabIndex="-1">
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>

                  {/* Screen-reader-only static version of rotating text */}
                  <span className="visually-hidden">
                    {HERO_HEADLINE_TEXT} {HERO_ROTATING_TEXT_ARY.join(", ")}
                  </span>

                  <p>{bannerInfo[0].headlineSubMsg}</p>

                  <button
                    type="button"
                    className="animate__animated animate__backInLeft"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    aria-label="Scroll to contact section"
                  >
                    {HERO_CONNECT_TEXT}
                    <ArrowRightCircle
                      size={25}
                      aria-hidden="true"
                      focusable="false"
                      tabIndex="-1"
                    />
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
                  <img
                    src={HERO_IMAGE_PATH}
                    alt="Illustration representing our services"
                    loading="eager"
                  />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
