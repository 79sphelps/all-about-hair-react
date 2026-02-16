import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrackVisibility from "react-on-screen";
import "animate.css";

import NavBar from "../../ui/NavBar";
import AdminFormLayout from "./AdminFormLayout";
import AccessibleFormField from "../contact/AccessibleFormField";

import { useCreateTeamMember } from "./hooks/useCreateTeamMember";
import useAdminForm from "./hooks/useAdminForm";

/* =========================
   CONSTANTS
========================= */

const EMPTY_FORM = {
  name: "",
  role: "",
  photo: "",
  bio: "",
};

/* =========================
   VALIDATION
========================= */

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

const CreateTeamMember2 = () => {
  const navigate = useNavigate();
  const createTeamMember = useCreateTeamMember();

  const [submitted, setSubmitted] = useState(false);

  /* =========================
     ADMIN FORM HOOK
  ========================= */

  const form = useAdminForm({
    initialValues: EMPTY_FORM,
    validators,
    errorMessages,
  });

  /* =========================
     ACTIONS
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.validateBeforeSubmit()) return;

    createTeamMember.mutate(form.values, {
      onSuccess: () => {
        setSubmitted(true);
      },
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleAddAnother = () => {
    form.resetForm();
    setSubmitted(false);
  };

  /* =========================
     SUCCESS STATE
  ========================= */

  if (submitted) {
    return (
      <section className="contact">
        <NavBar />

        <AdminFormLayout title="Team Member Created">
          <div role="status" aria-live="polite">
            <h4>The new team member was created successfully!</h4>
            <button
              className="btn btn-success"
              onClick={handleAddAnother}
            >
              Add Another Team Member
            </button>
          </div>
        </AdminFormLayout>
      </section>
    );
  }

  /* =========================
     UI
  ========================= */

  return (
    <section className="contact">
      <NavBar />

      <AdminFormLayout
        title="New Team Member Details"
        subtitle="Fill out the fields below to create a new team member."
      >
        <TrackVisibility once>
          {({ isVisible }) => (
            <div
              className={isVisible ? "animate__animated animate__fadeIn" : ""}
            >
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
                      : null
                  }
                  required
                />

                <div className="admin-btn-container">
                  <button type="submit" className="admin-btn">
                    Create Team Member
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
            </div>
          )}
        </TrackVisibility>
      </AdminFormLayout>
    </section>
  );
};

export default CreateTeamMember2;
