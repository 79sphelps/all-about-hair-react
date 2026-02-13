import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import navIcon1 from "../../assets/img/nav-icon1.svg";
import navIcon2 from "../../assets/img/nav-icon2.svg";
import navIcon3 from "../../assets/img/nav-icon3.svg";

const TeamCard = (props) => {
  const [show, setShow] = useState(false);
  const buttonRef = useRef(null);

  const handleClose = () => {
    setShow(false);
    buttonRef.current?.focus(); // return focus after modal closes
  };

  const handleShow = () => setShow(true);

  const modalId = `team-modal-${props.title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <Card className="project-card-view">
      <Card.Img
        variant="top"
        src={props.imgPath}
        alt={`Portrait of ${props.title}`}
        className="teamCardAnimation"
        centered="true"
        onClick={handleShow}
      />
      <Card.Body style={{ marginTop: "0px", paddingTop: "5px" }}>
        <Card.Title as="h3">{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify", marginBottom: "14px" }}>
          {props.description}
        </Card.Text>
        <div className="team-profile-button-container">
          <Button
            ref={buttonRef}
            aria-haspopup="dialog"
            aria-controls={modalId}
            variant="primary"
            onClick={handleShow}
            className="team-profile-button"
          >
            View Full Profile
          </Button>
        </div>

        {/* <div className="text">
          <a href="#">
            {" "}
            <i className="fa fa-facebook"></i>{" "}
          </a>
          <a href="#">
            {" "}
            <i className="fa fa-twitter"></i>{" "}
          </a>
          <a href="#">
            {" "}
            <i className="fa fa-linkedin"></i>{" "}
          </a>
        </div> */}

        {/* Social Links */}
        <div className="team-social-icons-container">
          <div className="team-social-icon">
            <a href="#home" aria-label={`${props.title} Facebook profile`}>
              <img src={navIcon1} alt="" aria-hidden="true" />
            </a>
            <a href="#home" aria-label={`${props.title} Twitter profile`}>
              <img src={navIcon2} alt="" aria-hidden="true" />
            </a>
            <a href="#home" aria-label={`${props.title} LinkedIn profile`}>
              <img src={navIcon3} alt="" aria-hidden="true" />
            </a>
          </div>
        </div>

        <Modal
          aria-labelledby={`${modalId}-title`}
          aria-describedby={`${modalId}-description`}
          show={show}
          onHide={handleClose}
          centered
          scrollable
          style={{
            marginTop: "100px",
            marginBottom: "75px",
            height: "90%",
            width: "90%",
            marginLeft: "5%",
          }}
        >
          <Modal.Header
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Modal.Title
              id={`${modalId}-title`}
              style={{
                color: "black",
                borderBottom: "1px solid grey",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              {props.title}
            </Modal.Title>
            <Card.Img
              variant="top"
              src={props.imgPath}
              alt={`Portrait of ${props.title}`}
              style={{ width: "60%", boxShadow: "10px 10px 20px grey" }}
              centered
            />
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>{props.bio}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default TeamCard;
