import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const ServicesCard = (props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [service, setService] = useState([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    setService(props.service);
  }, [props]);

  const handleClose = () => {
    setShow(false);
    buttonRef.current?.focus();
  };

  const modalId = `service-modal-${props.id}`;

  return (
    <>
      <Card className="project-card-view">
        <button
          type="button"
          onClick={() =>
            navigate(`/services/${props.id}`, {
              state: { id: props.id },
            })
          }
          style={{ border: "none", background: "none", padding: 0 }}
          aria-label={`View details for ${props.title}`}
        >
          <Card.Img
            variant="top"
            src={props.imgPath}
            alt={`${props.title} service`}
          />
        </button>

        <Card.Body>
          <Card.Title as="h3">{props.title}</Card.Title>

          <Card.Text style={{ textAlign: "justify" }}>
            {props.description}
          </Card.Text>

          <div className="service-button-container">
            <Button
              ref={buttonRef}
              className="service-button"
              variant="primary"
              onClick={() =>
                navigate(`/services/${props.id}`, {
                  state: { id: props.id },
                })
              }
            >
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Accessible Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        scrollable
        aria-labelledby={`${modalId}-title`}
      >
        <Modal.Header closeButton>
          <Modal.Title id={`${modalId}-title`}>
            {props.title} Pricing
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table striped bordered hover>
            <caption>Pricing table for {props.title}</caption>
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {service.map((service, index) => (
                <tr key={index}>
                  <td>{service.type}</td>
                  <td>{service.price}</td>
                  <td>{service.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close pricing
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServicesCard;
