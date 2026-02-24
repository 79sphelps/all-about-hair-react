import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Loading from "../../ui/feedback/LoadingSpinner";
import AdminPageHeader from "../../features/admin/components/AdminPageHeader";
import AdminFormBuilder from "../../features/admin/components/AdminFormBuilder";

import { useService } from "../../features/admin/services/hooks";
import { useUpdateService } from "../../features/admin/services/hooks";
import useAdminForm from "../../features/admin/hooks/useAdminForm";
import { serviceFormConfig } from "../../features/admin/services/service.form";

const ServiceEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceId = location.state?.id;

  const { data: service, isLoading, error } = useService(serviceId);
  const updateService = useUpdateService();

  const form = useAdminForm({
    schema: serviceFormConfig.schema,
    defaultValues: serviceFormConfig.defaultValues,
  });

  useEffect(() => {
    if (service) {
      form.setValues({
        ...service,
        pricing: service.pricing || [],
      });
    }
  }, [service]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.validateBeforeSubmit()) return;

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
  if (!service) return null;

  return (
    <>
      <AdminPageHeader title="Update Service Details" />

      <form onSubmit={handleSubmit} noValidate>
        <AdminFormBuilder
          form={form}
          fields={serviceFormConfig.fields}
        />
        <div className="admin-btn-container">
          <button
            type="button"
            className="admin-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="admin-btn">
            Update Service Details
          </button>
        </div>
      </form>
    </>
  );
};

export default ServiceEditPage;
