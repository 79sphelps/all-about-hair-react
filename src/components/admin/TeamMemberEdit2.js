import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";
import { useForm } from "react-hook-form";

import NavBar from "../../ui/NavBar";
import Loading from "../Loading";

import { useTeamMember } from "./hooks/useTeamMember";
import { useUpdateTeamMember } from "./hooks/useUpdateTeamMember";

const ValidationError = ({ fieldError }) => {
  if (!fieldError) return null;
  return (
    <div role="alert" style={{ color: "red", marginTop: 2, marginBottom: 2 }}>
      {fieldError.message}
    </div>
  );
};

const TeamMemberEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const teamMemberId = location.state?.id;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  const [bio] = watch(["bio"]);
  const [buttonText, setButtonText] = useState("Update");

  /** Fetch team member */
  const {
    data: teamMember,
    isLoading,
    isError,
    error,
  } = useTeamMember(teamMemberId);

  /** Update mutation */
  const updateTeamMember = useUpdateTeamMember();

  /** Populate form once data loads */
  useEffect(() => {
    if (teamMember) {
      setValue("name", teamMember.name);
      setValue("role", teamMember.role);
      setValue("photo", teamMember.photo);
      setValue("bio", teamMember.bio);
    }
  }, [teamMember, setValue]);

  const onSubmit = (formData) => {
    setButtonText("Updating...");

    updateTeamMember.mutate(
      {
        id: teamMemberId,
        ...formData,
      },
      {
        onSuccess: () => {
          setButtonText("Update");
          navigate("/admin/team-details");
        },
      }
    );
  };

  const handleCancel = () => {
    navigate("/admin/team-details");
  };

  const getEditorStyle = (fieldError) => {
    return fieldError ? "border: solid 1px red" : "";
  };

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;
  if (!teamMember) return null;

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Update Team Member Details</h2>

                  {getValues("photo") && (
                    <img
                      src={require("../../" + getValues("photo"))}
                      alt=""
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0 3px 3px 5px rgba(155, 88, 173, 0.65)",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                  )}

                  <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <div>Name:</div>
                      <input
                        className={getEditorStyle(errors.name)}
                        type="text"
                        {...register("name", {
                          required: "Please provide a valid team member name",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                      />
                      <ValidationError fieldError={errors.name} />
                    </Row>

                    <Row>
                      <div>Role:</div>
                      <input
                        className={getEditorStyle(errors.role)}
                        type="text"
                        {...register("role", {
                          required:
                            "Please provide a valid member role describing what they do",
                          minLength: {
                            value: 5,
                            message: "Role must be at least 5 characters",
                          },
                        })}
                      />
                      <ValidationError fieldError={errors.role} />
                    </Row>

                    <Row>
                      <div>Image Path:</div>
                      <input
                        className={getEditorStyle(errors.photo)}
                        type="text"
                        {...register("photo", {
                          required:
                            "Please provide a valid image path for the team member",
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
                        {...register("bio", {
                          required:
                            "Please provide a valid biography (min 25 chars)",
                          minLength: {
                            value: 25,
                            message: "Bio must be at least 25 characters",
                          },
                        })}
                      />
                      {bio && bio.length < 25 && (
                        <div>({25 - bio.length} characters remaining)</div>
                      )}
                      <ValidationError fieldError={errors.bio} />
                    </Row>

                    <Row>
                      <Col className="px-1">
                        <button
                          type="submit"
                          disabled={!isValid || updateTeamMember.isLoading}
                          style={{
                            marginRight: "20px",
                            cursor:
                              !isValid || updateTeamMember.isLoading
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          {buttonText}
                        </button>

                        <button type="button" onClick={handleCancel}>
                          Cancel
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TeamMemberEdit;
