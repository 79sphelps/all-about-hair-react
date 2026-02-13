import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { v4 as uuidv4 } from "uuid";
import "animate.css";
import { useForm } from "react-hook-form";
import { usePostGeneralRequest } from "./hooks/usePostGeneralRequest";
import contactImg from "../../assets/img/contact-img.svg";
import {
  CONTACT_FORM_INPUTS_ARY,
  CONTACT_FORM_SUCCESS_TEXT,
  CONTACT_FORM_SUCCESS_SUBTEXT,
} from "../../lib/data";

const ValidationError = ({ fieldError, id }) => {
  if (!fieldError) return null;
  return (
    <div
      id={id}
      role="alert"
      style={{ color: "red", marginTop: 2, marginBottom: 2 }}
    >
      {fieldError.message}
    </div>
  );
};

const ContactForm = () => {
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
  const [buttonText, setButtonText] = useState("Send");
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const { postRequestMutation, isPending } = usePostGeneralRequest();

  const handleSubmit2 = (formData) => {
    setRequestSubmitted(true);
    setButtonText("Sending...");

    postRequestMutation.mutate(
      { id: uuidv4(), ...formData },
      {
        onSuccess: () => {
          setButtonText("Send");
          // We can optionally reset form here if we want
          // reset(defaultValues);
        },
        onError: () => {
          setButtonText("Send");
          setRequestSubmitted(false);
        },
      },
    );
  };

  const handleReset = () => {
    setButtonText("Send");
    reset(defaultValues);
    clearErrors();
    setRequestSubmitted(false);
  };

  const getEditorStyle = (fieldError) =>
    fieldError ? "border: solid 1px red" : "";

  const ERRORS_OBJ = {
    firstName: errors.firstName,
    lastName: errors.lastName,
    email: errors.email,
    phone: errors.phone,
  };

  return (
    <section className="contact" aria-labelledby="contact-form-heading">
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
                  alt=""
                  aria-hidden="true"
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
                  <h2 id="contact-form-heading">Scheduling or Questions</h2>

                  {!requestSubmitted ? (
                    <form
                      noValidate
                      onSubmit={handleSubmit(handleSubmit2)}
                      aria-busy={isPending}
                    >
                      <Row>
                        {CONTACT_FORM_INPUTS_ARY.map((item, idx) => (
                          <Col size={12} sm={6} className="px-1" key={idx}>
                            <label htmlFor={item.id}>{item.placeholder}</label>
                            <input
                              className={getEditorStyle(ERRORS_OBJ[item.class])}
                              type="text"
                              id={item.id}
                              placeholder={item.placeholder}
                              {...register(
                                item.register_obj.register_txt,
                                item.register_obj,
                              )}
                            />
                            <ValidationError
                              fieldError={ERRORS_OBJ[item.class]}
                            />
                          </Col>
                        ))}
                        <Col size={12} className="px-1">
                          <label htmlFor="message">
                            Message (at least 25 characters)
                          </label>
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
                          />
                          {message && message.length < 25 && (
                            <div aria-live="polite">
                              ({25 - message.length} characters still needed)
                            </div>
                          )}
                          <ValidationError fieldError={errors.message} />
                          <button
                            type="submit"
                            disabled={!isValid || isPending}
                            style={{
                              color: !isValid ? "lightgrey" : undefined,
                              cursor: !isValid ? "not-allowed" : undefined,
                              marginRight: "20px",
                            }}
                          >
                            {isPending ? "Sending..." : "Send"}
                          </button>

                          <button
                            type="button"
                            onClick={handleReset}
                          >
                            Reset
                          </button>
                        </Col>
                      </Row>
                    </form>
                  ) : (
                    // <Col size={12} className="px-1">
                    //   <h1 className="project-heading">{CONTACT_FORM_SUCCESS_TEXT}</h1>
                    //   <p style={{ color: "white", marginTop: 0, marginBottom: "20px" }}>
                    //     {CONTACT_FORM_SUCCESS_SUBTEXT}
                    //   </p>
                    //   <div className="contact-submit">
                    //     <button
                    //       type="button"
                    //       onClick={() => {
                    //         reset(defaultValues);
                    //         clearErrors();
                    //         handleReset();
                    //       }}
                    //     >
                    //       <span>Reset</span>
                    //     </button>
                    //   </div>
                    // </Col>
                    <div role="status" aria-live="assertive">
                      <h3>{CONTACT_FORM_SUCCESS_TEXT}</h3>
                      <p>{CONTACT_FORM_SUCCESS_SUBTEXT}</p>
                      <button type="button" onClick={handleReset}>
                        Reset
                      </button>
                    </div>
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

export default ContactForm;
