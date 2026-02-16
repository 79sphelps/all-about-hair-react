import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

import Loading from "../../Loading";
import AccessibleFormField from "../../contact/AccessibleFormField";
import AdminFormLayout from "../AdminFormLayout";

import { useHomePageDetails } from "../hooks/useHomePageDetails";
import { useUpdateHomePageDetails } from "../hooks/useUpdateHomePageDetails";

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

const HomePageDetailsEdit = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useHomePageDetails();
  const updateHomepageDetails = useUpdateHomePageDetails();

  /** =========================
   * STATE
   ========================== */

  const [formDetails, setFormDetails] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (data?.[0]) {
      setFormDetails(data[0]);
    }
  }, [data]);

  /** =========================
   * VALIDATION
   ========================== */

  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const validateField = (name, value) => {
    if (!value?.trim()) return "This field is required.";

    if (name.includes("SubMsg") || name === "aboutSubMsg") {
      return value.length < 10 ? "Must be at least 10 characters." : "";
    }

    if (name.includes("Headline")) {
      return value.length < 3 ? "Must be at least 3 characters." : "";
    }

    if (name === "aboutImage") {
      return value.length < 6 || !value.includes("/")
        ? "Enter a valid image path."
        : "";
    }

    if (name === "aboutVideoLink") {
      return isValidUrl(value) ? "" : "Enter a valid URL.";
    }

    return "";
  };

  /** =========================
   * HANDLERS (BEST UX)
   ========================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    // live validation ONLY after touched
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
   * SUBMIT VALIDATION
   ========================== */

  const validateBeforeSubmit = () => {
    const newErrors = {};
    const newTouched = {};

    Object.entries(formDetails).forEach(([name, value]) => {
      newTouched[name] = true;
      const err = validateField(name, value);
      if (err) newErrors[name] = err;
    });

    setErrors(newErrors);
    setTouched(newTouched);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateBeforeSubmit()) return;

    updateHomepageDetails.mutate(
      {
        id: data[0]._id,
        ...formDetails,
      },
      {
        onSuccess: () => setUpdateSuccess(true),
      }
    );
  };

  /** =========================
   * STATES
   ========================== */

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

  /** =========================
   * UI
   ========================== */

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

      <form onSubmit={handleSubmit}>
        {FIELDS.map(([label, name]) => (
          <AccessibleFormField
            key={name}
            id={name}
            name={name}
            label={label}
            value={formDetails[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched[name] ? errors[name] : ""}
            required
          />
        ))}

        <AccessibleFormField
          id="aboutSubMsg"
          name="aboutSubMsg"
          label="About Section Sub Message"
          as="textarea"
          rows={6}
          value={formDetails.aboutSubMsg}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.aboutSubMsg ? errors.aboutSubMsg : ""}
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

export default HomePageDetailsEdit;
