import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

const TeamCard = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card className="project-card-view">
      <Card.Img
        variant="top"
        src={props.imgPath}
        alt="card-img"
        className="teamCardAnimation"
        centered="true"
      />
      <Card.Body style={{ marginTop: "0px", paddingTop: "5px" }}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify", marginBottom: "14px" }}>
          {props.description}
        </Card.Text>
        <div className="team-profile-button-container">
          <Button
            variant="primary"
            href={props.ghLink}
            target="_blank"
            onClick={handleShow}
            className="team-profile-button"
          >
            Full Profile
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
        <div className="team-social-icons-container">
          <div className="team-social-icon">
            <a href="#home">
              <img src={navIcon1} alt="" />
            </a>
            <a href="#home">
              <img src={navIcon2} alt="" />
            </a>
            <a href="#home">
              <img src={navIcon3} alt="" />
            </a>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          centered="true"
          scrollable={true}
          style={{
            marginTop: "100px",
            marginBottom: "75px",
            height: "90%",
            width: "90%",
            marginLeft: "5%",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>{props.title}</Modal.Title>
            <Card.Img
              variant="top"
              src={props.imgPath}
              alt="card-img"
              // className="teamCardAnimation"
              style={{ width: "60%" }}
              centered="true"
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
