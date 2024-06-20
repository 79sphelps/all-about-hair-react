// import meter1 from "../assets/img/meter1.svg";
// import meter2 from "../assets/img/meter2.svg";
// import meter3 from "../assets/img/meter3.svg";
// import g1 from "../assets/img/g1.jpg";
// import g2 from "../assets/img/g2.jpg";
// import g3 from "../assets/img/g3.jpg";
// import g4 from "../assets/img/g4.jpg";
// import g5 from "../assets/img/g5.jpg";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import arrow1 from "../assets/img/arrow1.svg";
// import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png";

import { Container, Row, Col } from "react-bootstrap";
// import ModalImage from "react-modal-image";

import { useQuery } from "@tanstack/react-query";
import { getGalleryImages } from "../api/index.js";

import { Loading } from "./Loading.js";

export const Gallery = () => {
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

  let {
    isLoading,
    isError,
    data: galleryPics,
    error,
  } = useQuery({
    queryKey: ["galleryPics"],
    queryFn: getGalleryImages, // fetch the posts using the async call
    // onSuccess: (data) => setBannerDetails(data),
  });

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (!isLoading && 
    <section className="skill" id="gallery">
      {/* // <section id="gallery"> */}
      <Container fluid className="gallery-section">
        {/* <Container fluid > */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="skill-bx wow zoomIn">
                <h2 style={{ paddingBottom: "10px" }}>Stylings and Cuts</h2>
                {/* <p>Local stylists who love what they do and are able to service their clients directly from our salon.</p> */}
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  className="owl-carousel owl-theme skill-slider"
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                >
                  {
                    galleryPics && galleryPics.map((pic) => {
                      return (
                        <div key={pic._id} className="item">
                          <img src={require("../" + pic.path)} alt="Image" style={{ width: "100%" }}/>
                        </div>
                      )
                    })
                  }

                  {/* <div className="item">
                    <img src={g1} alt="Image" />
                  </div>
                  <div className="item">
                    <img src={g2} alt="Image" />
                  </div>
                  <div className="item">
                    <img src={g3} alt="Image" />
                  </div>
                  <div className="item">
                    <img src={g4} alt="Image" />
                  </div> */}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
      </Container>
    </section>
  );
};
