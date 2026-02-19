import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "animate.css";

import Loading from "../../ui/feedback/LoadingSpinner";

import { useTeamMembers } from "../../features/admin/team/hooks";
import { useDeleteTeamMember } from "../../features/admin/team/hooks";

const TeamDetailsPage = () => {
  const navigate = useNavigate();

  const { data: team, isLoading, error } = useTeamMembers();
  const deleteTeamMember = useDeleteTeamMember();

  const handleEdit = (memberId) => {
    navigate(`/admin/team-member-edit/${memberId}`, {
      state: { id: memberId },
    });
  };

  const handleDelete = (memberId) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      deleteTeamMember.mutate(memberId);
    }
  };

  if (isLoading || !team) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h2>Team Members</h2>
      {team.map((member) => (
        <Row
          key={member._id}
          style={{
            marginBottom: 20,
            padding: 15,
            border: "1px solid white",
            borderRadius: 15,
          }}
        >
          {/* Name, Role & Photo */}
          <Col lg={2} className="px-1">
            <div>
              <strong>Name:</strong> {member.name}
            </div>
            <div>
              <strong>Role:</strong> {member.role}
            </div>
            {member.photo && (
              <img
                src={require(`../../${member.photo}`)}
                alt={member.name}
                style={{ width: "100%", borderRadius: "8px", marginTop: "5px" }}
              />
            )}
          </Col>

          {/* Bio & Actions */}
          <Col lg={10} className="px-1">
            <div style={{ marginTop: "5px" }}>
              <strong>Bio:</strong>
              <p>{member.bio}</p>
            </div>

            <div>
              <button
                className="admin-btn me-2"
                onClick={() => handleEdit(member._id)}
              >
                Edit
              </button>
              <button
                className="admin-btn"
                onClick={() => handleDelete(member._id)}
              >
                Delete
              </button>
            </div>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default TeamDetailsPage;
