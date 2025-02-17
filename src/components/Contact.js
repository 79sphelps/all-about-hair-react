import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { v4 as uuidv4 } from "uuid";
import "animate.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import contactImg from "../assets/img/contact-img.svg";
// import { Loading } from "./Loading.js";
import HomepageService from "../api/homepage.service";
import RequestsService from "../api/requests.service";

const FormError = (props) => {
  return (
    <div
      style={{
        color: "red",
        paddingTop: "5px",
        paddingBottom: "15px",
      }}
    >
      {props.msg}
    </div>
  )
}

const formErrors = {
  "firstName": {
      required: true,
      error: "Please provide a valid first name."
  },
  "lastName": {
      required: true,
      error: "Please provide a valid last name."
  },
  "email": {
      required: true,
      error: "The email entered is invalid."
  },
  "phone": {
      required: true,
      error: "Please provide a valid phone number."
  },
  "message": {
      required: true,
      error: "Please provide a message so we can understand the context of your request."
  },
}

const getFormErrorObject = (name, value, formErrorObjectRef) => {
  let formErrorObject = { ...formErrorObjectRef };
  const status = validateInput(name, value);
  return { ...formErrorObject, [name + 'Error']: status };
}

// const getErrorElement = (name, value) => {
//   const status = validateInput(name, value);
//   return status ? <FormError msg={formErrors[name].error} /> : null;
// }

const validateInput = (name, value) => {
  switch (name) {
    case "firstName":
      return value.length < 2 ? true : false;
    case "lastName":
      return value.length < 2 ? true : false;
    case "email":
      let emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
      return !emailPattern.test(value) ? true : false;
    case "phone":
      let pattern = /^\d{3}-\d{3}-\d{4}$/;
      return !pattern.test(value) ? true : false;
    case "message":
      return value.length < 25 ? true : false;
    default:
      break;
  }
};

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
  // const [resetText, setResetText] = useState("Reset");
  const resetText = "Reset";
  const [status, setStatus] = useState({});
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  let initialFormErrorObject = {
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    phoneError: false,
    messageError: false,
  };

  const [formErrorObject, setFormErrorObject] = useState(
    initialFormErrorObject
  );

  let {
    // isLoading,
    // isError,
    // data: bannerInfo,
    // error,
  } = useQuery({
    queryKey: ["bannerInfo"],
    queryFn: HomepageService.getHomepageDetails,
  });

  const postRequestMutation = useMutation({
    mutationFn: RequestsService.postGeneralRequest,
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

  const doesFormHaveErrors = () => {
    return (
      Object.values(formErrorObject).map((v) => v ? true : false).includes(true) || 
      Object.values(formDetails).map((v) => !v ? true : false).includes(true)
    );
  };

  const onFormUpdate = (category, value) => {
    let obj = getFormErrorObject(category, value, formErrorObject);
    let newObj = { ...formErrorObject, ...obj };
    setFormErrorObject({ ...formErrorObject, ...newObj });
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
    setFormErrorObject(initialFormErrorObject);
  };

  // if (isLoading) return <Loading />;
  // if (isError) return `Error: ${error.message}`;

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
                          {formErrorObject.firstNameError && (
                            <FormError msg={formErrors["firstName"].error} />
                          )}
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
                          {formErrorObject.lastNameError && (
                            <FormError msg={formErrors["lastName"].error} />
                          )}
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
                          {formErrorObject.emailError && (
                            <FormError msg={formErrors["email"].error} />
                          )}
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
                          {formErrorObject.phoneError && (
                            <FormError msg={formErrors["phone"].error} />
                          )}
                        </Col>
                        <Col size={12} className="px-1">
                          <textarea
                            rows="6"
                            value={formDetails.message}
                            placeholder="Message (at least 25 characters)"
                            onChange={(e) =>
                              onFormUpdate("message", e.target.value)
                            }
                          ></textarea>
                          {formDetails.message.length < 25 && <div>({25 - formDetails.message.length} characters still needed)</div>}
                          {formErrorObject.messageError && (
                            <FormError msg={formErrors["message"].error} />
                          )}
                          <button
                            type="submit"
                            disabled={buttonText === "Sending..."  || doesFormHaveErrors()}
                            style={{
                              color: doesFormHaveErrors() && "lightgrey",
                              cursor: doesFormHaveErrors() && "not-allowed",
                              marginRight: "20px"
                            }}
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
