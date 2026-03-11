import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { v4 as uuidv4 } from "uuid";
import "animate.css";
import { useForm } from "react-hook-form";
import { usePostGeneralRequest } from "../hooks/usePostGeneralRequest";
import AccessibleFormField from "../../../ui/form/AccessibleFormField";
import {
  CONTACT_FORM_INPUTS_ARY,
  CONTACT_FORM_SUCCESS_TEXT,
  CONTACT_FORM_SUCCESS_SUBTEXT,
  CONTACT_FORM_IMAGE,
} from "../../../lib/data";


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
    formState: {
      errors,
      isValid,
      touchedFields,
      dirtyFields,
      isDirty,
      isSubmitting
    }
  } = useForm({
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const message = watch("message");
  const [buttonText, setButtonText] = useState("Send");
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const { postRequestMutation, isPending } = usePostGeneralRequest();

  const handleSubmitForm = (formData) => {
    setRequestSubmitted(true);
    setButtonText("Sending...");

    postRequestMutation.mutate(
      { id: uuidv4(), ...formData },
      {
        onSuccess: () => {
          setButtonText("Send");
          setRequestSubmitted(true);
          reset(defaultValues);
        },
        onError: () => {
          setButtonText("Send");
          setRequestSubmitted(false);
        }
      }
    );
  };

  const handleReset = () => {
    setButtonText("Send");

    reset(defaultValues, {
      keepDirty: false,
      keepTouched: false,
      keepErrors: false,
      keepIsSubmitted: false,
    });

    setRequestSubmitted(false);
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-form-heading">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                  src={CONTACT_FORM_IMAGE}
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
                      onSubmit={handleSubmit(handleSubmitForm)}
                      aria-busy={isPending}
                    >
                      <Row>
                        {CONTACT_FORM_INPUTS_ARY.map((item) => (
                          <Col sm={6} className="px-1" key={item.id}>
                            <AccessibleFormField
                              id={item.id}
                              label={item.placeholder}
                              type="text"
                              register={register}
                              registerOptions={item.validation}
                              error={errors[item.id]}
                              touched={touchedFields[item.id]}
                              dirty={dirtyFields[item.id]}
                              required={!!item.validation?.required}
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
                            disabled={!isValid || isSubmitting || !isDirty}
                            style={{ marginRight: "10px" }}
                          >
                            { isSubmitting ? "Sending…" : "Send" }
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
