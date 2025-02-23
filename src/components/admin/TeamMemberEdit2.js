import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "animate.css";
import { useForm } from "react-hook-form";
import NavBar from "../NavBar";
import Loading from "../Loading";
import TeamService from "../../api/team.service.js";

const ValidationError = ({ fieldError }) => {
  if (!fieldError) return null;
  return (
    <div role="alert" style={{ color: "red", marginTop: 2, marginBottom: 2 }}>
      {fieldError.message}
    </div>
  );
};

const TeamMemberEdit = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });
  const [bio] = watch(["bio"]);
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Update");
  const [initialUpdateFlag, setInitialUpdateFlag] = useState(false);

  const updateTeamMemberDetailsMutation = useMutation({
    mutationFn: TeamService.updateTeamMemberDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMemberDetails"] });
      // navigate("/");
      setTimeout(() => {
        setButtonText("Update");
      }, 2000);
    },
  });

  const updateTeamMemberDetailsEdit = (e) => {
    const id = teamMemberDetails._id;
    setButtonText("Updating...");
    updateTeamMemberDetailsMutation.mutate({ id, ...e });
  };

  const updateFormDetails = (data) => {
    setValue("name", data.name);
    setValue("role", data.role);
    setValue("photo", data.photo);
    setValue("bio", data.bio);
  };

  const handleSubmit2 = async (e) => {
    updateTeamMemberDetailsEdit(e);
  };

  let {
    isLoading,
    isError,
    data: teamMemberDetails,
    error,
  } = useQuery({
    queryKey: ["teamMemberDetails", location.state.id],
    queryFn: () => TeamService.getTeamMemberDetail(location.state.id),
  });

  const handleCancel = () => {
    navigate("/admin/team-details");
  };

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  if (initialUpdateFlag === false) {
    setInitialUpdateFlag(true);
    updateFormDetails(teamMemberDetails);
  }

  const getEditorStyle = (fieldError) => {
    return fieldError ? "border: solid 1px red" : "";
  }

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
                  <h2>Update Team Member Details</h2>
                  <img
                    src={
                      getValues("photo")
                        ? require("../../" + getValues("photo"))
                        : null
                    }
                    alt=""
                    style={{
                      width: "200px",
                      marginBottom: "20px",
                      boxShadow: "0 3px 3px 5px rgba(155, 88, 173, 0.65)",
                      // textAlign: "center !important",
                      display: "block",
                      margin: "0 auto",
                    }}
                  ></img>
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
                            message: "Name must be at least 2 characters",
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
                      <div>Image Path: </div>
                      <input
                        className={getEditorStyle(errors.photo)}
                        type="text"
                        id="photo"
                        placeholder="Photo"
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
                        placeholder="Bio (at least 25 characters)"
                        {...register("bio", {
                          required:
                            "Please provide a valid message for the biography of at least 25 characters",
                          minLength: {
                            value: 25,
                            message: "Bio must be at least 25 characters",
                          },
                        })}
                      ></textarea>
                      {bio && bio?.length < 25 && (
                        <div>
                          ({25 - bio?.length} bio characters still needed)
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
        </Row>
      </Container>
      {/* <Footer /> */}
    </section>
  );
};

export default TeamMemberEdit;
