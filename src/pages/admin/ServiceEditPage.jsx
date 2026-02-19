import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Loading from "../../ui/feedback/LoadingSpinner";
import AdminPageHeader from "../../features/admin/components/AdminPageHeader";
import EditServiceForm from "../../features/admin/services/EditServiceForm";

import { useService } from "../../features/admin/services/hooks";
import { useUpdateService } from "../../features/admin/services/hooks";
import useAdminForm from "../../features/admin/hooks/useAdminForm";

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

const ServiceEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceId = location.state?.id;

  const { data: service, isLoading, error } = useService(serviceId);
  const updateService = useUpdateService();

  const form = useAdminForm({
    initialValues: EMPTY_SERVICE,
    validators,
    errorMessages,
  });

  useEffect(() => {
    if (service) {
      form.setFormValues(service);
    }
  }, [service]);

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
        validatePricingField(name, value) ? null : "Invalid value",
      );
    }
  };

  const handlePricingBlur = (idx, e) => {
    const { name, value } = e.target;
    const key = `pricing-${idx}-${name}`;

    form.setFieldTouched(key);

    form.setFieldError(
      key,
      validatePricingField(name, value) ? null : "Invalid value",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const mainValid = form.validateBeforeSubmit();
    const pricingValid = validatePricingBeforeSubmit();

    if (!mainValid || !pricingValid) return;

    updateService.mutate(
      {
        id: form.values._id,
        ...form.values,
      },
      {
        onSuccess: () => navigate("/admin/services-details"),
      },
    );
  };

  const handleCancel = () => {
    navigate("/admin/services-details");
  };

  if (isLoading) return <Loading />;
  if (error) return <div role="alert">Error: {error.message}</div>;

  return (
    <>
      <AdminPageHeader title="Update Service Details" />

      <EditServiceForm
        form={form}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        handlePricingChange={handlePricingChange}
        handlePricingBlur={handlePricingBlur}
      />
    </>
  );
};

export default ServiceEditPage;
