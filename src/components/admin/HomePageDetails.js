import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loading } from "../Loading.js";
import { NavBar } from "../NavBar.js";
import HomepageService from "../../api/homepage.service.js";

export const HomePageDetails = () => {
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

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState(formInitialDetails);

  const updateHomepageDetailsMutation = useMutation({
    mutationFn: HomepageService.updateHomepageDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homepageDetails"] });
    },
  });

  const updateHomepageDetailsEdit = () => {
    const id = homepageDetails[0]._id;
    // updateHomepageDetailsMutation.mutate({ id, access_token, ...formDetails });  // **AUTH0 access token not functional yet**
    updateHomepageDetailsMutation.mutate({ id, ...formDetails });
  };

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.entries(formDetails).forEach(([key, value]) => {
      if (!value) {
        formDetails[key] = homepageDetails[0][key];
      }
    });
    updateHomepageDetailsEdit();
  };

  let {
    isLoading,
    isError,
    data: homepageDetails,
    error,
  } = useQuery({
    queryKey: ["homepageDetails"],
    queryFn: HomepageService.getHomepageDetails,
  });

  const handleCancel = () => {
    navigate("/");
  };

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          {/* <Col size={12} md={6}> */}
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Update Homepage Details</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      {/* <Col size={12} sm={6} className="px-1"> */}
                      {/* <Col lg={12} className="px-1" style={{ display: "flex"}}> */}
                      <Col lg={12} className="px-1">
                        {/* <div style={{ marginRight: "10px", position: "relative", top: "25%" }}>Headline: </div> */}
                        <div>Headline: </div>
                        <input
                          type="text"
                          value={
                            formDetails.headline || homepageDetails[0].headline
                          }
                          placeholder={
                            homepageDetails && homepageDetails[0].headline
                          }
                          onChange={(e) =>
                            onFormUpdate("headline", e.target.value)
                          }
                        />
                      </Col>
                      <Col lg={12} className="px-1">
                        <div>Headline Sub M: </div>
                        <input
                          type="text"
                          value={
                            formDetails.headlineSubMsg ||
                            homepageDetails[0].headlineSubMsg
                          }
                          placeholder={
                            homepageDetails && homepageDetails[0].headlineSubMsg
                          }
                          onChange={(e) =>
                            onFormUpdate("headlineSubMsg", e.target.value)
                          }
                        />
                      </Col>
                      <Col lg={12} className="px-1">
                        <div>Services Headline</div>
                        <input
                          type="email"
                          value={
                            formDetails.servicesHeadline ||
                            homepageDetails[0].servicesHeadline
                          }
                          placeholder={
                            homepageDetails &&
                            homepageDetails[0].servicesHeadline
                          }
                          onChange={(e) =>
                            onFormUpdate("servicesHeadline", e.target.value)
                          }
                        />
                      </Col>
                      <Col lg={12} className="px-1">
                        <div>About Section Headline</div>
                        <input
                          type="email"
                          value={
                            formDetails.aboutHeadline ||
                            homepageDetails[0].aboutHeadline
                          }
                          placeholder={
                            homepageDetails && homepageDetails[0].aboutHeadline
                          }
                          onChange={(e) =>
                            onFormUpdate("aboutHeadline", e.target.value)
                          }
                        />
                      </Col>
                      <Col lg={12} className="px-1">
                        <div>About Section Sub Msg</div>
                        {/* <input type="email" value={formDetails.aboutSubMsg || homepageDetails[0].aboutSubMsg} placeholder={homepageDetails && homepageDetails[0].aboutSubMsg} onChange={(e) => onFormUpdate('aboutSubMsg', e.target.value)} /> */}

                        <textarea
                          style={{ marginTop: "3px" }}
                          rows="6"
                          value={
                            formDetails.aboutSubMsg ||
                            homepageDetails[0].aboutSubMsg
                          }
                          onChange={(e) =>
                            onFormUpdate("aboutSubMsg", e.target.value)
                          }
                        ></textarea>
                      </Col>
                      <Col lg={12} className="px-1">
                        <div>About Image</div>
                        <input
                          type="email"
                          value={
                            formDetails.aboutImage ||
                            homepageDetails[0].aboutImage
                          }
                          placeholder={
                            homepageDetails && homepageDetails[0].aboutImage
                          }
                          onChange={(e) =>
                            onFormUpdate("aboutImage", e.target.value)
                          }
                        />
                      </Col>
                      <Col lg={12} className="px-1">
                        <div>About Section Video Link</div>
                        <input
                          type="email"
                          value={
                            formDetails.aboutVideoLink ||
                            homepageDetails[0].aboutVideoLink
                          }
                          placeholder={
                            homepageDetails && homepageDetails[0].aboutVideoLink
                          }
                          onChange={(e) =>
                            onFormUpdate("aboutVideoLink", e.target.value)
                          }
                        />
                      </Col>
                      <Col lg={12} className="px-1">
                        <div>Stylists Section Headline</div>
                        <input
                          type="email"
                          value={
                            formDetails.stylistsHeadline ||
                            homepageDetails[0].stylistsHeadline
                          }
                          placeholder={
                            homepageDetails &&
                            homepageDetails[0].stylistsHeadline
                          }
                          onChange={(e) =>
                            onFormUpdate("stylistsHeadline", e.target.value)
                          }
                        />
                      </Col>
                      <Col lg={12} className="px-1">
                        <div>Stylists Section Sub Msg</div>
                        <input
                          type="email"
                          value={
                            formDetails.stylistsSubMsg ||
                            homepageDetails[0].stylistsSubMsg
                          }
                          placeholder={
                            homepageDetails && homepageDetails[0].stylistsSubMsg
                          }
                          onChange={(e) =>
                            onFormUpdate("stylistsSubMsg", e.target.value)
                          }
                        />
                      </Col>
                      <Col lg={12} className="px-1">
                        <div>Service Details Section Headline</div>
                        <input
                          type="email"
                          value={
                            formDetails.serviceDetailsHeadline ||
                            homepageDetails[0].serviceDetailsHeadline
                          }
                          placeholder={
                            homepageDetails &&
                            homepageDetails[0].serviceDetailsHeadline
                          }
                          onChange={(e) =>
                            onFormUpdate(
                              "serviceDetailsHeadline",
                              e.target.value
                            )
                          }
                        />
                      </Col>
                      <Col lg={12} className="px-1">
                        <div>Service Details Section Sub Msg</div>
                        <input
                          type="email"
                          value={
                            formDetails.serviceDetailsSubMsg ||
                            homepageDetails[0].serviceDetailsSubMsg
                          }
                          placeholder={
                            homepageDetails &&
                            homepageDetails[0].serviceDetailsSubMsg
                          }
                          onChange={(e) =>
                            onFormUpdate("serviceDetailsSubMsg", e.target.value)
                          }
                        />
                      </Col>
                      <Col lg={12} className="px-1">
                        <div>Contact Section Headline</div>
                        <input
                          type="tel"
                          value={
                            formDetails.contactHeadline ||
                            homepageDetails[0].contactHeadline
                          }
                          placeholder={
                            homepageDetails &&
                            homepageDetails[0].contactHeadline
                          }
                          onChange={(e) =>
                            onFormUpdate("contactHeadline", e.target.value)
                          }
                        />
                      </Col>
                      <Col lg={12} className="px-1">
                        <div>Contact Section Sub Msg</div>
                        <input
                          type="tel"
                          value={
                            formDetails.contactSubMsg ||
                            homepageDetails[0].contactSubMsg
                          }
                          placeholder={
                            homepageDetails && homepageDetails[0].contactSubMsg
                          }
                          onChange={(e) =>
                            onFormUpdate("contactSubMsg", e.target.value)
                          }
                        />
                      </Col>

                      <Col size={12} className="px-1">
                        {/* <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea> */}
                        {/* <button type="submit"><span>{buttonText}</span></button> */}
                        {/* <button onClick={handleSubmit}><span>{buttonText}</span></button> */}
                        <button
                          style={{ marginRight: "20px" }}
                          onClick={handleSubmit}
                        >
                          <span>Update</span>
                        </button>
                        <button onClick={handleCancel}>
                          <span>Cancel</span>
                        </button>
                      </Col>
                      {/* {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    } */}
                    </Row>
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
