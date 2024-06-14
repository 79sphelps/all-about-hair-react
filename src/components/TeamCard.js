import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";


import Modal from 'react-bootstrap/Modal';

export const TeamCard = (props) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" className="teamCardAnimation"/>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <Button variant="primary" href={props.ghLink} target="_blank" onClick={handleShow}>
          {/* <BsGithub /> &nbsp; */}
          {/* {props.isBlog ? "Blog" : "GitHub"} */}
          Full Profile
        </Button>
        {"\n"}
        {"\n"}

        <div className="text">
            <a href="#"> <i className="fa fa-facebook"></i> </a>
            <a href="#"> <i className="fa fa-twitter"></i> </a>
            <a href="#"> <i className="fa fa-linkedin"></i> </a>
        </div>


        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
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
