import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { NavBar } from "../NavBar.js";
// import { Footer } from "../Footer.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createService } from "../../api/index.js";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export const CreateService = () => {
  let formInitialDetails = {
    title: "",
    image: "",
    description: "",
    pricing: [],
  };

  let initialPricingDetails = {
    type: "",
    price: "",
    description: "",
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Create");
  const [handleAddPricingDetail, setAddPricingDetailFlag] = useState(false);
  const [pricingDetails, setPricingDetails] = useState(initialPricingDetails);
  let submitted = false;

  const addServiceMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addService"] });
      console.log("success bro!");
      setTimeout(() => {
        setButtonText("Create");
      }, 2000);
        navigate("/admin/service-details");
    },
  });

  const handleAddService = (service) => {
    setButtonText("Creating...");
    addServiceMutation.mutate({
      id: uuidv4(),
      ...service,
    });
  };

  const onFormUpdate = (category, value) => {
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
    handleAddService(formDetails);
  };

  const newService = () => {
    setFormDetails(formInitialDetails);
    submitted = false;
  };

  const handleAddNewPricingDetail = (e) => {
    e.preventDefault();
    setAddPricingDetailFlag(true);
  };

  const onPricingDetailUpdate = (e) => {
    e.preventDefault(); // prevent a browser reload/refresh
    setPricingDetails({
      ...pricingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addPricingDetail = (e) => {
    e.preventDefault();
    let priceArray = formDetails.pricing;
    priceArray.push(pricingDetails);
    let newFormDetails = { ...formDetails, pricing: priceArray };
    setFormDetails(newFormDetails);
    setAddPricingDetailFlag(false);
    setPricingDetails(initialPricingDetails);
    setFormDetails(formInitialDetails);
  };

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          {submitted && formDetails ? (
            <div>
              <h4>The new service was created successfully!</h4>
              <button className="btn btn-success" onClick={() => newService()}>
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
                    <h2>New Service Details</h2>
                    <form>
                      <Row>
                        <div>Title: </div>
                        <input
                          type="text"
                          value={formDetails.title}
                          onChange={(e) =>
                            onFormUpdate("title", e.target.value)
                          }
                        />
                      </Row>
                      <Row>
                        <div>Image Path </div>
                        <input
                          type="text"
                          value={formDetails.image}
                          onChange={(e) =>
                            onFormUpdate("image", e.target.value)
                          }
                        />
                      </Row>
                      <Row>
                        <div>Description</div>
                        <textarea
                          style={{ marginTop: "25px" }}
                          rows="6"
                          value={formDetails.description}
                          onChange={(e) =>
                            onFormUpdate("description", e.target.value)
                          }
                        ></textarea>
                      </Row>

                      {handleAddPricingDetail ? (
                        <form>
                          <Row>
                            <div>Type: </div>
                            <input
                              type="text"
                              name="type"
                              value={pricingDetails.type}
                              onChange={(e) => onPricingDetailUpdate(e)}
                            />
                            <div>Price: </div>
                            <input
                              type="text"
                              name="price"
                              value={pricingDetails.price}
                              onChange={(e) => onPricingDetailUpdate(e)}
                            />
                            <div>Description: </div>
                            <input
                              type="text"
                              name="description"
                              value={pricingDetails.description}
                              onChange={(e) => onPricingDetailUpdate(e)}
                            />

                            <button onClick={(e) => addPricingDetail(e)}>
                              <span>Add Detail</span>
                            </button>
                          </Row>
                        </form>
                      ) : null}

                      <Row>
                        <Col size={12} className="px-1">
                          <button
                            style={{ marginRight: "20px" }}
                            onClick={handleSubmit}
                            disabled={buttonText === "Creating..."}
                          >
                            <span>{buttonText}</span>
                          </button>
                          <button
                            style={{ marginRight: "20px" }}
                            onClick={handleCancel}
                          >
                            <span>Cancel</span>
                          </button>
                          <button onClick={handleAddNewPricingDetail}>
                            <span>Add New Pricing Detail</span>
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
