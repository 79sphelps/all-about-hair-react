import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import "animate.css";
import TeamService from "../../api/team.service.js";
import { FormError } from "./common.js";
import NavBar from "../NavBar";

const formErrors = {
  "name": {
      required: true,
      error: "Please provide a valid team member name."
  },
  "role": {
      required: true,
      error: "Please provide a valid member role describing what they do."
  },
  "photo": {
      required: true,
      error: "Please provide a valid image path for the team member."
  },
  "bio": {
      required: true,
      error: "Please provide a valid message for the biography of at least 25 characters."
  },
}

const getFormErrorObject = (name, value, formErrorObjectRef) => {
  let formErrorObject = { ...formErrorObjectRef };
  const status = validateInput(name, value);
  return { ...formErrorObject, [name + 'Error']: status };
}

const validateInput = (name, value) => {
  switch (name) {
    case "name":
      return value.length < 2 ? true : false;
    case "photo":
      return value.length < 10 ? true : false;
    case "bio":
      return value.length < 25 ? true : false;
    case "role":
      return value.length < 10 ? true : false;
    default:
      break;
  }
};

const CreateTeamMember = () => {
  let formInitialDetails = {
    name: "",
    role: "",
    photo: "",
    bio: "",
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Create");
  let submitted = false;

  let initialFormErrorObject = {
    nameError: false,
    photoError: false,
    roleError: false,
    bioError: false,
  };

  const [formErrorObject, setFormErrorObject] = useState(
    initialFormErrorObject
  );

  const doesFormHaveErrors = () => {
    const formErrorObjectAry = Object.values(formErrorObject).map((v) => v ? true : false);
    const formDetailsAry = Object.values(formDetails).map((v) => !v ? true : false);
    return formErrorObjectAry.includes(true) || formDetailsAry.includes(true);
  };

  const addTeamMemberMutation = useMutation({
    mutationFn: TeamService.createTeamMember,
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
    let obj = getFormErrorObject(category, value, formErrorObject);
    let newObj = { ...formErrorObject, ...obj };
    setFormErrorObject({ ...formErrorObject, ...newObj });
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
    setFormDetails(formInitialDetails);
    setFormErrorObject(initialFormErrorObject);
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
                          onBlur={() => 
                            formDetails.name === '' ? 
                              setFormErrorObject({ ...formErrorObject, nameError: true }) :
                              null
                          }
                        />
                        {formErrorObject.nameError && (
                          <FormError msg={formErrors["name"].error} />
                        )}
                      </Row>
                      <Row>
                        <div>Role: </div>
                        <input
                          type="text"
                          value={formDetails.role}
                          onChange={(e) => onFormUpdate("role", e.target.value)}
                          onBlur={() => 
                            formDetails.role === '' ? 
                              setFormErrorObject({ ...formErrorObject, roleError: true }) :
                              null
                          }
                        />
                        {formErrorObject.roleError && (
                          <FormError msg={formErrors["role"].error} />
                        )}
                      </Row>
                      <Row>
                        <div>Image Path: </div>
                        <input
                          type="text"
                          value={formDetails.photo}
                          onChange={(e) =>
                            onFormUpdate("photo", e.target.value)
                          }
                          onBlur={() => 
                            formDetails.photo === '' ? 
                              setFormErrorObject({ ...formErrorObject, photoError: true }) :
                              null
                          }
                        />
                        {formErrorObject.photoError && (
                          <FormError msg={formErrors["photo"].error} />
                        )}
                      </Row>
                      <Row>
                        <div>Bio:</div>
                        <textarea
                          style={{ marginTop: "25px" }}
                          rows="6"
                          value={formDetails.bio}
                          onChange={(e) => onFormUpdate("bio", e.target.value)}
                          onBlur={() => 
                            formDetails.bio === '' ? 
                              setFormErrorObject({ ...formErrorObject, bioError: true }) :
                              null
                          }
                        ></textarea>
                        {formErrorObject.bioError && (
                          <FormError msg={formErrors["bio"].error} />
                        )}
                      </Row>
                      <Row>
                        <Col size={12} className="px-1">
                          <button
                            onClick={handleSubmit}
                            disabled={buttonText === "Creating..." || doesFormHaveErrors()}
                            style={{
                              color: doesFormHaveErrors() && "lightgrey",
                              cursor: doesFormHaveErrors() && "not-allowed",
                              marginRight: "20px"
                            }}
                          >
                            <span>{buttonText}</span>
                          </button>
                          <button
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