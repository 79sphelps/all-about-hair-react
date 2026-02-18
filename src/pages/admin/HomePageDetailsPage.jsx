import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

import Loading from "../../ui/feedback/LoadingSpinner";
import AccessibleFormField from "../../ui/form/AccessibleFormField";
import AdminFormLayout from "../../components/admin/AdminFormLayout";

import { useHomePageDetails } from "../../features/admin/hooks/useHomePageDetails";
import { useUpdateHomePageDetails } from "../../features/admin/hooks/useUpdateHomePageDetails";
import useAdminForm from "../../features/admin/hooks/useAdminForm";

/* =========================
   CONSTANTS
========================= */

const EMPTY_FORM = {
  headline: "",
  headlineSubMsg: "",
  servicesHeadline: "",
  servicesSubMsg: "",
  aboutHeadline: "",
  aboutSubMsg: "",
  aboutImage: "",
  aboutVideoLink: "",
  stylistsHeadline: "",
  stylistsSubMsg: "",
  serviceDetailsHeadline: "",
  serviceDetailsSubMsg: "",
  contactHeadline: "",
  contactSubMsg: "",
};

/* =========================
   VALIDATION
========================= */

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const validators = {
  headline: (v) => v.trim().length >= 3,
  headlineSubMsg: (v) => v.trim().length >= 10,
  servicesHeadline: (v) => v.trim().length >= 3,
  servicesSubMsg: (v) => v.trim().length >= 10,
  aboutHeadline: (v) => v.trim().length >= 3,
  aboutSubMsg: (v) => v.trim().length >= 10,
  aboutImage: (v) => v.trim().length >= 6 && v.includes("/"),
  aboutVideoLink: (v) => isValidUrl(v),
  stylistsHeadline: (v) => v.trim().length >= 3,
  stylistsSubMsg: (v) => v.trim().length >= 10,
  serviceDetailsHeadline: (v) => v.trim().length >= 3,
  serviceDetailsSubMsg: (v) => v.trim().length >= 10,
  contactHeadline: (v) => v.trim().length >= 3,
  contactSubMsg: (v) => v.trim().length >= 10,
};

const errorMessages = {
  headline: "Headline must be at least 3 characters.",
  headlineSubMsg: "Must be at least 10 characters.",
  servicesHeadline: "Headline must be at least 3 characters.",
  servicesSubMsg: "Must be at least 10 characters.",
  aboutHeadline: "Headline must be at least 3 characters.",
  aboutSubMsg: "Must be at least 10 characters.",
  aboutImage: "Enter a valid image path.",
  aboutVideoLink: "Enter a valid URL.",
  stylistsHeadline: "Headline must be at least 3 characters.",
  stylistsSubMsg: "Must be at least 10 characters.",
  serviceDetailsHeadline: "Headline must be at least 3 characters.",
  serviceDetailsSubMsg: "Must be at least 10 characters.",
  contactHeadline: "Headline must be at least 3 characters.",
  contactSubMsg: "Must be at least 10 characters.",
};

/* =========================
   COMPONENT
========================= */

const HomePageDetailsPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useHomePageDetails();
  const updateHomepageDetails = useUpdateHomePageDetails();

  const [updateSuccess, setUpdateSuccess] = useState(false);

  /* =========================
     ADMIN FORM HOOK
  ========================= */

  const form = useAdminForm({
    initialValues: EMPTY_FORM,
    validators,
    errorMessages,
  });

  /* =========================
     INITIALIZE DATA
  ========================= */

  useEffect(() => {
    if (data?.[0]) {
      form.setFormValues(data[0]);
    }
  }, [data]);

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.validateBeforeSubmit()) return;

    updateHomepageDetails.mutate(
      {
        id: data[0]._id,
        ...form.values,
      },
      {
        onSuccess: () => setUpdateSuccess(true),
      }
    );
  };

  /* ========================= */

  if (isLoading) return <Loading />;
  if (isError) return <div role="alert">Error: {error.message}</div>;
  if (!data?.length) return null;

  const FIELDS = [
    ["Headline", "headline"],
    ["Headline Sub Msg", "headlineSubMsg"],
    ["Services Headline", "servicesHeadline"],
    ["Services Sub Msg", "servicesSubMsg"],
    ["About Section Headline", "aboutHeadline"],
    ["About Image", "aboutImage"],
    ["About Video Link", "aboutVideoLink"],
    ["Stylists Section Headline", "stylistsHeadline"],
    ["Stylists Section Sub Msg", "stylistsSubMsg"],
    ["Service Details Headline", "serviceDetailsHeadline"],
    ["Service Details Sub Msg", "serviceDetailsSubMsg"],
    ["Contact Section Headline", "contactHeadline"],
    ["Contact Section Sub Msg", "contactSubMsg"],
  ];

  /* =========================
     UI
  ========================= */

  return (
    <AdminFormLayout
      title="Update Homepage Details"
      subtitle="Modify homepage content and click update."
    >
      {updateSuccess && (
        <div role="status" aria-live="polite" className="mb-3">
          Homepage details successfully updated.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {FIELDS.map(([label, name]) => (
          <AccessibleFormField
            key={name}
            id={name}
            name={name}
            label={label}
            value={form.values[name]}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched[name] ? form.errors[name] : null}
            required
          />
        ))}

        <AccessibleFormField
          id="aboutSubMsg"
          name="aboutSubMsg"
          label="About Section Sub Message"
          as="textarea"
          rows={6}
          value={form.values.aboutSubMsg}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.aboutSubMsg ? form.errors.aboutSubMsg : null}
          required
        />

        <div className="admin-btn-container">
          <button type="submit" className="admin-btn">
            Update
          </button>

          <button
            type="button"
            className="admin-btn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
};

export default HomePageDetailsPage;
