import { useEffect, useState } from "react";
import "animate.css";

import Loading from "../../ui/feedback/LoadingSpinner";
import AdminPageHeader from "../../features/admin/components/AdminPageHeader";
import HomePageDetailsForm from "../../features/admin/homepage/HomePageDetailsForm";

import { useHomePageDetails } from "../../features/admin/homepage/hooks";
import { useUpdateHomePageDetails } from "../../features/admin/homepage/hooks";
import useAdminForm from "../../features/admin/hooks/useAdminForm";

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

const HomePageDetailsPage = () => {
  const { data, isLoading, isError, error } = useHomePageDetails();
  const updateHomepageDetails = useUpdateHomePageDetails();

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const form = useAdminForm({
    initialValues: EMPTY_FORM,
    validators,
    errorMessages,
  });

  useEffect(() => {
    if (data?.[0]) {
      form.setFormValues(data[0]);
    }
  }, [data]);

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
      },
    );
  };

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

  return (
    <>
      <AdminPageHeader title="Update Homepage Details" subtitle="Modify homepage content and click update." />

      {updateSuccess && (
        <div role="status" aria-live="polite" className="mb-3">
          Homepage details successfully updated.
        </div>
      )}

      <HomePageDetailsForm 
        fields={FIELDS}
        onSubmit={handleSubmit}
        form={form}
      />
    </>
  );
};

export default HomePageDetailsPage;
