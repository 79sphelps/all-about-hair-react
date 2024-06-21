import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

export const Services2Card = (props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [service, setService] = useState([]);

  useEffect(() => {
    setService(props.service);
  }, [props]);

  return (
    <Card className="project-card-view">
      <Card.Img
        variant="top"
        src={props.imgPath}
        alt="card-img"
        // onClick={handleShow}
        onClick={() =>
          navigate(`/services/${props.id}`, { state: { id: props.id } })
        }
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <Button
          variant="primary"
          // href={props.ghLink}
          target="_blank"
          // onClick={handleShow}
          onClick={() =>
            navigate(`/services/${props.id}`, { state: { id: props.id } })
          }
        >
          More Details
        </Button>
        {"\n"}
        {"\n"}

        <Modal
          show={show}
          onHide={handleClose}
          centered
          scrollable={true}
          // scrollable
          // dialogClassName="modal-90w"
          style={{ marginTop: "50px" }}
        >
          <Modal.Header
            closeButton
            style={{ paddingTop: "0", paddingBottom: "0" }}
          >
            <Modal.Title style={{ color: "black" }}>{props.title}</Modal.Title>
          </Modal.Header>

          <Card.Img
            variant="top"
            src={props.imgPath}
            style={{
              height: "150px",
              width: "150px",
              paddingTop: "0",
              paddingBottom: "0",
            }}
          />

          {/* <Modal.Body style={{ color: "black", maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}> */}
          <Modal.Body
            style={{ color: "black", paddingTop: "0", paddingBottom: "0" }}
          >
            {/* <img src={props.imgPath} style={{ height: "150px", width: "150px", paddingTop: "0", paddingBottom: "0" }} /> */}

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {service.map((service, index) => {
                  return (
                    <tr key={service}>
                      <td>{service.type}</td>
                      <td>{service.price}</td>
                      <td>{service.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
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
};
// export default ProjectCards;
