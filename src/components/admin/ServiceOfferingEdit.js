import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "animate.css";
// import ServicesService from "../../api/services.service.js";
import NavBar from "../../ui/NavBar";
import Loading from "../Loading";
import { FormError, formErrorsCreateService } from "../../lib/common.js";

import { useService } from "./hooks/useService";
import { useUpdateService } from "./hooks/useUpdateService";

const ServiceOfferingEdit = () => {
  let formInitialDetails = {
    _id: "",
    title: "",
    image: "",
    description: "",
    pricing: [],
    errors: {},
  };
  let initialFormPricingDetails = {
    type: "",
    price: "",
    description: "",
    errors: {},
  };
  const [formData, setFormData] = useState(formInitialDetails);
  const [touched, setTouched] = useState({});
  const [touched2, setTouched2] = useState({});
  const [formPricingDetails, setFormPricingDetails] = useState(
    initialFormPricingDetails,
  );
  const [buttonText, setButtonText] = useState("Update");
  const [submitted, setSubmitted] = useState(false);
  

  const location = useLocation();
  const serviceId = location.state?.id;

  const { data: service, isLoading, error } = useService(serviceId);
  const updateService = useUpdateService();


  // const queryClient = useQueryClient();

  
  const navigate = useNavigate();



  // let {
  //   isLoading,
  //   isError,
  //   data: serviceDetails,
  //   error,
  // } = useQuery({
  //   queryKey: ["serviceDetails", location.state.id],
  //   queryFn: () => ServicesService.getServiceDetail(location.state.id), // fetch the posts using the async call
  // });



  // useEffect(() => {
  //   if (serviceDetails) {
  //     setFormData(serviceDetails);
  //   }
  // }, [serviceDetails]);
  useEffect(() => {
    if (service) {
      setFormData(service);
    }
  }, [service]);



  // const updateServiceDetailsMutation = useMutation({
  //   mutationFn: ServicesService.updateServiceDetails,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["serviceDetails"] });
  //     setTimeout(() => {
  //       setButtonText("Update");
  //     }, 3000);
  //   },
  // });



  const updateServiceDetailsEdit = () => {
    if (formData) {
      setSubmitted(true);
      const id = formData._id;
      setButtonText("Updating service details...");
      // updateServiceDetailsMutation.mutate({ id, ...formData });
      updateService.mutate({ id, ...formData });
      navigate("/admin/services-details");
    }
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
  };

  const handleFormPricingDetailChange = (idx, e) => {
    const { name, value } = e.target;
    formData.pricing[idx] = { ...formData.pricing[idx], [name]: value };
    setFormData((values) => ({ ...values, ...formData }));
    validatePricingDetail(name, value);
  };

  const handlePricingBlur = (e) => {
    const { name, value } = e.target;
    setTouched2((prev) => ({ ...prev, [name]: true }));
    validatePricingDetail(name, value);
  };

  const validate = (name, value) => {
    let errors = formData.errors || {};

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
  };

  const validatePricingDetail = (name, value) => {
    let errors = formPricingDetails.errors || {};

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
    if (name === "description") {
      if (!pricingDetailDescriptionIsValid(value)) {
        errors.description = "The pricing detail description is not valid.";
      } else {
        errors.description = "";
      }
    }

    setFormPricingDetails((values) => ({ ...values, errors: errors }));
  };

  const titleIsValid = (value) => /^[A-Za-z0-9_ ']{5,}$/g.test(value);
  const imagePathIsValid = (value) => /^[A-Za-z0-9_ /.']{5,}$/g.test(value);
  const descriptionIsValid = (value) => /^[A-Za-z0-9_ .']{10,}$/g.test(value);

  const pricingDetailTypeIsValid = (value) =>
    /^[A-Za-z0-9_ ']{5,}$/g.test(value);
  //   const pricingDetailPriceIsValid = (value) => /^-?\d+(,\d{3})*(\.\d{1,2})?$/g.test(value);  // WAIT ON THIS STRICT FORM
  const pricingDetailPriceIsValid = (value) =>
    /^[A-Za-z0-9_ .$\-']{3,}$/g.test(value); // ALLOW STRING DESCRIPTION FOR NOW
  const pricingDetailDescriptionIsValid = (value) =>
    /^[A-Za-z0-9_ .']{5,}$/g.test(value);

  const handleCancel = () => {
    setFormData(formInitialDetails);
    setFormPricingDetails(initialFormPricingDetails);
    setSubmitted(false);
    navigate("/admin/services-details");
  };

  const SERVICE_FORM_INPUTS_ARRAY = [
    {
      title: "Title",
      name: "title",
      errorMsg: touched && ("title" in touched) && touched.title && formData.errors.title && (
        <FormError msg={formErrorsCreateService["title"].error} />
      ),
    },
    {
      title: "Image Path",
      name: "image",
      errorMsg: touched && touched.image && formData.errors.image && (
        <FormError msg={formErrorsCreateService["image"].error} />
      ),
    },
  ];

  const PRICING_DETAIL_FORM_INPUTS_ARRAY = [
    {
      title: "Type",
      name: "type",
      errorMsg: touched2 && touched2.type && formPricingDetails.errors.type && (
        <FormError msg={formErrorsCreateService["type"].error} />
      ),
    },
    {
      title: "Price",
      name: "price",
      errorMsg: touched2 && touched2.price && formPricingDetails.errors.price && (
        <FormError msg={formErrorsCreateService["price"].error} />
      ),
    },
    {
      title: "Description",
      name: "description",
      errorMsg: touched2 && touched2.description &&
        formPricingDetails.errors.description && (
          <FormError msg={formErrorsCreateService["description"].error} />
        ),
    },
  ];

  if (isLoading) return <Loading />;
  if (error) return `Error: ${error.message}`;

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
                  <h2>Update Service Details</h2>
                  <div>
                    {SERVICE_FORM_INPUTS_ARRAY.map((item, idx) => (
                      <Row key={item._id}>
                        <div>{item.title}: </div>
                        <input
                          className="admin-add-service-form-input"
                          type="text"
                          name={item.name}
                          value={formData[item.name]}
                          placeholder={item.placeholder}
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

                    {formData && formData.pricing && formData.pricing.length > 0 && (
                      <div>
                      <h2>Services Details</h2>
                      <div className="edit-service-detail-group">
                        {formData.pricing.map((item, idx) => (
                          <div key={idx + "." + formData._id}>
                            {PRICING_DETAIL_FORM_INPUTS_ARRAY.map((pitem) => (
                              <Row>
                                <div>{pitem.title}: </div>
                                <input
                                  className="admin-add-service-form-input"
                                  type="text"
                                  name={pitem.name}
                                  value={item[pitem.name]}
                                  onChange={(e) =>
                                    handleFormPricingDetailChange(idx, e)
                                  }
                                  onBlur={handlePricingBlur}
                                />
                                {pitem.errorMsg}
                              </Row>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div> 
                    )}





                    <Row>
                      <Col
                        size={12}
                        className="px-1 admin-edit-service-btn-container"
                      >
                        <button
                          className="admin-btn"
                          onClick={handleCancel}
                        >
                          <span>Cancel</span>
                        </button>
                        <button
                          className="admin-btn"
                          onClick={updateServiceDetailsEdit}
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
        </Row>
      </Container>
      {/* <Footer /> */}
    </section>
  );
};

export default ServiceOfferingEdit;
