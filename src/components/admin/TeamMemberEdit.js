import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "animate.css";

import Loading from "../Loading";
import AccessibleFormField from "../contact/AccessibleFormField";
import AdminFormLayout from "./AdminFormLayout";

import { useTeamMember } from "./hooks/useTeamMember";
import { useUpdateTeamMember } from "./hooks/useUpdateTeamMember";

const EMPTY_FORM = {
  name: "",
  role: "",
  photo: "",
  bio: "",
};

/** =========================
 * VALIDATORS
 ========================== */

const validators = {
  name: (v) => v.trim().length >= 2,
  role: (v) => v.trim().length >= 5,
  photo: (v) => v.trim().length >= 10,
  bio: (v) => v.trim().length >= 25,
};

const errorMessages = {
  name: "Name must be at least 2 characters.",
  role: "Role must be at least 5 characters.",
  photo: "Image path must be at least 10 characters.",
  bio: "Bio must be at least 25 characters.",
};

const TeamMemberEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const teamMemberId = location.state?.id;

  const { data: teamMember, isLoading, isError, error } =
    useTeamMember(teamMemberId);

  const updateTeamMember = useUpdateTeamMember();

  /** =========================
   * STATE
   ========================== */
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState("Update");

  /** =========================
   * INITIALIZE FORM
   ========================== */

  useEffect(() => {
    if (teamMember) {
      setFormData({
        name: teamMember.name || "",
        role: teamMember.role || "",
        photo: teamMember.photo || "",
        bio: teamMember.bio || "",
      });
    }
  }, [teamMember]);

  /** =========================
   * VALIDATION
   ========================== */

  const validateField = (name, value) => {
    if (!validators[name]) return;

    setErrors((prev) => ({
      ...prev,
      [name]: validators[name](value)
        ? null
        : { message: errorMessages[name] },
    }));
  };

  const validateAll = () => {
    const newErrors = {};

    Object.keys(validators).forEach((key) => {
      if (!validators[key](formData[key])) {
        newErrors[key] = { message: errorMessages[key] };
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** =========================
   * MAIN FIELD HANDLERS
   ========================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Best UX pattern:
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    validateField(name, value);
  };

  /** =========================
   * ACTIONS
   ========================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    setButtonText("Updating…");

    updateTeamMember.mutate(
      { id: teamMemberId, ...formData },
      {
        onSuccess: () => {
          setButtonText("Update");
          navigate("/admin/team-details");
        },
        onError: () => {
          setButtonText("Update");
        },
      }
    );
  };

  const handleCancel = () => {
    navigate("/admin/team-details");
  };

  /** =========================
   * STATES
   ========================== */

  if (isLoading) return <Loading />;
  if (isError) return <div role="alert">Error: {error.message}</div>;
  if (!teamMember) return null;

  /** =========================
   * UI
   ========================== */

  return (
    <AdminFormLayout title="Update Team Member Details">
      {/* Image Preview */}
      {formData.photo && (
        <div aria-live="polite">
          <img
            src={require(`../../${formData.photo}`)}
            alt={
              formData.name
                ? `${formData.name} profile`
                : "Team member profile"
            }
            style={{
              width: "200px",
              margin: "0 auto 20px",
              display: "block",
              boxShadow: "0 3px 3px 5px rgba(155, 88, 173, 0.65)",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <AccessibleFormField
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name ? errors.name : null}
          required
        />

        <AccessibleFormField
          id="role"
          name="role"
          label="Role"
          value={formData.role}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.role ? errors.role : null}
          required
        />

        <AccessibleFormField
          id="photo"
          name="photo"
          label="Image Path"
          value={formData.photo}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.photo ? errors.photo : null}
          required
        />

        <AccessibleFormField
          id="bio"
          name="bio"
          label="Bio"
          as="textarea"
          rows={6}
          value={formData.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.bio ? errors.bio : null}
          description={
            formData.bio.length < 25
              ? `${25 - formData.bio.length} characters remaining`
              : undefined
          }
          required
        />

        <div className="admin-btn-container">
          <button type="submit" className="admin-btn">
            {buttonText}
          </button>

          <button
            type="button"
            className="admin-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
};

export default TeamMemberEdit;
