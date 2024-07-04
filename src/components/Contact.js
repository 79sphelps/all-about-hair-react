import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import TrackVisibility from "react-on-screen";
import { Loading } from "./Loading.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHomepageDetails, postGeneralRequest } from "../api/index.js";
import { v4 as uuidv4 } from "uuid";
import "animate.css";

export const Contact = () => {
  const queryClient = useQueryClient();

  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [resetText, setResetText] = useState("Reset");
  const [status, setStatus] = useState({});
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  let {
    isLoading,
    isError,
    // data: bannerInfo,
    error,
  } = useQuery({
    queryKey: ["bannerInfo"],
    queryFn: getHomepageDetails,
  });

  const postRequestMutation = useMutation({
    mutationFn: postGeneralRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postGeneralRequest"] });
      console.log("success bro!");
      setTimeout(() => {
        setButtonText("Create");
        setFormDetails(formInitialDetails);
      }, 2000);
      // navigate("/admin/service-details");
    },
  });

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setButtonText("Sending...");
    postRequestMutation.mutate({
      id: uuidv4(),
      ...formDetails,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormDetails(formInitialDetails);
    setButtonText("Send");
    setRequestSubmitted(false);
  };

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                  src={contactImg}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Scheduling or Questions</h2>
                  {!requestSubmitted ? (
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col size={12} sm={6} className="px-1">
                          <input
                            type="text"
                            value={formDetails.firstName}
                            placeholder="First Name"
                            onChange={(e) =>
                              onFormUpdate("firstName", e.target.value)
                            }
                          />
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <input
                            type="text"
                            value={formDetails.lastName}
                            placeholder="Last Name"
                            onChange={(e) =>
                              onFormUpdate("lastName", e.target.value)
                            }
                          />
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <input
                            type="email"
                            value={formDetails.email}
                            placeholder="Email Address"
                            onChange={(e) =>
                              onFormUpdate("email", e.target.value)
                            }
                          />
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <input
                            type="tel"
                            value={formDetails.phone}
                            placeholder="Phone No."
                            onChange={(e) =>
                              onFormUpdate("phone", e.target.value)
                            }
                          />
                        </Col>
                        <Col size={12} className="px-1">
                          <textarea
                            rows="6"
                            value={formDetails.message}
                            placeholder="Message"
                            onChange={(e) =>
                              onFormUpdate("message", e.target.value)
                            }
                          ></textarea>
                          <button
                            type="submit"
                            disabled={buttonText === "Sending..."}
                            style={{ marginRight: "20px" }}
                          >
                            <span>{buttonText}</span>
                          </button>
                          <button onClick={handleReset}>
                            <span>{resetText}</span>
                          </button>
                        </Col>
                        {status.message && (
                          <Col>
                            <p
                              className={
                                status.success === false ? "danger" : "success"
                              }
                            >
                              {status.message}
                            </p>
                          </Col>
                        )}
                      </Row>
                    </form>
                  ) : (
                    <>
                      <Col size={12} className="px-1">
                        <h1 className="project-heading">
                          Thank you for your request
                        </h1>
                        <p
                          style={{
                            color: "white",
                            marginTop: "0",
                            marginBottom: "20px",
                          }}
                        >
                          An experienced team member will respond most likely in
                          the next 24 to 48 hours.
                        </p>
                        <div className="contact-submit">
                        <button onClick={handleReset} >
                          <span>{resetText}</span>
                        </button>
                        </div>
                      </Col>
                    </>
                  )}
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
