import { useEffect, useState } from "react";
import "animate.css";

import Loading from "../../ui/feedback/LoadingSpinner";
import AdminPageHeader from "../../features/admin/components/AdminPageHeader";
import AdminFormBuilder from "../../features/admin/components/AdminFormBuilder";

import { useHomePageDetails } from "../../features/admin/homepage/hooks";
import { useUpdateHomePageDetails } from "../../features/admin/homepage/hooks";
import useAdminForm from "../../features/admin/hooks/useAdminForm";
import { homepageFormConfig } from "../../features/admin/homepage/homepage.form";

const HomePageDetailsPage = () => {
  const { data, isLoading, isError, error } = useHomePageDetails();
  const updateHomepageDetails = useUpdateHomePageDetails();

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const form = useAdminForm({
    schema: homepageFormConfig.schema,
    defaultValues: homepageFormConfig.defaultValues,
  });

  useEffect(() => {
    if (data?.[0]) {
      form.setValues(data[0]);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateSuccess(false);

    if (!form.validateBeforeSubmit()) return;

    updateHomepageDetails.mutate(
      {
        id: data[0]._id,
        ...form.values,
      },
      {
        onSuccess: () => setUpdateSuccess(true),
      },
    );
  };

  if (isLoading) return <Loading />;
  if (isError) return <div role="alert">Error: {error.message}</div>;
  if (!data?.length) return null;

  return (
    <>
      <AdminPageHeader
        title="Update Homepage Details"
        subtitle="Modify homepage content and click update."
      />

      {updateSuccess && (
        <div role="status" aria-live="polite" className="mb-3">
          Homepage details successfully updated.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <AdminFormBuilder
          form={form}
          fields={homepageFormConfig.fields}
        />
        <div className="admin-btn-container">
          <button type="submit" className="admin-btn">
            Update Homepage Details
          </button>
        </div>
      </form>
    </>
  );
};

export default HomePageDetailsPage;
