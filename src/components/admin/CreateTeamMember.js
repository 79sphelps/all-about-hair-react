import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { NavBar } from "../NavBar.js";
// import { Footer } from "../Footer.js";
// import { Loading } from "../Loading.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeamMember } from "../../api/index.js";
// import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export const CreateTeamMember = () => {
  //   const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const access_token = useAuth0().getAccessTokenSilently();

  let formInitialDetails = {
    name: "",
    role: "",
    photo: "",
    bio: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);

  const [buttonText, setButtonText] = useState("Create");
  // const [resetText, setResetText] = useState('Reset');
  // const [status, setStatus] = useState({});
  let submitted = false;

  const addTeamMemberMutation = useMutation({
    mutationFn: createTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addTeamMember"] });
      console.log("success bro!");
      setTimeout(() => {
        setButtonText("Create");
      }, 2000);
        navigate("/admin/team-details");
    },
  });

  const handleAddTeamMember = (member) => {
    setButtonText("Creating...");
    addTeamMemberMutation.mutate({
      id: uuidv4(),
      ...member,
    });
  };

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleCancel = () => {
    setFormDetails(formInitialDetails);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddTeamMember(formDetails);
  };

  const newTeamMember = () => {
    setFormDetails(formInitialDetails);
    submitted = false;
  };

  return (
    <section className="contact">
      <NavBar />

      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          {submitted && formDetails ? (
            <div>
              <h4>The new team member was created successfully!</h4>
              <button
                className="btn btn-success"
                onClick={() => newTeamMember()}
              >
                Add
              </button>
            </div>
          ) : (
            <Col>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__fadeIn" : ""
                    }
                  >
                    <h2>New Team Member Details</h2>
                    <form>
                      <Row>
                        <div>Name: </div>
                        <input
                          type="text"
                          value={formDetails.name}
                          onChange={(e) => onFormUpdate("name", e.target.value)}
                        />
                      </Row>
                      <Row>
                        <div>Role: </div>
                        <input
                          type="text"
                          value={formDetails.role}
                          onChange={(e) =>
                            onFormUpdate("role", e.target.value)
                          }
                        />
                      </Row>
                      <Row>
                        <div>Image Path: </div>
                        <input
                          type="text"
                          value={formDetails.photo}
                          onChange={(e) =>
                            onFormUpdate("photo", e.target.value)
                          }
                        />
                      </Row>
                      <Row>
                        <div>Bio:</div>
                        <textarea
                          style={{ marginTop: "25px" }}
                          rows="6"
                          value={formDetails.bio}
                          onChange={(e) => onFormUpdate("bio", e.target.value)}
                        ></textarea>
                      </Row>

                      <Row>
                        <Col size={12} className="px-1">
                          <button
                            style={{ marginRight: "20px" }}
                            onClick={handleSubmit}
                            disabled={buttonText === "Creating..."}
                          >
                            <span>{buttonText}</span>
                          </button>
                          <button
                            style={{ marginRight: "20px" }}
                            onClick={handleCancel}
                          >
                            <span>Cancel</span>
                          </button>
                          {/* <button onClick={handleReset}><span>{resetText}</span></button> */}
                        </Col>
                      </Row>
                    </form>
                  </div>
                )}
              </TrackVisibility>
            </Col>
          )}
        </Row>
      </Container>

      {/* <Footer /> */}
    </section>
  );
};
