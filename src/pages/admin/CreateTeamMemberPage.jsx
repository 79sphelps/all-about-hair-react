import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

import AdminPageHeader from "../../features/admin/components/AdminPageHeader";
import AdminFormBuilder from "../../features/admin/components/AdminFormBuilder";

import { useCreateTeamMember } from "../../features/admin/team/hooks";
import useAdminForm from "../../features/admin/hooks/useAdminForm";
import { teamMemberFormConfig } from "../../features/admin/team/teamMember.form";

const CreateTeamMemberPage = () => {
  const navigate = useNavigate();
  const createTeamMember = useCreateTeamMember();
  const [submitted, setSubmitted] = useState(false);

  const form = useAdminForm({
    schema: teamMemberFormConfig.schema,
    defaultValues: teamMemberFormConfig.defaultValues,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.validateBeforeSubmit()) return;

    createTeamMember.mutate(form.values, {
      onSuccess: () => {
        setSubmitted(true);
      },
    });
  };

  const resetForm = () => {
    form.resetForm();
    setSubmitted(false);
  };

  const handleCancel = () => {
    resetForm();
    navigate("/admin/team-details");
  };

  if (submitted) {
    return (
      <>
        <AdminPageHeader title="Team Member Created" />
        <div className="admin-btn-container">
          <button className="admin-btn" onClick={resetForm}>
            Add Another
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminPageHeader
        title="New Team Member Details"
        subtitle="Fill out the fields below..."
      />

      <form onSubmit={handleSubmit} noValidate>
        <AdminFormBuilder
          form={form}
          fields={teamMemberFormConfig.fields}
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
            Create Team Member
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateTeamMemberPage;
