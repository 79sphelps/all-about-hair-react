import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "animate.css";
import Loading from "../Loading";
import NavBar from "../../ui/NavBar";
// import HomepageService from "../../api/homepage.service.js";

import { useHomePageDetails } from "./hooks/useHomePageDetails";
import { useUpdateHomePageDetails } from "./hooks/useUpdateHomePageDetails";

const HomePageDetails = () => {
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

  // const queryClient = useQueryClient();
  const { data: homepageDetails, isLoading, isError, error } =
    useHomePageDetails();

  const updateHomepageDetailsMutation = useUpdateHomePageDetails();


  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState(formInitialDetails);

  // const updateHomepageDetailsMutation = useMutation({
  //   mutationFn: HomepageService.updateHomepageDetails,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["homepageDetails"] });
  //   },
  // });

  const updateHomepageDetailsEdit = () => {
    const id = homepageDetails[0]._id;
    // updateHomepageDetailsMutation.mutate({ id, access_token, ...formDetails });  // **AUTH0 access token not functional yet**
    updateHomepageDetailsMutation.mutate({ id, ...formDetails });
  };

  const onFormUpdate = (e) => {
    const { name, value } = e.target;
    setFormDetails(values => ({...values, [name]: value}));
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

  // const {
  //   isLoading,
  //   isError,
  //   data: homepageDetails,
  //   error,
  // } = useQuery({
  //   queryKey: ["homepageDetails"],
  //   queryFn: HomepageService.getHomepageDetails,
  // });

  const handleCancel = () => {
    navigate("/");
  };

  if (isLoading || homepageDetails === undefined) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  const FORM_INPUTS_ARRAY = [
    {
      title: "Headline",
      name: "headline",
      value: formDetails.headline || homepageDetails[0].headline,
      placeholder: homepageDetails && homepageDetails[0].headline,
    },
    {
      title: "Headline Sub M",
      name: "headlineSubMsg",
      value: formDetails.headlineSubMsg || homepageDetails[0].headlineSubMsg,
      placeholder: homepageDetails && homepageDetails[0].headlineSubMsg,
    },
    {
      title: "Services Headline",
      name: "servicesHeadline",
      value:
        formDetails.servicesHeadline || homepageDetails[0].servicesHeadline,
      placeholder: homepageDetails && homepageDetails[0].servicesHeadline,
    },
    {
      title: "About Section Headline",
      name: "aboutHeadline",
      value: formDetails.aboutHeadline || homepageDetails[0].aboutHeadline,
      placeholder: homepageDetails && homepageDetails[0].aboutHeadline,
    },
    {
      title: "About Image",
      name: "aboutImage",
      value: formDetails.aboutImage || homepageDetails[0].aboutImage,
      placeholder: homepageDetails && homepageDetails[0].aboutImage,
    },
    {
      title: "About Section Video Link",
      name: "aboutVideoLink",
      value: formDetails.aboutVideoLink || homepageDetails[0].aboutVideoLink,
      placeholder: homepageDetails && homepageDetails[0].aboutVideoLink,
    },
    {
      title: "Stylists Section Headline",
      name: "stylistsHeadline",
      value:
        formDetails.stylistsHeadline || homepageDetails[0].stylistsHeadline,
      placeholder: homepageDetails && homepageDetails[0].stylistsHeadline,
    },
    {
      title: "Stylists Section Sub Msg",
      name: "stylistsSubMsg",
      value: formDetails.stylistsSubMsg || homepageDetails[0].stylistsSubMsg,
      placeholder: homepageDetails && homepageDetails[0].stylistsSubMsg,
    },
    {
      title: "Service Details Section Headline",
      name: "serviceDetailsHeadline",
      value:
        formDetails.serviceDetailsHeadline ||
        homepageDetails[0].serviceDetailsHeadline,
      placeholder: homepageDetails && homepageDetails[0].stylistsSubMsg,
    },
    {
      title: "Service Details Section Sub Msg",
      name: "serviceDetailsSubMsg",
      value:
        formDetails.serviceDetailsSubMsg ||
        homepageDetails[0].serviceDetailsSubMsg,
      placeholder: homepageDetails && homepageDetails[0].serviceDetailsSubMsg,
    },
    {
      title: "Contact Section Headline",
      name: "contactHeadline",
      value: formDetails.contactHeadline || homepageDetails[0].contactHeadline,
      placeholder: homepageDetails && homepageDetails[0].contactHeadline,
    },
    {
      title: "Contact Section Sub Msg",
      name: "contactSubMsg",
      value: formDetails.contactSubMsg || homepageDetails[0].contactSubMsg,
      placeholder: homepageDetails && homepageDetails[0].contactSubMsg,
    },
  ];

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
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
                      {FORM_INPUTS_ARRAY.map((item, idx) => (
                        <Col lg={12} className="px-1" key={idx}>
                          <div>{item.title}: </div>
                          <input
                            type="text"
                            name={item.name}
                            value={item.value}
                            placeholder={item.placeholder}
                            onChange={onFormUpdate}
                          />
                        </Col>
                      ))}

                      <Col lg={12} className="px-1">
                        <div>About Section Sub Msg</div>
                        <textarea
                          style={{ marginTop: "3px" }}
                          name="aboutSubMsg"
                          rows="6"
                          value={
                            formDetails.aboutSubMsg ||
                            homepageDetails[0].aboutSubMsg
                          }
                          onChange={onFormUpdate}
                        ></textarea>
                      </Col>

                      <Col size={12} className="px-1">
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

export default HomePageDetails;
