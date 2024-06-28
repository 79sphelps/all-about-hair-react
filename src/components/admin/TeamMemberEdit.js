import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { NavBar } from "../NavBar.js";
// import { Footer } from "../Footer.js";
import { Loading } from "../Loading.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTeamMemberDetail,
  updateTeamMemberDetails,
} from "../../api/index.js";
// import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";

export const TeamMemberEdit = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const access_token = useAuth0().getAccessTokenSilently();

  let formInitialDetails = {
    name: "",
    role: "",
    bio: "",
    photo: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Update");
  const [initialUpdateFlag, setInitialUpdateFlag] = useState(false);
  // const [resetText, setResetText] = useState('Reset');

  const updateTeamMemberDetailsMutation = useMutation({
    mutationFn: updateTeamMemberDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMemberDetails"] });
      // navigate("/");
      setTimeout(() => {
        setButtonText("Update");
      }, 2000);
    },
  });

  const updateTeamMemberDetailsEdit = () => {
    const id = teamMemberDetails._id;
    setButtonText("Updating...");
    updateTeamMemberDetailsMutation.mutate({ id, ...formDetails });
  };

  const onFormUpdate = (category, value, idx) => {
    // if (category === "price" || category === "type" || idx >= 0) {
    //   if (!formDetails.pricing[idx]) {
    //     setFormDetails(...formDetails, formDetails.pricing.push());
    //   }
    //   let newPriceArray = formDetails.pricing.map((item, idx2) => {
    //     if (idx2 === idx) {
    //       return { ...formDetails.pricing[idx], [category]: value };
    //     }
    //     return item;
    //   });
    //   let newFormDetails = { ...formDetails, pricing: newPriceArray };
    //   setFormDetails(newFormDetails);
    // } else {
      setFormDetails({
        ...formDetails,
        [category]: value,
      });
    // }
  };

  const updateFormDetails = (data) => {
    setFormDetails(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateTeamMemberDetailsEdit();
  };

  // const handleReset = (e) => {
  //   e.preventDefault();
  //   setFormDetails(formInitialDetails)
  //   setButtonText('Send')
  // }

  let {
    isLoading,
    isError,
    data: teamMemberDetails,
    error,
  } = useQuery({
    queryKey: ["teamMemberDetails", location.state.id],
    queryFn: () => getTeamMemberDetail(location.state.id), // fetch the posts using the async call
  });

  const handleCancel = () => {
    setFormDetails(formInitialDetails);
    navigate("/admin/team-details");
  };

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  if (initialUpdateFlag === false) {
    setInitialUpdateFlag(true);
    updateFormDetails(teamMemberDetails);
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
                      <div>Title: </div>
                      <input
                        type="text"
                        value={formDetails.role}
                        onChange={(e) => onFormUpdate("role", e.target.value)}
                      />
                    </Row>
                    <Row>
                      <div>Image Path </div>
                      <input
                        type="text"
                        value={formDetails.photo}
                        onChange={(e) => onFormUpdate("photo", e.target.value)}
                      />
                    </Row>
                    <Row>
                      <div>Description</div>
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
                          disabled={buttonText === "Updating..."}
                        >
                          <span>{buttonText}</span>
                        </button>
                        <button onClick={handleCancel}>
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
        </Row>
      </Container>
      {/* <Footer /> */}
    </section>
  );
};
