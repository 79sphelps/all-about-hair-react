import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { NavBar } from "../NavBar.js";
import { Loading } from "../Loading.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import { getServiceDetails, deleteService } from "../../api/index.js";

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
  });

  const deleteServiceMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteService"] });
      // navigate("/");
    },
  });

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteServiceMutation.mutate(id);
  };

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
                          <Row key={service._id}>
                            <Col lg={2} className="px-1">
                              <div>{service.title}</div>
                              <img
                                src={require("../../" + service.image)}
                              ></img>
                            </Col>
                            <Col size={12} className="px-1">
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
                                style={{ marginRight: "20px" }}
                                onClick={(e) => handleEdit(e, service._id)}
                              >
                                <span>{buttonText}</span>
                              </button>
                              <button
                                onClick={(e) => handleDelete(e, service._id)}
                              >
                                <span>Delete</span>
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
