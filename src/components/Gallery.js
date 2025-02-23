import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import { Container } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "react-multi-carousel/lib/styles.css";
import ImageService from "../api/gallery.service.js";
import Loading from "./Loading";
import colorSharp from "../assets/img/color-sharp.png";

const Gallery = () => {
  const [imgPath, setImgPath] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setImgPath("");
    setShow(false);
  };
  
  const handleShow = (imgPath) => {
    setImgPath(imgPath);
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

  let {
    isLoading,
    isError,
    data: galleryPics,
    error,
  } = useQuery({
    queryKey: ["galleryPics"],
    queryFn: ImageService.getGalleryImages,
  });

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    !isLoading && (
      <section className="skill" id="gallery">
        <Container fluid className="gallery-section">
          {/* <Container fluid > */}
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="skill-bx wow zoomIn">
                  <h2 style={{ paddingBottom: "10px" }}>Stylings and Cuts</h2>
                  <Carousel
                    responsive={responsive}
                    infinite={true}
                    className="owl-carousel owl-theme skill-slider"
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    // autoPlaySpeed={4000}
                    keyBoardControl={true}
                    // customTransition="all .5"
                    // transitionDuration={2000}
                    containerClass="carousel-container"
                    // removeArrowOnDeviceType={["tablet", "mobile"]}
                    // deviceType={this.props.deviceType}
                    // dotListClass="custom-dot-list-style"
                    // itemClass="carousel-item-padding-40-px"
                  >
                    {galleryPics &&
                      galleryPics.map((pic) => {
                        return (
                          <div key={pic._id} className="item">
                            <img
                              src={require("../" + pic.path)}
                              alt=""
                              style={{ width: "100%" }}
                              onClick={() => handleShow(pic.path)}
                            />
                          </div>
                        );
                      })}
                    <Modal
                      show={show}
                      onHide={handleClose}
                      centered="true"
                      scrollable={true}
                      style={{
                        marginTop: "100px",
                        marginBottom: "75px",
                        height: "90%",
                        width: "90%",
                        marginLeft: "5%",
                      }}
                    >
                      {/* <Modal.Header closeButton>
                        <Modal.Title style={{ color: "black" }}>{props.title}</Modal.Title>
                      </Modal.Header> */}
                      <Modal.Body style={{ color: "black" }}>
                        <Card.Img
                          variant="top"
                          src={require("../" + imgPath)}
                          alt="card-img"
                          // className="teamCardAnimation"
                          // style={{ width: "60%" }}
                          centered="true"
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
          <img className="background-image-left" src={colorSharp} alt="" />
        </Container>
      </section>
    )
  );
};

export default Gallery;