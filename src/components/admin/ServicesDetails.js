import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { NavBar } from "../NavBar.js";
import { Loading } from "../Loading.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import { getServiceDetails } from "../../api/index.js";

export const ServicesDetails = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // const access_token = useAuth0().getAccessTokenSilently();

  const formInitialDetails = {
    headline: "",
    headlineSubMsg: "",
    servicesHeadline: "",
    servicesSubMsg: "",
    aboutHeadline: "",
    aboutSubMsg: "",
    aboutImage: "",
    aboutVideoLink: "",
    stylistsHeadline: "",
    stylistsSubMsg: "",
    serviceDetailsHeadline: "",
    serviceDetailsSubMsg: "",
    contactHeadline: "",
    contactSubMsg: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Edit");

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    navigate(`/admin/service-edit/${id}`, { state: { id: id } });
  };

  let {
    isLoading,
    isError,
    data: servicesInfo,
    error,
  } = useQuery({
    queryKey: ["servicesInfo"],
    queryFn: getServiceDetails, // fetch the posts using the async call
    // onSuccess: (data) => setBannerDetails(data),
  });

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    <section className="contact">
      <NavBar />

      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          {/* <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col> */}
          {/* <Col size={12} md={6}> */}
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Update Services Details</h2>
                  <form>
                    {servicesInfo &&
                      servicesInfo.map((service, idx) => {
                        return (
                          <Row>
                            <Col lg={2} className="px-1">
                              <div>{service.title}</div>
                              {/* <input placeholder={service.title} /> */}
                              <img
                                src={require("../../" + service.image)}
                              ></img>
                              {/* <input type="text" value={f} placeholder={} onChange={(e) => onFormUpdate('headline', e.target.value)} /> */}
                            </Col>
                            <Col size={12} className="px-1">
                              {/* <textarea
                              readonly
                                style={{ marginTop: "25px" }}
                                rows="6"
                                placeholder={service.description}
                              ></textarea> */}
                              <div
                                style={{
                                  border: "1px solid rgba(255, 255, 255, 0.5)",
                                  marginTop: "25px",
                                  borderRadius: "25px",
                                  padding: "20px",
                                }}
                              >
                                {service.description}
                              </div>

                              <button
                                onClick={(e) => handleEdit(e, service._id)}
                              >
                                <span>{buttonText}</span>
                              </button>
                              {/* <button onClick={handleDelete}><span>{deleteBtnText}</span></button> */}
                            </Col>
                          </Row>
                        );
                      })}
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

      {/* <Footer /> */}
    </section>
  );
};