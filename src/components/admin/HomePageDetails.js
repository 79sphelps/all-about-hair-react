import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";

import NavBar from "../../ui/NavBar";
import Loading from "../Loading";

import { useHomePageDetails } from "./hooks/useHomePageDetails";
import { useUpdateHomePageDetails } from "./hooks/useUpdateHomePageDetails";

const EMPTY_FORM = {
  headline: "",
  headlineSubMsg: "",
  servicesHeadline: "",
  servicesSubMsg: "",
  aboutHeadline: "",
  aboutSubMsg: "",
  aboutImage: "",
  aboutVideoLink: "",
  stylistsHeadline: "",
  stylistsSubMsg: "",
  serviceDetailsHeadline: "",
  serviceDetailsSubMsg: "",
  contactHeadline: "",
  contactSubMsg: "",
};

const HomePageDetails = () => {
  const navigate = useNavigate();

  const {
    data: homepageDetails,
    isLoading,
    isError,
    error,
  } = useHomePageDetails();

  const updateHomepageDetails = useUpdateHomePageDetails();

  const [formDetails, setFormDetails] = useState(EMPTY_FORM);

  useEffect(() => {
    if (homepageDetails?.[0]) {
      setFormDetails(homepageDetails[0]);
    }
  }, [homepageDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = homepageDetails[0]._id;

    updateHomepageDetails.mutate({
      id,
      ...formDetails,
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!homepageDetails?.length) return null;

  const FIELDS = [
    { label: "Headline", name: "headline" },
    { label: "Headline Sub Msg", name: "headlineSubMsg" },
    { label: "Services Headline", name: "servicesHeadline" },
    { label: "Services Sub Msg", name: "servicesSubMsg" },
    { label: "About Section Headline", name: "aboutHeadline" },
    { label: "About Image", name: "aboutImage" },
    { label: "About Video Link", name: "aboutVideoLink" },
    { label: "Stylists Section Headline", name: "stylistsHeadline" },
    { label: "Stylists Section Sub Msg", name: "stylistsSubMsg" },
    { label: "Service Details Headline", name: "serviceDetailsHeadline" },
    { label: "Service Details Sub Msg", name: "serviceDetailsSubMsg" },
    { label: "Contact Section Headline", name: "contactHeadline" },
    { label: "Contact Section Sub Msg", name: "contactSubMsg" },
  ];

  return (
    <section className="contact">
      <NavBar />

      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          <Col>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Update Homepage Details</h2>

                  <form onSubmit={handleSubmit}>
                    <Row>
                      {FIELDS.map(({ label, name }) => (
                        <Col lg={12} className="px-1" key={name}>
                          <label>{label}</label>
                          <input
                            type="text"
                            name={name}
                            value={formDetails[name] ?? ""}
                            onChange={handleChange}
                          />
                        </Col>
                      ))}

                      {/* About Sub Message */}
                      <Col lg={12} className="px-1">
                        <label>About Section Sub Msg</label>
                        <textarea
                          name="aboutSubMsg"
                          rows="6"
                          value={formDetails.aboutSubMsg ?? ""}
                          onChange={handleChange}
                        />
                      </Col>

                      {/* Actions */}
                      <Col lg={12} className="px-1 admin-btn-container">
                        <button
                          type="submit"
                          className="admin-btn"
                          style={{ marginRight: "20px" }}
                        >
                          Update
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
        </Row>
      </Container>
    </section>
  );
};

export default HomePageDetails;
