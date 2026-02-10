import { useState } from "react";
import Carousel from "react-multi-carousel";
import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "react-multi-carousel/lib/styles.css";
import { useGalleryImages } from "./hooks/useGalleryImages";
import Loading from "../Loading";
import colorSharp from "../../assets/img/color-sharp.png";

const Gallery = () => {
  const [imgPath, setImgPath] = useState("");
  const [show, setShow] = useState(false);

  const { data: galleryPics, isLoading, isError, error } =
    useGalleryImages();

  const handleClose = () => {
    setImgPath("");
    setShow(false);
  };

  const handleShow = (path) => {
    setImgPath(path);
    setShow(true);
  };

  const responsive = {
    superLargeDesktop: {
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

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    <section className="skill" id="gallery">
      <Container fluid className="gallery-section">
        <div className="container">
          <div className="skill-bx wow zoomIn">
            <h2 style={{ paddingBottom: "10px" }}>Stylings and Cuts</h2>

            <Carousel
              responsive={responsive}
              infinite
              swipeable
              draggable
              keyBoardControl
              className="owl-carousel owl-theme skill-slider"
            >
              {galleryPics.map((pic) => (
                <div key={pic._id} className="item">
                  <img
                    src={require("../../" + pic.path)}
                    alt=""
                    style={{ width: "100%" }}
                    onClick={() => handleShow(pic.path)}
                  />
                </div>
              ))}
            </Carousel>

            <Modal
              show={show}
              onHide={handleClose}
              centered
              scrollable
              style={{
                marginTop: "100px",
                marginBottom: "75px",
                height: "90%",
                width: "90%",
                marginLeft: "5%",
              }}
            >
              <Modal.Body>
                <Card.Img
                  variant="top"
                  src={require("../../" + imgPath)}
                  alt="gallery"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <img className="background-image-left" src={colorSharp} alt="" />
      </Container>
    </section>
  );
};

export default Gallery;
