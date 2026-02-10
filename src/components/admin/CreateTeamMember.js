import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { useForm } from "react-hook-form";
import "animate.css";

import NavBar from "../../ui/NavBar";
import { useCreateTeamMember } from "./hooks/useCreateTeamMember";

const ValidationError = ({ error }) => {
  if (!error) return null;
  return (
    <div
      role="alert"
      style={{ color: "red", marginTop: 4, marginBottom: 8 }}
    >
      {error.message}
    </div>
  );
};

const inputErrorStyle = (error) =>
  error ? { border: "1px solid red" } : undefined;

const CreateTeamMember = () => {
  const navigate = useNavigate();
  const createTeamMember = useCreateTeamMember();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const bio = watch("bio");

  const [submitted, setSubmitted] = useState(false);
  const [buttonText, setButtonText] = useState("Create New Team Member");

  const onSubmit = (formData) => {
    setSubmitted(true);
    setButtonText("Creating Team Member…");

    createTeamMember.mutate(formData, {
      onSuccess: () => {
        setButtonText("Create New Team Member");
      },
    });
  };

  const handleCancel = () => {
    reset();
    navigate("/");
  };

  const handleAddAnother = () => {
    reset();
    setSubmitted(false);
    setButtonText("Create New Team Member");
  };

  return (
    <section className="contact">
      <NavBar />

      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          {submitted ? (
            <div className="admin-add-success-container">
              <h4>The new team member was created successfully!</h4>
              <button className="btn btn-success" onClick={handleAddAnother}>
                Add Another Team Member
              </button>
            </div>
          ) : (
            <Col>
              <TrackVisibility once>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__fadeIn" : ""
                    }
                  >
                    <h2>New Team Member Details</h2>

                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                      {/* Name */}
                      <Row>
                        <label>Name</label>
                        <input
                          type="text"
                          placeholder="Name"
                          style={inputErrorStyle(errors.name)}
                          {...register("name", {
                            required: "Please provide a team member name",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                            },
                          })}
                        />
                        <ValidationError error={errors.name} />
                      </Row>

                      {/* Role */}
                      <Row>
                        <label>Role</label>
                        <input
                          type="text"
                          placeholder="Role"
                          style={inputErrorStyle(errors.role)}
                          {...register("role", {
                            required: "Please provide a role description",
                            minLength: {
                              value: 5,
                              message: "Role must be at least 5 characters",
                            },
                          })}
                        />
                        <ValidationError error={errors.role} />
                      </Row>

                      {/* Photo */}
                      <Row>
                        <label>Image Path</label>
                        <input
                          type="text"
                          placeholder="Image path"
                          style={inputErrorStyle(errors.photo)}
                          {...register("photo", {
                            required: "Please provide a valid image path",
                            minLength: {
                              value: 10,
                              message:
                                "Image path must be at least 10 characters",
                            },
                          })}
                        />
                        <ValidationError error={errors.photo} />
                      </Row>

                      {/* Bio */}
                      <Row>
                        <label>Bio</label>
                        <textarea
                          rows="6"
                          placeholder="Bio (minimum 25 characters)"
                          style={inputErrorStyle(errors.bio)}
                          {...register("bio", {
                            required: "Please provide a team member bio",
                            minLength: {
                              value: 25,
                              message: "Bio must be at least 25 characters",
                            },
                          })}
                        />
                        {bio && bio.length < 25 && (
                          <div style={{ fontSize: "0.85rem" }}>
                            {25 - bio.length} characters remaining
                          </div>
                        )}
                        <ValidationError error={errors.bio} />
                      </Row>

                      {/* Actions */}
                      <Row>
                        <Col className="px-1 admin-btn-container">
                          <button
                            type="submit"
                            disabled={!isValid}
                            className="admin-btn"
                            style={{
                              opacity: !isValid ? 0.5 : 1,
                              cursor: !isValid
                                ? "not-allowed"
                                : "pointer",
                              marginRight: "16px",
                            }}
                          >
                            {buttonText}
                          </button>

                          <button
                            type="button"
                            className="admin-btn"
                            onClick={handleCancel}
                          >
                            Cancel
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
    </section>
  );
};

export default CreateTeamMember;
