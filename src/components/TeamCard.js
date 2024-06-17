import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';

import Modal from 'react-bootstrap/Modal';

export const TeamCard = (props) => {

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
      />
      <Card.Body style={{ marginTop: "0px", paddingTop: "5px" }}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify", marginBottom: "14px" }}>
          {props.description}
        </Card.Text>
        <Button
          variant="primary"
          href={props.ghLink}
          target="_blank"
          onClick={handleShow}
        >
          {/* <BsGithub /> &nbsp; */}
          {/* {props.isBlog ? "Blog" : "GitHub"} */}
          Full Profile
        </Button>
        {"\n"}
        {"\n"}

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
        <div className="team-social-icon">
          <a href="#"><img src={navIcon1} alt="" /></a>
          <a href="#"><img src={navIcon2} alt="" /></a>
          <a href="#"><img src={navIcon3} alt="" /></a>
        </div>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>{props.title}</Modal.Title>
            <Card.Img
              variant="top"
              src={props.imgPath}
              alt="card-img"
              className="teamCardAnimation"
            />

          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            {/* Woohoo, you are reading this text in a modal! */}
            {props.bio}

            {/* <a href="#">
              {" "}
              <i class="fa fa-facebook"></i>{" "}
            </a>
            <a href="#">
              {" "}
              <i class="fa fa-twitter"></i>{" "}
            </a>
            <a href="#">
              {" "}
              <i class="fa fa-linkedin"></i>{" "}
            </a> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>

        {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

        {/* {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <CgWebsite /> &nbsp;
            {"Demo"}
          </Button>
        )} */}
      </Card.Body>
    </Card>
  );
}
// export default ProjectCards;
