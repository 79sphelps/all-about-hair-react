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
    <div role="alert" style={{ color: "red", margin: "2px 0" }}>
      {fieldError.message}
    </div>
  );
};

const TeamMemberEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const teamMemberId = location.state?.id;

  const { register, handleSubmit, watch, setValue, getValues, formState: { errors, isValid } } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [buttonText, setButtonText] = useState("Update");
  const [bio] = watch(["bio"]);

  // Fetch team member
  const { data: teamMember, isLoading, isError, error } = useTeamMember(teamMemberId);

  // Update mutation
  const updateTeamMember = useUpdateTeamMember();

  // Populate form once data loads
  useEffect(() => {
    if (teamMember) {
      ["name", "role", "photo", "bio"].forEach((field) =>
        setValue(field, teamMember[field])
      );
    }
  }, [teamMember, setValue]);

  const onSubmit = (formData) => {
    setButtonText("Updating...");

    updateTeamMember.mutate(
      { id: teamMemberId, ...formData },
      {
        onSuccess: () => {
          setButtonText("Update");
          navigate("/admin/team-details");
        },
      }
    );
  };

  const handleCancel = () => navigate("/admin/team-details");

  const getEditorStyle = (fieldError) => (fieldError ? "border: 1px solid red" : "");

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!teamMember) return null;

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          <Col>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Update Team Member Details</h2>

                  {/* Display image if available */}
                  {getValues("photo") && (
                    <img
                      src={require(`../../${getValues("photo")}`)}
                      alt={getValues("name") || "Team Member"}
                      style={{
                        width: "200px",
                        margin: "0 auto 20px",
                        display: "block",
                        boxShadow: "0 3px 3px 5px rgba(155, 88, 173, 0.65)",
                        borderRadius: "8px",
                      }}
                    />
                  )}

                  <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                      <Col>
                        <label>Name:</label>
                        <input
                          className={`form-control ${getEditorStyle(errors.name)}`}
                          type="text"
                          {...register("name", {
                            required: "Please provide a valid team member name",
                            minLength: { value: 2, message: "Name must be at least 2 characters" },
                          })}
                        />
                        <ValidationError fieldError={errors.name} />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <label>Role:</label>
                        <input
                          className={`form-control ${getEditorStyle(errors.role)}`}
                          type="text"
                          {...register("role", {
                            required: "Please provide a valid member role",
                            minLength: { value: 5, message: "Role must be at least 5 characters" },
                          })}
                        />
                        <ValidationError fieldError={errors.role} />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <label>Image Path:</label>
                        <input
                          className={`form-control ${getEditorStyle(errors.photo)}`}
                          type="text"
                          {...register("photo", {
                            required: "Please provide a valid image path",
                            minLength: { value: 10, message: "Photo path must be at least 10 characters" },
                          })}
                        />
                        <ValidationError fieldError={errors.photo} />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <label>Bio:</label>
                        <textarea
                          className={`form-control ${getEditorStyle(errors.bio)}`}
                          rows={6}
                          {...register("bio", {
                            required: "Please provide a biography (min 25 chars)",
                            minLength: { value: 25, message: "Bio must be at least 25 characters" },
                          })}
                        />
                        {bio && bio.length < 25 && (
                          <div>({25 - bio.length} characters remaining)</div>
                        )}
                        <ValidationError fieldError={errors.bio} />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col>
                        <button
                          type="submit"
                          className="btn btn-primary me-2"
                          disabled={!isValid || updateTeamMember.isLoading}
                        >
                          {buttonText}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
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
