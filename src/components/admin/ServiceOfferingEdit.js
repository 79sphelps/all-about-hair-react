import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";

import NavBar from "../../ui/NavBar";
import Loading from "../Loading";
import { FormError, formErrorsCreateService } from "../../lib/common.js";

import { useService } from "./hooks/useService";
import { useUpdateService } from "./hooks/useUpdateService";

const EMPTY_SERVICE = {
  _id: "",
  title: "",
  image: "",
  description: "",
  pricing: [],
  errors: {},
};

const ServiceOfferingEdit = () => {
  const location = useLocation();
  const serviceId = location.state?.id;

  const navigate = useNavigate();

  const { data: service, isLoading, error } = useService(serviceId);
  const updateService = useUpdateService();

  const [formData, setFormData] = useState(EMPTY_SERVICE);
  const [touched, setTouched] = useState({});
  const [touchedPricing, setTouchedPricing] = useState({});
  const [buttonText, setButtonText] = useState("Update");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData(service);
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handlePricingChange = (idx, e) => {
    const { name, value } = e.target;
    const updatedPricing = [...formData.pricing];
    updatedPricing[idx] = { ...updatedPricing[idx], [name]: value };
    setFormData((prev) => ({ ...prev, pricing: updatedPricing }));
    validatePricing(name, value);
  };

  const handlePricingBlur = (e) => {
    const { name, value } = e.target;
    setTouchedPricing((prev) => ({ ...prev, [name]: true }));
    validatePricing(name, value);
  };

  const handleCancel = () => {
    navigate("/admin/services-details");
  };

  const handleUpdate = () => {
    setSubmitted(true);
    setButtonText("Updating service details...");
    updateService.mutate({ id: formData._id, ...formData });
    navigate("/admin/services-details");
  };

  const validateField = (name, value) => {
    const errors = formData.errors || {};
    if (name === "title") errors.title = /^[A-Za-z0-9_ ']{5,}$/.test(value) ? "" : "Invalid title";
    if (name === "image") errors.image = /^[A-Za-z0-9_ /.']{5,}$/.test(value) ? "" : "Invalid image path";
    if (name === "description") errors.description = /^[A-Za-z0-9_ .']{10,}$/.test(value) ? "" : "Invalid description";
    setFormData((prev) => ({ ...prev, errors }));
  };

  const validatePricing = (name, value) => {
    const errors = formData.errors || {};
    if (name === "type") errors.type = /^[A-Za-z0-9_ ']{5,}$/.test(value) ? "" : "Invalid type";
    if (name === "price") errors.price = /^[A-Za-z0-9_ .$\-']{3,}$/.test(value) ? "" : "Invalid price";
    if (name === "description") errors.description = /^[A-Za-z0-9_ .']{5,}$/.test(value) ? "" : "Invalid description";
    setFormData((prev) => ({ ...prev, errors }));
  };

  const SERVICE_FIELDS = [
    { label: "Title", name: "title" },
    { label: "Image Path", name: "image" },
  ];

  const PRICING_FIELDS = [
    { label: "Type", name: "type" },
    { label: "Price", name: "price" },
    { label: "Description", name: "description" },
  ];

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          <Col>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Update Service Details</h2>

                  {/* Service Main Fields */}
                  {SERVICE_FIELDS.map(({ label, name }) => (
                    <Row key={name}>
                      <div>{label}:</div>
                      <input
                        className="admin-add-service-form-input"
                        type="text"
                        name={name}
                        value={formData[name] ?? ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched[name] && formData.errors[name] && (
                        <FormError msg={formErrorsCreateService[name].error} />
                      )}
                    </Row>
                  ))}

                  {/* Description */}
                  <Row>
                    <div>Description:</div>
                    <textarea
                      className="admin-add-service-form-input"
                      name="description"
                      rows={6}
                      value={formData.description ?? ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.description && formData.errors.description && (
                      <FormError msg={formErrorsCreateService.description.error} />
                    )}
                  </Row>

                  {/* Pricing Details */}
                  {formData.pricing.length > 0 && (
                    <div>
                      <h3>Pricing Details</h3>
                      {formData.pricing.map((item, idx) => (
                        <div key={idx}>
                          {PRICING_FIELDS.map(({ label, name }) => (
                            <Row key={name}>
                              <div>{label}:</div>
                              <input
                                className="admin-add-service-form-input"
                                type="text"
                                name={name}
                                value={item[name] ?? ""}
                                onChange={(e) => handlePricingChange(idx, e)}
                                onBlur={handlePricingBlur}
                              />
                              {touchedPricing[name] && formData.errors[name] && (
                                <FormError msg={formErrorsCreateService[name].error} />
                              )}
                            </Row>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <Row>
                    <Col className="px-1 admin-edit-service-btn-container">
                      <button className="admin-btn" onClick={handleCancel}>
                        Cancel
                      </button>
                      <button className="admin-btn" onClick={handleUpdate}>
                        {buttonText}
                      </button>
                    </Col>
                  </Row>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServiceOfferingEdit;
