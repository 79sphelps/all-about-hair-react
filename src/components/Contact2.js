import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import "animate.css";
import { useForm } from "react-hook-form";
import RequestsService from "../api/requests.service";
import contactImg from "../assets/img/contact-img.svg";

const ValidationError = ({ fieldError }) => {
  if (!fieldError) return null;
  return (
    <div role="alert" style={{ color: "red", marginTop: 2, marginBottom: 2 }}>
      {fieldError.message}
    </div>
  );
};

const Contact2 = () => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  const [message] = watch(["message"]);
  const queryClient = useQueryClient();
  const [buttonText, setButtonText] = useState("Send");
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const postRequestMutation = useMutation({
    mutationFn: RequestsService.postGeneralRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postGeneralRequest"] });
      setTimeout(() => setButtonText("Create"), 2000);
    },
  });

  const handleSubmit2 = (e) => {
    setRequestSubmitted(true);
    setButtonText("Sending...");
    postRequestMutation.mutate({
      id: uuidv4(),
      ...e,
    });
  };

  const handleReset = (e) => {
    setButtonText("Send");
    setRequestSubmitted(false);
  };

  const getEditorStyle = (fieldError) => {
    return fieldError ? "border: solid 1px red" : "";
  }

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
                    <form noValidate onSubmit={handleSubmit(handleSubmit2)}>
                      <Row>
                        <Col size={12} sm={6} className="px-1">
                          <input
                            className={getEditorStyle(errors.firstName)}
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            {...register("firstName", {
                              required: "You must enter a valid first name",
                              minLength: {
                                value: 2,
                                message:
                                  "First name must be at least 2 characters",
                              },
                            })}
                          />
                          <ValidationError fieldError={errors.firstName} />
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <input
                            className={getEditorStyle(errors.lastName)}
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                            {...register("lastName", {
                              required: "You must enter a valid last name",
                              minLength: {
                                value: 2,
                                message:
                                  "Last name must be at least 2 characters",
                              },
                            })}
                          />
                          <ValidationError fieldError={errors.lastName} />
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <input
                            className={getEditorStyle(errors.email)}
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            {...register("email", {
                              required: "You must enter a valid email",
                              pattern: {
                                value: /\S+@\S+\.\S+/,
                                message:
                                  "Entered value does not match email format",
                              },
                            })}
                          />
                          <ValidationError fieldError={errors.email} />
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <input
                            className={getEditorStyle(errors.phone)}
                            type="tel"
                            id="phone"
                            placeholder="Phone No."
                            {...register("phone", {
                              required: "You must enter a valid phone number",
                              pattern: {
                                value:
                                  /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
                                message:
                                  "Entered value does not match phone format",
                              },
                            })}
                          />
                          <ValidationError fieldError={errors.phone} />
                        </Col>
                        <Col size={12} className="px-1">
                          <textarea
                            className={getEditorStyle(errors.message)}
                            rows="6"
                            placeholder="Message (at least 25 characters)"
                            {...register("message", {
                              required:
                                "You must enter a reason for contacting",
                              minLength: {
                                value: 25,
                                message:
                                  "Message must be at least 25 characters",
                              },
                            })}
                          ></textarea>
                          {message && message?.length < 25 && (
                            <div>
                              ({25 - message?.length} message characters still
                              needed)
                            </div>
                          )}
                          <ValidationError fieldError={errors.message} />
                          <button
                            type="submit"
                            disabled={!isValid}
                            style={{
                              color: !isValid && "lightgrey",
                              cursor: !isValid && "not-allowed",
                              marginRight: "20px",
                            }}
                          >
                            {buttonText}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              reset(defaultValues);
                              clearErrors();
                              handleReset();
                            }}
                          >
                            Reset
                          </button>
                        </Col>
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
                          <button
                            type="button"
                            onClick={() => {
                              reset(defaultValues);
                              clearErrors();
                              handleReset();
                            }}
                          >
                            <span>Reset</span>
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

export default Contact2;
