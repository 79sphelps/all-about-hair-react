import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Loading from "../../ui/feedback/LoadingSpinner";
import AccessibleFormField from "../../ui/form/AccessibleFormField";
import AdminFormLayout from "../../components/admin/AdminFormLayout";

import { useService } from "../../features/admin/hooks/useService";
import { useUpdateService } from "../../features/admin/hooks/useUpdateService";
import useAdminForm from "../../features/admin/hooks/useAdminForm";

/* =========================
   CONSTANTS
========================= */

const EMPTY_SERVICE = {
  _id: "",
  title: "",
  image: "",
  description: "",
  pricing: [],
};

const validators = {
  title: (v) => /^[A-Za-z0-9_&, ']{5,}$/.test(v),
  image: (v) => /^[A-Za-z0-9_ /.']{5,}$/.test(v),
  description: (v) => /^[A-Za-z0-9_& .,!']{10,}$/.test(v),
};

const errorMessages = {
  title: "Invalid title",
  image: "Invalid image path",
  description: "Invalid description",
};

const pricingValidators = {
  type: (v) => /^[A-Za-z0-9_ ']{5,}$/.test(v),
  price: (v) => /^[A-Za-z0-9_ .$\-']{3,}$/.test(v),
  description: (v) => /^[A-Za-z0-9_& .,!']{5,}$/.test(v),
};

/* =========================
   COMPONENT
========================= */

const ServiceEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceId = location.state?.id;

  const { data: service, isLoading, error } = useService(serviceId);
  const updateService = useUpdateService();

  const [buttonText, setButtonText] = useState("Update");

  /* =========================
     ADMIN FORM HOOK
  ========================= */

  const form = useAdminForm({
    initialValues: EMPTY_SERVICE,
    validators,
    errorMessages,
  });

  /* =========================
     INIT DATA
  ========================= */

  useEffect(() => {
    if (service) {
      form.setFormValues(service);
    }
  }, [service]);

  /* =========================
     PRICING HELPERS
  ========================= */

  const validatePricingField = (name, value) => {
    return pricingValidators[name]?.(value);
  };

  const handlePricingChange = (idx, e) => {
    const { name, value } = e.target;

    const updated = [...form.values.pricing];
    updated[idx] = { ...updated[idx], [name]: value };

    form.setFormValues((prev) => ({
      ...prev,
      pricing: updated,
    }));

    const key = `pricing-${idx}-${name}`;

    if (form.touched[key]) {
      form.setFieldError(
        key,
        validatePricingField(name, value) ? null : "Invalid value"
      );
    }
  };

  const handlePricingBlur = (idx, e) => {
    const { name, value } = e.target;
    const key = `pricing-${idx}-${name}`;

    form.setFieldTouched(key);

    form.setFieldError(
      key,
      validatePricingField(name, value) ? null : "Invalid value"
    );
  };

  const validatePricingBeforeSubmit = () => {
    let hasErrors = false;

    form.values.pricing.forEach((item, idx) => {
      ["type", "price", "description"].forEach((field) => {
        const key = `pricing-${idx}-${field}`;

        if (!validatePricingField(field, item[field])) {
          form.setFieldError(key, "Invalid value");
          hasErrors = true;
        }
      });
    });

    return !hasErrors;
  };

  /* =========================
     ACTIONS
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const mainValid = form.validateBeforeSubmit();
    const pricingValid = validatePricingBeforeSubmit();

    if (!mainValid || !pricingValid) return;

    setButtonText("Updating…");

    updateService.mutate(
      {
        id: form.values._id,
        ...form.values,
      },
      {
        onSuccess: () => navigate("/admin/services-details"),
        onError: () => setButtonText("Update"),
      }
    );
  };

  const handleCancel = () => {
    navigate("/admin/services-details");
  };

  /* =========================
     STATES
  ========================= */

  if (isLoading) return <Loading />;
  if (error) return <div role="alert">Error: {error.message}</div>;

  /* =========================
     UI
  ========================= */

  return (
    <AdminFormLayout title="Update Service Details">
      <form onSubmit={handleSubmit} noValidate>
        <AccessibleFormField
          id="title"
          name="title"
          label="Title"
          value={form.values.title}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.title ? form.errors.title : null}
          required
        />

        <AccessibleFormField
          id="image"
          name="image"
          label="Image Path"
          value={form.values.image}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.image ? form.errors.image : null}
          required
        />

        <AccessibleFormField
          id="description"
          name="description"
          label="Description"
          as="textarea"
          rows={6}
          value={form.values.description}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.description ? form.errors.description : null}
          required
        />

        <h3 style={{ marginTop: 30 }}>Pricing Details</h3>

        {form.values.pricing.map((item, idx) => (
          <div key={idx}>
            {["type", "price", "description"].map((field) => {
              const key = `pricing-${idx}-${field}`;

              return (
                <AccessibleFormField
                  key={key}
                  id={key}
                  name={field}
                  label={field}
                  value={item[field]}
                  onChange={(e) => handlePricingChange(idx, e)}
                  onBlur={(e) => handlePricingBlur(idx, e)}
                  error={form.touched[key] ? form.errors[key] : null}
                />
              );
            })}
          </div>
        ))}

        <div className="admin-btn-container">
          <button type="button" className="admin-btn" onClick={handleCancel}>
            Cancel
          </button>

          <button type="submit" className="admin-btn">
            {buttonText}
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
};

export default ServiceEditPage;
