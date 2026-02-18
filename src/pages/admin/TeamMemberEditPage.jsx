import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "animate.css";

import Loading from "../../ui/feedback/LoadingSpinner";
import AccessibleFormField from "../../ui/form/AccessibleFormField";
import AdminFormLayout from "../../components/admin/AdminFormLayout";

import { useTeamMember } from "../../features/admin/hooks/useTeamMember";
import { useUpdateTeamMember } from "../../features/admin/hooks/useUpdateTeamMember";
import useAdminForm from "../../features/admin/hooks/useAdminForm";

/* =========================
   CONSTANTS
========================= */

const EMPTY_FORM = {
  name: "",
  role: "",
  photo: "",
  bio: "",
};

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

/* =========================
   COMPONENT
========================= */

const TeamMemberEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const teamMemberId = location.state?.id;

  const { data: teamMember, isLoading, isError, error } =
    useTeamMember(teamMemberId);

  const updateTeamMember = useUpdateTeamMember();

  const [buttonText, setButtonText] = useState("Update");

  /* =========================
     ADMIN FORM HOOK
  ========================= */

  const form = useAdminForm({
    initialValues: EMPTY_FORM,
    validators,
    errorMessages,
  });

  /* =========================
     INIT DATA
  ========================= */

  useEffect(() => {
    if (teamMember) {
      form.setFormValues({
        name: teamMember.name || "",
        role: teamMember.role || "",
        photo: teamMember.photo || "",
        bio: teamMember.bio || "",
      });
          
    }
  }, [teamMember]);

  /* =========================
     ACTIONS
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.validateBeforeSubmit()) return;

    setButtonText("Updating…");

    updateTeamMember.mutate(
      {
        id: teamMemberId,
        ...form.values,
      },
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

  /* =========================
     STATES
  ========================= */

  if (isLoading) return <Loading />;
  if (isError) return <div role="alert">Error: {error.message}</div>;
  if (!teamMember) return null;

  /* =========================
     UI
  ========================= */

  return (
    <AdminFormLayout title="Update Team Member Details">
      {/* Image preview */}
      {form.values.photo && (
        <div aria-live="polite">
          <img
            src={require(`../../${form.values.photo}`)}
            alt={
              form.values.name
                ? `${form.values.name} profile`
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
          value={form.values.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.name ? form.errors.name : null}
          required
        />

        <AccessibleFormField
          id="role"
          name="role"
          label="Role"
          value={form.values.role}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.role ? form.errors.role : null}
          required
        />

        <AccessibleFormField
          id="photo"
          name="photo"
          label="Image Path"
          value={form.values.photo}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.photo ? form.errors.photo : null}
          required
        />

        <AccessibleFormField
          id="bio"
          name="bio"
          label="Bio"
          as="textarea"
          rows={6}
          value={form.values.bio}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.bio ? form.errors.bio : null}
          description={
            form.values.bio.length < 25
              ? `${25 - form.values.bio.length} characters remaining`
              : undefined
          }
          required
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
            {buttonText}
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
};

export default TeamMemberEditPage;
