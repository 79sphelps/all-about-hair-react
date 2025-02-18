import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import "animate.css";
import { 
  FormError,
  formErrorsCreateService, 
  getFormErrorObjectCreateService, 
  getPricingDetailErrorObject  
} from "./common.js";
import NavBar from "../NavBar";
import ServicesService from "../../api/services.service.js";

const CreateService = () => {
  let formInitialDetails = {
    title: "",
    image: "",
    description: "",
    pricing: [],
  };

  let initialPricingDetails = {
    type: "",
    price: "",
    description2: "",
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Create");
  const [handleAddPricingDetail, setAddPricingDetailFlag] = useState(false);
  const [pricingDetails, setPricingDetails] = useState(initialPricingDetails);
  let submitted = false;

  let initialFormErrorObject = {
    titleError: false,
    imageError: false,
    descriptionError: false,
  };

  const [formErrorObject, setFormErrorObject] = useState(
    initialFormErrorObject
  );

  let initialPricingDetailErrorObject = {
    typeError: false,
    priceError: false,
    description2Error: false,
  };

  const [pricingDetailErrorObject, setPricingDetailErrorObject] = useState(
    initialPricingDetailErrorObject
  );

  const doesFormHaveErrors = () => {
    const formErrorObjectAry = Object.values(formErrorObject).map((v) => v ? true : false);
    const formDetailsAry = Object.values(formDetails).map((v) => !v ? true : false);
    const formDetailsPricingAry = Object.values(formDetails.pricing).map((v) => !v ? true : false);
    return formErrorObjectAry.includes(true) || formDetailsAry.includes(true) || (formDetails.pricing.length > 0 && formDetailsPricingAry.includes(true));
  };

  const addServiceMutation = useMutation({
    mutationFn: ServicesService.createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addService"] });
      console.log("success bro!");
      setTimeout(() => {
        setButtonText("Create");
      }, 2000);
        navigate("/admin/services-details");
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
    let obj = getFormErrorObjectCreateService(category, value, formErrorObject);
    let newObj = { ...formErrorObject, ...obj };
    setFormErrorObject({ ...formErrorObject, ...newObj });
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
    e.preventDefault();
    let obj = getPricingDetailErrorObject(e.target.name, e.target.value, formErrorObject);
    let newObj = { ...pricingDetailErrorObject, ...obj };
    setPricingDetailErrorObject({ ...pricingDetailErrorObject, ...newObj }); 
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
    setPricingDetailErrorObject(initialPricingDetailErrorObject);
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
                          onBlur={() => 
                            formDetails.title === '' ? 
                              setFormErrorObject({ ...formErrorObject, titleError: true }) :
                              null
                          }
                        />
                        {formErrorObject.titleError && (
                          <FormError msg={formErrorsCreateService["title"].error} />
                        )}
                      </Row>
                      <Row>
                        <div>Image Path </div>
                        <input
                          type="text"
                          value={formDetails.image}
                          onChange={(e) =>
                            onFormUpdate("image", e.target.value)
                          }
                          onBlur={() => 
                            formDetails.image === '' ? 
                              setFormErrorObject({ ...formErrorObject, imageError: true }) :
                              null
                          }
                        />
                        {formErrorObject.imageError && (
                          <FormError msg={formErrorsCreateService["image"].error} />
                        )}
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
                          onBlur={() => 
                            formDetails.description === '' ? 
                              setFormErrorObject({ ...formErrorObject, descriptionError: true }) :
                              null
                          }
                        ></textarea>
                        {formErrorObject.descriptionError && (
                          <FormError msg={formErrorsCreateService["description"].error} />
                        )}
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
                              onBlur={() => 
                                pricingDetails.type === '' ? 
                                  setPricingDetailErrorObject({ ...pricingDetailErrorObject, typeError: true }) :
                                  null
                              }
                            />
                            {pricingDetailErrorObject.typeError && (
                              <FormError msg={formErrorsCreateService["type"].error} />
                            )}
                            <div>Price: </div>
                            <input
                              type="text"
                              name="price"
                              value={pricingDetails.price}
                              onChange={(e) => onPricingDetailUpdate(e)}
                              onBlur={() => 
                                pricingDetails.price === '' ? 
                                  setPricingDetailErrorObject({ ...pricingDetailErrorObject, priceError: true }) :
                                  null
                              }
                            />
                            {pricingDetailErrorObject.priceError && (
                              <FormError msg={formErrorsCreateService["price"].error} />
                            )}
                            <div>Description: </div>
                            <input
                              type="text"
                              name="description2"
                              value={pricingDetails.description2}
                              onChange={(e) => onPricingDetailUpdate(e)}
                              onBlur={() => 
                                pricingDetails.description2 === '' ? 
                                  setPricingDetailErrorObject({ ...pricingDetailErrorObject, description2Error: true }) :
                                  null
                              }
                            />
                            {pricingDetailErrorObject.description2Error && (
                              <FormError msg={formErrorsCreateService["description2"].error} />
                            )}
                            <button onClick={(e) => addPricingDetail(e)}>
                              <span>Add Detail</span>
                            </button>
                          </Row>
                        </form>
                      ) : null}

                      <Row>
                        <Col size={12} className="px-1">
                          <button
                            // style={{ marginRight: "20px" }}
                            onClick={handleSubmit}
                            // disabled={buttonText === "Creating..."}
                            disabled={buttonText === "Creating..." || doesFormHaveErrors()}
                            style={{
                              color: doesFormHaveErrors() && "lightgrey",
                              cursor: doesFormHaveErrors() && "not-allowed",
                              marginRight: "20px"
                            }}
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

export default CreateService;