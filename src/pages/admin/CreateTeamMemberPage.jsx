import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

import AdminPageHeader from "../../features/admin/components/AdminPageHeader";
import CreateTeamMemberForm from "../../features/admin/team/CreateTeamMemberForm";

import { useCreateTeamMember } from "../../features/admin/team/hooks";
import useAdminForm from "../../features/admin/hooks/useAdminForm";

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

const CreateTeamMemberPage = () => {
  const navigate = useNavigate();
  const createTeamMember = useCreateTeamMember();
  const [submitted, setSubmitted] = useState(false);

  const form = useAdminForm({
    initialValues: EMPTY_FORM,
    validators,
    errorMessages,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.validateBeforeSubmit()) return;

    createTeamMember.mutate(form.values, {
      onSuccess: () => setSubmitted(true),
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
        <button onClick={() => setSubmitted(false)}>
          Add Another
        </button>
      </>
    );
  }

  return (
    <>
      <AdminPageHeader
        title="New Team Member Details"
        subtitle="Fill out the fields below..."
      />

      <CreateTeamMemberForm
        form={form}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
};

export default CreateTeamMemberPage;