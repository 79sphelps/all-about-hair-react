import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { NavBar } from "../NavBar.js";
// import { Footer } from "../Footer.js";
import { Loading } from "../Loading.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceDetail, updateServiceDetails } from "../../api/index.js";
// import { useAuth0 } from "@auth0/auth0-react";

import { useLocation } from "react-router-dom";

export const ServiceEdit = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  // const access_token = useAuth0().getAccessTokenSilently();

  let formInitialDetails = {
    title: "",
    image: "",
    description: "",
    pricing: [],
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Update");
  // const [resetText, setResetText] = useState('Reset');
  // const [status, setStatus] = useState({});

  const updateServiceDetailsMutation = useMutation({
    mutationFn: updateServiceDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceDetails"] });
      // navigate("/");
    },
  });

  const updateServiceDetailsEdit = () => {
    const id = serviceDetails._id;
    updateServiceDetailsMutation.mutate({ id, ...formDetails });
  };

  const onFormUpdate = (category, value, idx) => {
    console.log("cat: ", category);
    console.log("val: ", value);
    console.log("idx: ", idx);

    if (category === "price" || category === "type" || idx >= 0) {
      if (!formDetails.pricing[idx]) {
        formDetails.pricing.push({ type: "", price: "", description: "" });
      }
      formDetails.pricing[idx][category] = value;
    } else {
      setFormDetails({
        ...formDetails,
        [category]: value,
      });
    }

    console.log("---updated---");
    console.log(formDetails);
  };

  const updateFormDetails = (data) => {
    console.log("--- update data ---");
    console.log(data);
    setFormDetails(data)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Object.entries(formDetails).forEach(([key, value]) => {
    //   if (!value) {
    //     formDetails[key] = homepageDetails[0][key]
    //   }
    // })
    updateServiceDetailsEdit();
  };

  // const handleReset = (e) => {
  //   e.preventDefault();
  //   setFormDetails(formInitialDetails)
  //   setButtonText('Send')
  // }

  let {
    isLoading,
    isError,
    data: serviceDetails,
    error,
  } = useQuery({
    queryKey: ["serviceDetails", location.state.id],
    queryFn: () => getServiceDetail(location.state.id), // fetch the posts using the async call
  });

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  //   console.log(serviceDetails)
  //   console.log(formDetails)
  if (!formDetails.title) {
    updateFormDetails(serviceDetails);
  }


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
                  <h2>Update Service Details</h2>
                  <form>
                    <Row>
                      <div>Title: </div>
                      <input
                        type="text"
                        value={formDetails.title || serviceDetails.title}
                        placeholder={serviceDetails && serviceDetails.title}
                        onChange={(e) => onFormUpdate("title", e.target.value)}
                      />
                    </Row>
                    <Row>
                      <div>Image Path </div>
                      <input
                        type="text"
                        value={formDetails.image || serviceDetails.image}
                        placeholder={serviceDetails && serviceDetails.image}
                        onChange={(e) => onFormUpdate("image", e.target.value)}
                      />
                    </Row>
                    <Row>
                      <div>Description</div>
                      <textarea
                        style={{ marginTop: "25px" }}
                        rows="6"
                        value={
                          formDetails.description || serviceDetails.description
                        }
                        placeholder={
                          serviceDetails && serviceDetails.description
                        }
                        onChange={(e) =>
                          onFormUpdate("description", e.target.value)
                        }
                      ></textarea>
                    </Row>

                    {/* {serviceDetails &&
                      serviceDetails.pricing.map((service, idx) => {
                        return (
                          <Row>
                            <div>Type: </div>
                            <input
                              type="text"
                              value={
                                formDetails.pricing.length > 0 &&
                                formDetails.pricing[idx] &&
                                formDetails.pricing[idx].type
                                  ? formDetails.pricing[idx].type
                                  : service.type
                              }
                              placeholder={
                                formDetails.pricing.length > 0 &&
                                formDetails.pricing[idx] &&
                                formDetails.pricing[idx].type
                                  ? formDetails.pricing[idx].type
                                  : service.type
                              }
                              onChange={(e) =>
                                onFormUpdate("type", e.target.value, idx)
                              }
                            />
                            <div>Price: </div>
                            <input
                              type="text"
                              value={service.price}
                              placeholder={service.price}
                              onChange={(e) =>
                                onFormUpdate("price", e.target.value, idx)
                              }
                            />
                            <div>Description: </div>
                            <input
                              type="text"
                              value={service.description}
                              placeholder={service.description}
                              onChange={(e) =>
                                onFormUpdate("description", e.target.value, idx)
                              }
                            />
                          </Row>
                        );
                      })} */}

                    <Row>
                      <Col size={12} className="px-1">
                        <button onClick={handleSubmit}>
                          <span>{buttonText}</span>
                        </button>
                        {/* <button onClick={handleReset}><span>{resetText}</span></button> */}
                      </Col>
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
