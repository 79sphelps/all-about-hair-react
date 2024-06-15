import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import Table from 'react-bootstrap/Table';


export const Services2Card = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [service, setService] = useState([]);

  console.log(props.service)

  useEffect(() => {
    setService(props.service)
  }, [props]);


  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" onClick={handleShow}/>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <Button variant="primary" href={props.ghLink} target="_blank" onClick={handleShow}>
          {/* <BsGithub /> &nbsp;
          {props.isBlog ? "Blog" : "GitHub"} */}
          More Details
        </Button>
        {"\n"}
        {"\n"}


        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>{props.title}</Modal.Title>

          </Modal.Header>
          <Card.Img variant="top" src={props.imgPath} style={{ height: "200px", width: "200px" }} />
          <Modal.Body style={{ color: "black" }}>
            {/* Woohoo, you are reading this text in a modal!
             */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
              {
                service.map((service, index) => {
                  return (
                      <tr>
                        <td>{service.type}</td>
                        <td>{service.price}</td>
                        <td>{service.description}</td>
                      </tr>

                  )
                })
              }
              </tbody> 
            </Table>
            </Modal.Body>
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
