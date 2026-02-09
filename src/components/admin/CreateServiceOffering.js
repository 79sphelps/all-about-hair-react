import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import "animate.css";
import {
  FormError,
  formErrorsCreateService,
//   getFormErrorObjectCreateService,
//   getPricingDetailErrorObject,
} from "../../lib/common.js";
import NavBar from "../../ui/NavBar";
import ServicesService from "../../services/services.service.js";

const CreateServiceOffering = () => {
  let formInitialDetails = {
    title: "",
    image: "",
    description: "",
    pricing: [],
    errors: {},
  };
  let initialFormPricingDetails = {
    type: "",
    price: "",
    description2: "",
    errors: {},
  };
  const [formData, setFormData] = useState(formInitialDetails);
//   const [errors, setErrors] = useState({});
//   const [pricingErrors, setPricingErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [touched2, setTouched2] = useState({});
  const [handleAddPricingDetail, setAddPricingDetailFlag] = useState(false);
  const [formPricingDetails, setFormPricingDetails] = useState(
    initialFormPricingDetails,
  );

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [buttonText, setButtonText] = useState("Create New Service");

  const addServiceMutation = useMutation({
    mutationFn: ServicesService.createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addService"] });
    //   setTimeout(() => {
    //     setButtonText("Create New Service");
    //     setSubmitted(false);
    //     setFormData(formInitialDetails);
    //     setFormPricingDetails(initialFormPricingDetails);
    //     // navigate("/admin/services-details");
    //   }, 5000);
    //   setButtonText("Create New Service");
        // setSubmitted(false);
        // setFormData(formInitialDetails);
        // setFormPricingDetails(initialFormPricingDetails);
    },
  });

  const handleAddService = () => {
    if (formData) {
        setSubmitted(true);
      setButtonText("Creating Service...");
      addServiceMutation.mutate({
        id: uuidv4(),
        ...formData,
      });
    }
  };

  const newService = () => {
    setFormData(formInitialDetails);
    setFormPricingDetails(initialFormPricingDetails);
    setSubmitted(false);
    setButtonText("Create New Service");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((values) => ({ ...values, [name]: value }));
    validate(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validate(name, value);
    // const error = validate(name, value);
    // setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const toggleAddNewPricingDetail = () => {
    setAddPricingDetailFlag((v) => !v);
  };

  const handleFormPricingDetailChange = (e) => {
    const { name, value } = e.target;
    setFormPricingDetails((values) => ({ ...values, [name]: value }));
    validatePricingDetail(name, value);
  };

  const handlePricingBlur = (e) => {
    const { name, value } = e.target;
    setTouched2((prev) => ({ ...prev, [name]: true }));
    validatePricingDetail(name, value);
    // const error = validatePricingDetail(name, value);
    // setPricingErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleAddFormPricingDetail = () => {
    if (formPricingDetails) {
      const o = {
        ...formData,
        pricing: [...formData.pricing, formPricingDetails],
      };
      setFormData(o);
      setFormPricingDetails(initialFormPricingDetails);
      setAddPricingDetailFlag(false);
    }
  };

  const validate = (name, value) => {
    const errors = formData.errors;

    if (name === "title") {
      if (!titleIsValid(value)) {
        errors.title = "The title is not valid.";
      } else {
        errors.title = "";
      }
    }
    if (name === "image") {
      if (!imagePathIsValid(value)) {
        errors.image = "The image path is not valid.";
      } else {
        errors.image = "";
      }
    }
    if (name === "description") {
      if (!descriptionIsValid(value)) {
        errors.description = "The description is not valid.";
      } else {
        errors.description = "";
      }
    }

    setFormData((values) => ({ ...values, errors: errors }));
    // setErrors(Object.keys(errors).length > 0);
  };

  const validatePricingDetail = (name, value) => {
    const errors = formPricingDetails.errors;

    if (name === "type") {
      if (!pricingDetailTypeIsValid(value)) {
        errors.type = "The pricing detail type is not valid.";
      } else {
        errors.type = "";
      }
    }
    if (name === "price") {
      if (!pricingDetailPriceIsValid(value)) {
        errors.price = "The pricing detail price is not valid.";
      } else {
        errors.price = "";
      }
    }
    if (name === "description2") {
      if (!pricingDetailDescriptionIsValid(value)) {
        errors.description2 = "The pricing detail description is not valid.";
      } else {
        errors.description2 = "";
      }
    }

    setFormPricingDetails((values) => ({ ...values, errors: errors }));
    // setPricingErrors(Object.keys(errors).length > 0);
  };

  const titleIsValid = (value) => /^[A-Za-z0-9_ ']{5,}$/g.test(value);
  const imagePathIsValid = (value) => /^[A-Za-z0-9_ \/\.']{5,}$/g.test(value);
  const descriptionIsValid = (value) => /^[A-Za-z0-9_ \.']{10,}$/g.test(value);

  const pricingDetailTypeIsValid = (value) => /^[A-Za-z0-9_ ']{5,}$/g.test(value);
  const pricingDetailPriceIsValid = (value) => /^-?\d+(,\d{3})*(\.\d{1,2})?$/g.test(value);
  const pricingDetailDescriptionIsValid = (value) =>
    /^[A-Za-z0-9_ \.']{5,}$/g.test(value);

  const handleCancel = () => {
    setFormData(formInitialDetails);
    setFormPricingDetails(initialFormPricingDetails);
    setSubmitted(false);
    navigate("/");
  };

  const SERVICE_FORM_INPUTS_ARRAY = [
    {
      title: "Title",
      name: "title",
      errorMsg: touched.title && formData.errors.title && (
        <FormError msg={formErrorsCreateService["title"].error} />
      ),
    },
    {
      title: "Image Path",
      name: "image",
      errorMsg: touched.image && formData.errors.image && (
        <FormError msg={formErrorsCreateService["image"].error} />
      ),
    },
  ];

  const PRICING_DETAIL_FORM_INPUTS_ARRAY = [
    {
      title: "Type",
      name: "type",
      errorMsg: touched2.type && formPricingDetails.errors.type && (
        <FormError msg={formErrorsCreateService["type"].error} />
      ),
    },
    {
      title: "Price",
      name: "price",
      errorMsg: touched2.price && formPricingDetails.errors.price && (
        <FormError msg={formErrorsCreateService["price"].error} />
      ),
    },
    {
      title: "Description",
      name: "description2",
      errorMsg: touched2.description2 &&
        formPricingDetails.errors.description2 && (
          <FormError msg={formErrorsCreateService["description2"].error} />
        ),
    },
  ];

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          {submitted && formData ? (
            <div className="admin-add-service-success-container">
              <h4>The new service was created successfully!</h4>
              <button className="btn btn-success" onClick={newService}>
                Add
              </button>
            </div>
          ) : (
            <Col>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__fadeIn" : ""
                    }
                  >
                    <h2>New Service Details</h2>
                    <div>
                      {SERVICE_FORM_INPUTS_ARRAY.map((item, idx) => (
                        <Row key={idx}>
                          <div>{item.title}: </div>
                          <input
                            className="admin-add-service-form-input"
                            type="text"
                            name={item.name}
                            placeholder={item.placeholder}
                            value={formData.value}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {item.errorMsg}
                        </Row>
                      ))}

                      <Row>
                        <div>Description</div>
                        <textarea
                          className="admin-add-service-form-input"
                          name="description"
                          style={{ marginTop: "25px" }}
                          rows="6"
                          value={formData.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></textarea>
                        {touched.description && formData.errors.description && (
                          <FormError
                            msg={formErrorsCreateService["description"].error}
                          />
                        )}
                      </Row>

                      {handleAddPricingDetail ? (
                        <div>
                          {PRICING_DETAIL_FORM_INPUTS_ARRAY.map((item, idx) => (
                            <Row key={idx}>
                              <div>{item.title}: </div>
                              <input
                                className="admin-add-service-form-input"
                                type="text"
                                name={item.name}
                                value={item.value}
                                onChange={handleFormPricingDetailChange}
                                onBlur={handlePricingBlur}
                              />
                              {item.errorMsg}
                            </Row>
                          ))}
                          <button
                            className="admin-add-service-add-detail-btn"
                            onClick={handleAddFormPricingDetail}
                          >
                            <span>Add Detail</span>
                          </button>
                        </div>
                      ) : null}

                      <Row>
                        <Col
                          size={12}
                          className="px-1 admin-add-service-btn-container"
                        >
                          <button
                            className="admin-add-service-cancel-btn"
                            onClick={handleCancel}
                          >
                            <span>Cancel</span>
                          </button>
                          <button
                            className="admin-add-service-add-pricing-detail-btn"
                            onClick={toggleAddNewPricingDetail}
                          >
                            <span>Add New Pricing Detail</span>
                          </button>
                          <button
                            className="admin-add-service-create-btn"
                            onClick={handleAddService}
                          >
                            <span>{buttonText}</span>
                          </button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                )}
              </TrackVisibility>
            </Col>
          )}
        </Row>
      </Container>
      {/* <Footer /> */}
    </section>
  );
};

export default CreateServiceOffering;
