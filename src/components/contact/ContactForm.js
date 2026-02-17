import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { v4 as uuidv4 } from "uuid";
import "animate.css";
import { useForm } from "react-hook-form";
import { usePostGeneralRequest } from "./hooks/usePostGeneralRequest";
import contactImg from "../../assets/img/contact-img.svg";
import AccessibleFormField from "./AccessibleFormField";
import {
  CONTACT_FORM_INPUTS_ARY,
  CONTACT_FORM_SUCCESS_TEXT,
  CONTACT_FORM_SUCCESS_SUBTEXT,
} from "../../lib/data";

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
                          <Col sm={6} className="px-1" key={idx}>
                            <AccessibleFormField
                              id={item.register_obj.register_txt}
                              label={item.placeholder}
                              type="text"
                              register={register}
                              registerOptions={item.register_obj}
                              error={errors[item.register_obj.register_txt]}
                              required={item.register_obj?.required}
                            />
                          </Col>
                        ))}
                        <Col className="px-1">
                          <AccessibleFormField
                            id="message"
                            label="Message"
                            as="textarea"
                            rows={6}
                            register={register}
                            registerOptions={{
                              required:
                                "Please specify your request or question pertaining to services or scheduling needs.",
                              minLength: {
                                value: 25,
                                message:
                                  "Message must be at least 25 characters",
                              },
                            }}
                            error={errors.message}
                            required
                            showCharCount
                            currentLength={message?.length || 0}
                            minLength={25}
                          />
                          <button
                            type="submit"
                            disabled={!isValid || isPending}
                            style={{ marginRight: "10px" }}
                          >
                            { buttonText }  {/* {isPending ? "Sending..." : "Send"}  */}
                          </button>
                          <button type="button" onClick={handleReset}>
                            Reset
                          </button>
                        </Col>
                      </Row>
                    </form>
                  ) : (
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
