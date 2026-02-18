import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

import AccessibleFormField from "../../ui/form/AccessibleFormField";

import { useCreateService } from "../../features/admin/hooks/useCreateService";
import useAdminForm from "../../features/admin/hooks/useAdminForm";

/* =========================
   CONSTANTS
========================= */

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

/* =========================
   VALIDATORS
========================= */

const validators = {
  title: (v) => /^[A-Za-z0-9_ ']{5,}$/.test(v),
  image: (v) => /^[A-Za-z0-9_ /.']{5,}$/.test(v),
  description: (v) => /^[A-Za-z0-9_ .']{10,}$/.test(v),
  type: (v) => /^[A-Za-z0-9_ ']{5,}$/.test(v),
  price: (v) => /^[A-Za-z0-9_ .$\-']{3,}$/.test(v),
};

const errorMessages = {
  title: "Invalid title.",
  image: "Invalid image path.",
  description: "Invalid description.",
  type: "Invalid type.",
  price: "Invalid price.",
};

/* =========================
   COMPONENT
========================= */

const CreateServicePage = () => {
  const navigate = useNavigate();
  const createService = useCreateService();

  const [submitted, setSubmitted] = useState(false);
  const [showPricingForm, setShowPricingForm] = useState(false);
  const [buttonText, setButtonText] = useState("Create New Service");

  /* =========================
     MAIN FORM HOOK
  ========================= */

  const serviceForm = useAdminForm({
    initialValues: EMPTY_SERVICE,
    validators: {
      title: validators.title,
      image: validators.image,
      description: validators.description,
    },
    errorMessages,
  });

  /* =========================
     PRICING DRAFT HOOK
  ========================= */

  const pricingForm = useAdminForm({
    initialValues: EMPTY_PRICING,
    validators: {
      type: validators.type,
      price: validators.price,
      description: validators.description,
    },
    errorMessages,
  });

  /* =========================
     ACTIONS
  ========================= */

  const addPricingDetail = () => {
    if (!pricingForm.validateBeforeSubmit()) return;

    serviceForm.setValues((prev) => ({
      ...prev,
      pricing: [...prev.pricing, pricingForm.values],
    }));

    pricingForm.resetForm();
    setShowPricingForm(false);
  };

  const submitService = (e) => {
    e.preventDefault();

    if (!serviceForm.validateBeforeSubmit()) return;

    setButtonText("Creating Service…");

    createService.mutate(serviceForm.values, {
      onSuccess: () => setSubmitted(true),
      onError: () => setButtonText("Create New Service"),
    });
  };

  const resetForm = () => {
    serviceForm.resetForm();
    pricingForm.resetForm();
    setSubmitted(false);
    setButtonText("Create New Service");
  };

  const handleCancel = () => {
    resetForm();
    navigate("/");
  };

  /* =========================
     SUCCESS STATE
  ========================= */

  if (submitted) {
    return (
      <>
        <h1>Service Created</h1>
        <div role="status" aria-live="polite">
          <h4>The new service was created successfully!</h4>
          <button className="btn btn-success" onClick={resetForm}>
            Add Another
          </button>
        </div>
      </>
    );
  }

  /* =========================
     UI
  ========================= */

  return (
    <>
      <h1>New Service Details</h1>
      <form onSubmit={submitService} noValidate>
        <AccessibleFormField
          id="title"
          name="title"
          label="Title"
          value={serviceForm.values.title}
          onChange={serviceForm.handleChange}
          onBlur={serviceForm.handleBlur}
          error={serviceForm.touched.title ? serviceForm.errors.title : null}
          required
        />

        <AccessibleFormField
          id="image"
          name="image"
          label="Image Path"
          value={serviceForm.values.image}
          onChange={serviceForm.handleChange}
          onBlur={serviceForm.handleBlur}
          error={serviceForm.touched.image ? serviceForm.errors.image : null}
          required
        />

        <AccessibleFormField
          id="description"
          name="description"
          label="Description"
          as="textarea"
          rows={6}
          value={serviceForm.values.description}
          onChange={serviceForm.handleChange}
          onBlur={serviceForm.handleBlur}
          error={
            serviceForm.touched.description
              ? serviceForm.errors.description
              : null
          }
          required
        />

        {showPricingForm && (
          <>
            <h4 style={{ marginTop: 30 }}>Add Pricing Detail</h4>

            <AccessibleFormField
              id="type"
              name="type"
              label="Type"
              value={pricingForm.values.type}
              onChange={pricingForm.handleChange}
              onBlur={pricingForm.handleBlur}
              error={pricingForm.touched.type ? pricingForm.errors.type : null}
              required
            />

            <AccessibleFormField
              id="price"
              name="price"
              label="Price"
              value={pricingForm.values.price}
              onChange={pricingForm.handleChange}
              onBlur={pricingForm.handleBlur}
              error={
                pricingForm.touched.price ? pricingForm.errors.price : null
              }
              required
            />

            <AccessibleFormField
              id="pricing-description"
              name="description"
              label="Description"
              value={pricingForm.values.description}
              onChange={pricingForm.handleChange}
              onBlur={pricingForm.handleBlur}
              error={
                pricingForm.touched.description
                  ? pricingForm.errors.description
                  : null
              }
              required
            />

            <button
              type="button"
              className="admin-btn"
              onClick={addPricingDetail}
            >
              Add Detail
            </button>
          </>
        )}

        <div className="admin-btn-container">
          <button type="button" className="admin-btn" onClick={handleCancel}>
            Cancel
          </button>

          <button
            type="button"
            className="admin-btn"
            onClick={() => setShowPricingForm(true)}
          >
            Add Pricing Detail
          </button>

          <button type="submit" className="admin-btn">
            {buttonText}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateServicePage;
