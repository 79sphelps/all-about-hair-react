import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { useForm } from "react-hook-form";
import "animate.css";

import NavBar from "../../ui/NavBar";
import AccessibleFormField from "../contact/AccessibleFormField";

import { useCreateTeamMember } from "./hooks/useCreateTeamMember";

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
      onError: () => {
        setSubmitted(false);
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
    <>
      <NavBar />

      <main
        aria-labelledby="create-team-member-title"
      >
        <section className="contact">
          <Container style={{ marginTop: "100px" }}>
            <Row className="align-items-center">
              {submitted ? (
                <div
                  className="admin-add-success-container"
                  role="status"
                  aria-live="polite"
                >
                  <h2>The new team member was created successfully!</h2>
                  <button
                    className="btn btn-success"
                    onClick={handleAddAnother}
                  >
                    Add Another Team Member
                  </button>
                </div>
              ) : (
                <Col>
                  <TrackVisibility once>
                    {({ isVisible }) => (
                      <div
                        className={
                          isVisible
                            ? "animate__animated animate__fadeIn"
                            : ""
                        }
                      >
                        <h1 id="create-team-member-title">
                          New Team Member Details
                        </h1>

                        <form
                          noValidate
                          onSubmit={handleSubmit(onSubmit)}
                          aria-busy={createTeamMember.isPending}
                        >
                          {/* NAME */}
                          <Row>
                            <AccessibleFormField
                              id="name"
                              name="name"
                              label="Name"
                              register={register}
                              registerOptions={{
                                required:
                                  "Please provide a team member name",
                                minLength: {
                                  value: 2,
                                  message:
                                    "Name must be at least 2 characters",
                                },
                              }}
                              error={errors.name}
                              required
                            />
                          </Row>

                          {/* ROLE */}
                          <Row>
                            <AccessibleFormField
                              id="role"
                              name="role"
                              label="Role"
                              register={register}
                              registerOptions={{
                                required:
                                  "Please provide a role description",
                                minLength: {
                                  value: 5,
                                  message:
                                    "Role must be at least 5 characters",
                                },
                              }}
                              error={errors.role}
                              required
                            />
                          </Row>

                          {/* PHOTO */}
                          <Row>
                            <AccessibleFormField
                              id="photo"
                              name="photo"
                              label="Image Path"
                              register={register}
                              registerOptions={{
                                required:
                                  "Please provide a valid image path",
                                minLength: {
                                  value: 10,
                                  message:
                                    "Image path must be at least 10 characters",
                                },
                              }}
                              error={errors.photo}
                              required
                            />
                          </Row>

                          {/* BIO */}
                          <Row>
                            <AccessibleFormField
                              id="bio"
                              name="bio"
                              label="Bio"
                              as="textarea"
                              rows={6}
                              register={register}
                              registerOptions={{
                                required:
                                  "Please provide a team member bio",
                                minLength: {
                                  value: 25,
                                  message:
                                    "Bio must be at least 25 characters",
                                },
                              }}
                              error={errors.bio}
                              required
                              description={
                                bio && bio.length < 25
                                  ? `${25 - bio.length} characters remaining`
                                  : undefined
                              }
                            />
                          </Row>

                          {/* ACTIONS */}
                          <Row>
                            <Col className="px-1 admin-btn-container">
                              <button
                                type="submit"
                                className="admin-btn"
                                disabled={!isValid}
                                aria-disabled={!isValid}
                                style={{
                                  opacity: !isValid ? 0.5 : 1,
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
      </main>
    </>
  );
};

export default CreateTeamMember;
