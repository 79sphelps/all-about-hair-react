import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "animate.css";

import Loading from "../../ui/feedback/LoadingSpinner";
import AdminPageHeader from "../../features/admin/components/AdminPageHeader";
import AdminFormBuilder from "../../features/admin/components/AdminFormBuilder";

import { useTeamMember, useUpdateTeamMember } from "../../features/admin/team/hooks";
import useAdminForm from "../../features/admin/hooks/useAdminForm";
import { teamMemberFormConfig } from "../../features/admin/team/teamMember.form";

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
    schema: teamMemberFormConfig.schema,
    defaultValues: teamMemberFormConfig.defaultValues,
  });

  // Populate form once data loads
  useEffect(() => {
    if (teamMember) {
      form.setValues({
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
      }
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

      {/* Image Preview */}
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
            {buttonText}
          </button>
        </div>
      </form>
    </>
  );
};

export default TeamMemberEditPage;
