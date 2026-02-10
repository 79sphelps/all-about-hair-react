import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";

import NavBar from "../../ui/NavBar";
import { FormError, formErrorsCreateService } from "../../lib/common.js";
import { useCreateService } from "./hooks/useCreateService";

const EMPTY_SERVICE = {
  title: "",
  image: "",
  description: "",
  pricing: [],
};

const EMPTY_PRICING = {
  type: "",
  price: "",
  description: "",
};

const validators = {
  title: (v) => /^[A-Za-z0-9_ ']{5,}$/.test(v),
  image: (v) => /^[A-Za-z0-9_ /.']{5,}$/.test(v),
  description: (v) => /^[A-Za-z0-9_ .']{10,}$/.test(v),
  type: (v) => /^[A-Za-z0-9_ ']{5,}$/.test(v),
  price: (v) => /^[A-Za-z0-9_ .$\-']{3,}$/.test(v),
};

const CreateServiceOffering = () => {
  const navigate = useNavigate();
  const createService = useCreateService();

  const [service, setService] = useState(EMPTY_SERVICE);
  const [pricingDraft, setPricingDraft] = useState(EMPTY_PRICING);
  const [showPricingForm, setShowPricingForm] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [buttonText, setButtonText] = useState("Create New Service");

  const getError = (name, value) => {
    if (!validators[name]?.(value)) {
      return formErrorsCreateService[name]?.error;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setPricingDraft((prev) => ({ ...prev, [name]: value }));
  };

  const addPricingDetail = () => {
    setService((prev) => ({
      ...prev,
      pricing: [...prev.pricing, pricingDraft],
    }));
    setPricingDraft(EMPTY_PRICING);
    setShowPricingForm(false);
  };

  const submitService = () => {
    setButtonText("Creating Service...");
    createService.mutate(service, {
      onSuccess: () => setSubmitted(true),
      onError: () => setButtonText("Create New Service"),
    });
  };

  const resetForm = () => {
    setService(EMPTY_SERVICE);
    setPricingDraft(EMPTY_PRICING);
    setTouched({});
    setSubmitted(false);
    setButtonText("Create New Service");
  };

  const handleCancel = () => {
    resetForm();
    navigate("/");
  };

  if (submitted) {
    return (
      <section className="contact">
        <NavBar />
        <Container style={{ marginTop: 100 }}>
          <div className="admin-add-service-success-container">
            <h4>The new service was created successfully!</h4>
            <button className="btn btn-success" onClick={resetForm}>
              Add Another
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>New Service Details</h2>

                  {/* Title + Image */}
                  {["title", "image"].map((field) => (
                    <Row key={field}>
                      <div>{field.toUpperCase()}</div>
                      <input
                        name={field}
                        value={service[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="admin-add-service-form-input"
                      />
                      {touched[field] && (
                        <FormError msg={getError(field, service[field])} />
                      )}
                    </Row>
                  ))}

                  {/* Description */}
                  <Row>
                    <div>Description</div>
                    <textarea
                      name="description"
                      rows={6}
                      value={service.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="admin-add-service-form-input"
                      style={{ marginTop: "20px" }}
                    />
                    {touched.description && (
                      <FormError
                        msg={getError("description", service.description)}
                      />
                    )}
                  </Row>

                  {/* Pricing Form */}
                  {showPricingForm && (
                    <>
                      <h4 style={{ marginTop: "30px" }}>
                        Add Pricing Detail
                      </h4>

                      {["type", "price", "description"].map((field) => (
                        <Row key={field}>
                          <div>{field.toUpperCase()}</div>
                          <input
                            name={field}
                            value={pricingDraft[field]}
                            onChange={handlePricingChange}
                            className="admin-add-service-form-input"
                          />
                        </Row>
                      ))}

                      <button
                        className="admin-btn"
                        onClick={addPricingDetail}
                      >
                        Add Detail
                      </button>
                    </>
                  )}

                  {/* Buttons */}
                  <Row className="admin-add-service-btn-container">
                    <button className="admin-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                    <button
                      className="admin-btn"
                      onClick={() => setShowPricingForm(true)}
                    >
                      Add Pricing Detail
                    </button>
                    <button
                      className="admin-btn"
                      onClick={submitService}
                    >
                      {buttonText}
                    </button>
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

export default CreateServiceOffering;
