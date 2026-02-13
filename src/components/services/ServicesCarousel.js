import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import team1 from "../../assets/img/img_5.jpg";
import team2 from "../../assets/img/img_7.jpg";
import team3 from "../../assets/img/person_1.jpg";
import team4 from "../../assets/img/person_4.jpg";
import colorSharp from "../../assets/img/color-sharp.png";

const ServicesCarousel = () => {
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

  return (
    <section className="skill" id="prices" aria-labelledby="services-carousel-heading">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2 id="services-carousel-heading">
                Experienced Stylists
              </h2>
              <p>
                Local stylists who love what they do and are able to service
                their clients directly from our salon.
              </p>
              <Carousel
                responsive={responsive}
                infinite
                className="owl-carousel owl-theme skill-slider"
                keyBoardControl
                aria-label="Stylists showcase carousel"
              >
                {[team1, team2, team3, team4].map((img, index) => (
                  <div key={index} className="item">
                    <img
                      src={img}
                      alt={`Stylist showcase ${index + 1}`}
                    />
                    <h3>Stylist {index + 1}</h3>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img
        className="background-image-left"
        src={colorSharp}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
};

export default ServicesCarousel;
