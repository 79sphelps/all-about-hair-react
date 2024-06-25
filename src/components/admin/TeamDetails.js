import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { NavBar } from "../NavBar.js";
import { Loading } from "../Loading.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import { getTeamDetails, deleteTeamMember } from "../../api/index.js";

export const TeamDetails = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // const access_token = useAuth0().getAccessTokenSilently();

  const formInitialDetails = {
    name: "",
    role: "",
    bio: "",
    photo: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Edit");

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    navigate(`/admin/team-member-edit/${id}`, { state: { id: id } });
  };

  let {
    isLoading,
    isError,
    data: teamInfo,
    error,
  } = useQuery({
    queryKey: ["teamInfo"],
    queryFn: getTeamDetails, // fetch the posts using the async call
    // onSuccess: (data) => setBannerDetails(data),
  });

  const deleteTeamMemberMutation = useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteTeamMember"] });
      // navigate("/");
    },
  });

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteTeamMemberMutation.mutate(id);
  };

  if (isLoading) return <Loading />;
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
                  <h2>Update Services Details</h2>
                  <form>
                    {teamInfo &&
                      teamInfo.map((member, idx) => {
                        return (
                          <Row key={member._id}>
                            <Col lg={2} className="px-1">
                              <div>Name: {member.name}</div>
                              <div>Role: {member.role}</div>
                              <img src={require("../../" + member.photo)}></img>
                            </Col>
                            <Col size={12} className="px-1">
                              <div
                                style={{
                                  border: "1px solid rgba(255, 255, 255, 0.5)",
                                  marginTop: "25px",
                                  borderRadius: "25px",
                                  padding: "20px",
                                }}
                              >
                                Bio: <br />{member.bio}
                              </div>

                              <button
                                style={{ marginRight: "20px" }}
                                onClick={(e) => handleEdit(e, member._id)}
                              >
                                <span>{buttonText}</span>
                              </button>
                              <button
                                onClick={(e) => handleDelete(e, member._id)}
                              >
                                <span>Delete</span>
                              </button>
                              {/* <button onClick={handleDelete}><span>{deleteBtnText}</span></button> */}
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
