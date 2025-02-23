import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import "animate.css";
import { useForm } from "react-hook-form";
import TeamService from "../../api/team.service.js";
import NavBar from "../NavBar";

const ValidationError = ({ fieldError }) => {
  if (!fieldError) return null;
  return (
    <div role="alert" style={{ color: "red", marginTop: 2, marginBottom: 2 }}>
      {fieldError.message}
    </div>
  );
};

const CreateTeamMember = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });
  const [bio] = watch(["bio"]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [buttonText, setButtonText] = useState("Create");
  let submitted = false;

  const addTeamMemberMutation = useMutation({
    mutationFn: TeamService.createTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addTeamMember"] });
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

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit2 = async (e) => {
    handleAddTeamMember(e);
  };

  const newTeamMember = () => {
    submitted = false;
  };

  function getEditorStyle(fieldError) {
    return fieldError ? "border: solid 1px red" : "";
  }

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          {/* {submitted && formDetails ? ( */}
          {submitted ? (
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
                    <form noValidate onSubmit={handleSubmit(handleSubmit2)}>
                      <Row>
                        <div>Name: </div>
                        <input
                            className={getEditorStyle(errors.name)}
                            type="text"
                            id="name"
                            placeholder="Name"
                            {...register("name", {
                              required: "Please provide a valid team member name",
                              minLength: {
                                value: 2,
                                message:
                                  "Name must be at least 2 characters",
                              },
                            })}
                          />
                          <ValidationError fieldError={errors.name} />
                      </Row>
                      <Row>
                        <div>Role: </div>
                        <input
                            className={getEditorStyle(errors.role)}
                            type="text"
                            id="role"
                            placeholder="Role"
                            {...register("role", {
                              required: "Please provide a valid member role describing what they do",
                              minLength: {
                                value: 10,
                                message:
                                  "Role must be at least 10 characters",
                              },
                            })}
                          />
                          <ValidationError fieldError={errors.role} />
                      </Row>
                      <Row>
                        <div>Image Path: </div>
                        <input
                            className={getEditorStyle(errors.photo)}
                            type="text"
                            id="photo"
                            placeholder="Photo"
                            {...register("photo", {
                              required: "Please provide a valid image path for the team member",
                              minLength: {
                                value: 10,
                                message:
                                  "Photo path must be at least 10 characters",
                              },
                            })}
                          />
                          <ValidationError fieldError={errors.photo} />
                      </Row>
                      <Row>
                        <div>Bio:</div>
                        <textarea
                            className={getEditorStyle(errors.bio)}
                            rows="6"
                            placeholder="Bio (at least 25 characters)"
                            {...register("bio", {
                              required:
                                "Please provide a valid message for the biography of at least 25 characters",
                              minLength: {
                                value: 25,
                                message:
                                  "Bio must be at least 25 characters",
                              },
                            })}
                          ></textarea>
                          {bio && bio?.length < 25 && (
                            <div>
                              ({25 - bio?.length} bio characters still
                              needed)
                            </div>
                          )}
                          <ValidationError fieldError={errors.bio} />
                      </Row>
                      <Row>
                        <Col size={12} className="px-1">
                        <button
                            type="submit"
                            disabled={!isValid}
                            style={{
                              color: !isValid && "lightgrey",
                              cursor: !isValid && "not-allowed",
                              marginRight: "20px",
                            }}
                          >
                            {buttonText}
                          </button>
                          <button
                            type="button"
                            style={{ marginRight: "20px" }}
                            onClick={handleCancel}
                          >
                            <span>Cancel</span>
                          </button>
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

export default CreateTeamMember;
