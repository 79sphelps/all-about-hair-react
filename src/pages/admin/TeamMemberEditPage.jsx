import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "animate.css";

import Loading from "../../ui/feedback/LoadingSpinner";
import AdminPageHeader from "../../features/admin/components/AdminPageHeader";
import EditTeamMemberForm from "../../features/admin/team/EditTeamMemberForm";

import { useTeamMember } from "../../features/admin/team/hooks";
import { useUpdateTeamMember } from "../../features/admin/team/hooks";
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

const TeamMemberEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const teamMemberId = location.state?.id;

  const {
    data: teamMember,
    isLoading,
    isError,
    error,
  } = useTeamMember(teamMemberId);

  const updateTeamMember = useUpdateTeamMember();

  const [buttonText, setButtonText] = useState("Update");

  const form = useAdminForm({
    initialValues: EMPTY_FORM,
    validators,
    errorMessages,
  });

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
      },
    );
  };

  const handleCancel = () => {
    navigate("/admin/team-details");
  };

  if (isLoading) return <Loading />;
  if (isError) return <div role="alert">Error: {error.message}</div>;
  if (!teamMember) return null;

  return (
    <>
      <AdminPageHeader title="Update Team Member Details" />

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

      <EditTeamMemberForm
        form={form}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
};

export default TeamMemberEditPage;
