import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "animate.css";
import NavBar from "../NavBar";
import Loading from "../Loading";
import TeamService from "../../api/team.service.js";

const TeamDetails = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleEdit = async (e, id) => {
    e.preventDefault();
    navigate(`/admin/team-member-edit/${id}`, { state: { id: id } });
  };

  const {
    isLoading,
    isError,
    data: teamInfo,
    error,
  } = useQuery({
    queryKey: ["teamInfo"],
    queryFn: TeamService.getTeamDetails,
  });

  const deleteTeamMemberMutation = useMutation({
    mutationFn: TeamService.deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteTeamMember"] });
    },
  });

  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log("id: ", id);
    deleteTeamMemberMutation.mutate(id);
  };

  if (isLoading || teamInfo === undefined) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          {/* <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col> */}
          {/* <Col size={12} md={6}> */}
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Update Team Details</h2>
                  <form>
                    {teamInfo &&
                      teamInfo.map((member, idx) => {
                        return (
                          <Row key={member._id} style={{ marginBottom: 15, padding: 15, border: 'solid 1px white', borderRadius: 15 }}>
                            <Col lg={2} className="px-1">
                              <div><strong>Name</strong>: {member.name}</div>
                              <div><strong>Role</strong>: {member.role}</div>
                              <img
                                src={require("../../" + member.photo)}
                                alt=""
                              ></img>
                            </Col>
                            <Col size={12} className="px-1">
                              <div
                                style={{
                                  // border: "1px solid rgba(255, 255, 255, 0.5)",
                                  // marginTop: "25px",
                                  // borderRadius: "25px",
                                  // padding: "20px",
                                }}
                              >
                                <strong>Bio</strong>: <br />
                                {member.bio}
                              </div>
                              <button
                                style={{ marginRight: "20px" }}
                                onClick={(e) => handleEdit(e, member._id)}
                              >
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={(e) => handleDelete(e, member._id)}
                              >
                                <span>Delete</span>
                              </button>
                            </Col>
                          </Row>
                        );
                      })}
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}
    </section>
  );
};

export default TeamDetails;
