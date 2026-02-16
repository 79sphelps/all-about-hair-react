import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";

import NavBar from "../../ui/NavBar";
import Loading from "../Loading";
import { FormError, formErrorsCreateService } from "../../lib/common";

import { useService } from "./hooks/useService";
import { useUpdateService } from "./hooks/useUpdateService";

const EMPTY_SERVICE = {
  _id: "",
  title: "",
  image: "",
  description: "",
  pricing: [],
};

const ServiceOfferingEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceId = location.state?.id;

  const { data: service, isLoading, error } = useService(serviceId);
  const updateService = useUpdateService();

  /** =========================
   * FORM STATE (SEPARATED)
   ========================== */
  const [values, setValues] = useState(EMPTY_SERVICE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [buttonText, setButtonText] = useState("Update");

  useEffect(() => {
    if (service) {
      setValues(service);
    }
  }, [service]);

  /** =========================
   * VALIDATION (PURE)
   ========================== */

  const validateField = (name, value) => {
    if (name === "title") {
      return /^[A-Za-z0-9_&, ']{5,}$/.test(value)
        ? ""
        : "Invalid title";
    }

    if (name === "image") {
      return /^[A-Za-z0-9_ /.']{5,}$/.test(value)
        ? ""
        : "Invalid image path";
    }

    if (name === "description") {
      return /^[A-Za-z0-9_& .,!']{10,}$/.test(value)
        ? ""
        : "Invalid description";
    }

    return "";
  };

  const validatePricingField = (name, value) => {
    if (name === "type") {
      return /^[A-Za-z0-9_ ']{5,}$/.test(value)
        ? ""
        : "Invalid type";
    }

    if (name === "price") {
      return /^[A-Za-z0-9_ .$\-']{3,}$/.test(value)
        ? ""
        : "Invalid price";
    }

    if (name === "description") {
      return /^[A-Za-z0-9_& .,!']{5,}$/.test(value)
        ? ""
        : "Invalid description";
    }

    return "";
  };

  /** =========================
   * MAIN FIELD HANDLERS
   ========================== */

  // BEST UX:
  // validate live only AFTER blur
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  /** =========================
   * PRICING HANDLERS
   ========================== */

  const handlePricingChange = (idx, e) => {
    const { name, value } = e.target;

    const updated = [...values.pricing];
    updated[idx] = { ...updated[idx], [name]: value };

    setValues((prev) => ({
      ...prev,
      pricing: updated,
    }));

    const key = `pricing-${idx}-${name}`;

    if (touched[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: validatePricingField(name, value),
      }));
    }
  };

  const handlePricingBlur = (idx, e) => {
    const { name, value } = e.target;
    const key = `pricing-${idx}-${name}`;

    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: validatePricingField(name, value),
    }));
  };

  /** =========================
   * FORM VALIDATION ON SUBMIT
   ========================== */

  const validateForm = () => {
    const newErrors = {};

    ["title", "image", "description"].forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) newErrors[field] = error;
    });

    values.pricing.forEach((item, idx) => {
      ["type", "price", "description"].forEach((field) => {
        const key = `pricing-${idx}-${field}`;
        const error = validatePricingField(field, item[field]);
        if (error) newErrors[key] = error;
      });
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /** =========================
   * ACTIONS
   ========================== */

  const handleUpdate = () => {
    if (!validateForm()) return;

    setButtonText("Updating…");

    updateService.mutate(
      { id: values._id, ...values },
      {
        onSuccess: () => navigate("/admin/services-details"),
      }
    );
  };

  const handleCancel = () => navigate("/admin/services-details");

  /** ========================= */

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

                  <Row>
                    <div>Title</div>
                    <input
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.title && errors.title && (
                      <FormError msg={formErrorsCreateService.title.error} />
                    )}
                  </Row>

                  <Row>
                    <div>Image Path</div>
                    <input
                      name="image"
                      value={values.image}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.image && errors.image && (
                      <FormError msg={formErrorsCreateService.image.error} />
                    )}
                  </Row>

                  <Row>
                    <div>Description</div>
                    <textarea
                      name="description"
                      rows={6}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.description && errors.description && (
                      <FormError msg={formErrorsCreateService.description.error} />
                    )}
                  </Row>

                  <h3>Pricing Details</h3>

                  {values.pricing.map((item, idx) => (
                    <div key={idx}>
                      {["type", "price", "description"].map((field) => {
                        const key = `pricing-${idx}-${field}`;
                        return (
                          <Row key={key}>
                            <div>{field}</div>
                            <input
                              name={field}
                              value={item[field]}
                              onChange={(e) => handlePricingChange(idx, e)}
                              onBlur={(e) => handlePricingBlur(idx, e)}
                            />
                            {touched[key] && errors[key] && (
                              <FormError msg={errors[key]} />
                            )}
                          </Row>
                        );
                      })}
                    </div>
                  ))}

                  <Row>
                    <Col className="admin-edit-service-btn-container">
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
