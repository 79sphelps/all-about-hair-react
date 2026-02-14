import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";
import { useForm } from "react-hook-form";

import NavBar from "../../ui/NavBar";
import Loading from "../Loading";
import AccessibleFormField from "../contact/AccessibleFormField";

import { useTeamMember } from "./hooks/useTeamMember";
import { useUpdateTeamMember } from "./hooks/useUpdateTeamMember";

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
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [buttonText, setButtonText] = useState("Update");
  const bio = watch("bio");

  const {
    data: teamMember,
    isLoading,
    isError,
    error,
  } = useTeamMember(teamMemberId);

  const updateTeamMember = useUpdateTeamMember();

  useEffect(() => {
    if (teamMember) {
      ["name", "role", "photo", "bio"].forEach((field) =>
        setValue(field, teamMember[field])
      );
    }
  }, [teamMember, setValue]);

  const onSubmit = (formData) => {
    setButtonText("Updating…");

    updateTeamMember.mutate(
      { id: teamMemberId, ...formData },
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

  const handleCancel = () => navigate("/admin/team-details");

  if (isLoading) return <Loading />;
  if (isError) return <div role="alert">Error: {error.message}</div>;
  if (!teamMember) return null;

  return (
    <>
      <NavBar />

      <main aria-labelledby="team-member-edit-title">
        <section className="contact">
          <Container style={{ marginTop: "100px" }}>
            <Row className="align-items-center">
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
                      <h1 id="team-member-edit-title" style={{ textAlign: "center" }}>
                        Update Team Member Details
                      </h1>

                      {/* Image preview */}
                      {getValues("photo") && (
                        <div aria-live="polite">
                          <img
                            src={require(`../../${getValues("photo")}`)}
                            alt={
                              getValues("name")
                                ? `${getValues("name")} profile`
                                : "Team member profile"
                            }
                            style={{
                              width: "200px",
                              margin: "0 auto 20px",
                              display: "block",
                              boxShadow:
                                "0 3px 3px 5px rgba(155, 88, 173, 0.65)",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      )}

                      <form
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        aria-busy={updateTeamMember.isPending}
                      >
                        {/* NAME */}
                        <Row className="mb-3">
                          <Col>
                            <AccessibleFormField
                              id="name"
                              name="name"
                              label="Name"
                              register={register}
                              registerOptions={{
                                required:
                                  "Please provide a valid team member name",
                                minLength: {
                                  value: 2,
                                  message:
                                    "Name must be at least 2 characters",
                                },
                              }}
                              error={errors.name}
                              required
                            />
                          </Col>
                        </Row>

                        {/* ROLE */}
                        <Row className="mb-3">
                          <Col>
                            <AccessibleFormField
                              id="role"
                              name="role"
                              label="Role"
                              register={register}
                              registerOptions={{
                                required:
                                  "Please provide a valid member role",
                                minLength: {
                                  value: 5,
                                  message:
                                    "Role must be at least 5 characters",
                                },
                              }}
                              error={errors.role}
                              required
                            />
                          </Col>
                        </Row>

                        {/* PHOTO */}
                        <Row className="mb-3">
                          <Col>
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
                                    "Photo path must be at least 10 characters",
                                },
                              }}
                              error={errors.photo}
                              required
                            />
                          </Col>
                        </Row>

                        {/* BIO */}
                        <Row className="mb-3">
                          <Col>
                            <AccessibleFormField
                              id="bio"
                              name="bio"
                              label="Bio"
                              as="textarea"
                              rows={6}
                              register={register}
                              registerOptions={{
                                required:
                                  "Please provide a biography",
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
                          </Col>
                        </Row>

                        {/* Actions */}
                        <Row className="mt-3">
                          <Col>
                            <button
                              type="submit"
                              className="btn btn-primary me-2"
                              disabled={!isValid || updateTeamMember.isPending}
                              aria-disabled={
                                !isValid || updateTeamMember.isPending
                              }
                            >
                              {buttonText}
                            </button>

                            <button
                              type="button"
                              className="btn btn-secondary"
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
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default TeamMemberEdit;
