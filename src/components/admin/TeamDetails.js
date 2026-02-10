import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";

import NavBar from "../../ui/NavBar";
import Loading from "../Loading";

import { useTeamMembers } from "./hooks/useTeamMember";
import { useDeleteTeamMember } from "./hooks/useDeleteTeamMember";

const TeamDetails = () => {
  const navigate = useNavigate();

  const { data: team, isLoading, error } = useTeamMembers();
  const deleteTeamMember = useDeleteTeamMember();

  const handleEdit = (memberId) => {
    navigate(`/admin/team-member-edit/${memberId}`, { state: { id: memberId } });
  };

  const handleDelete = (memberId) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      deleteTeamMember.mutate(memberId);
    }
  };

  if (isLoading || !team) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          <Col>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
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
                        <div><strong>Name:</strong> {member.name}</div>
                        <div><strong>Role:</strong> {member.role}</div>
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
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TeamDetails;
