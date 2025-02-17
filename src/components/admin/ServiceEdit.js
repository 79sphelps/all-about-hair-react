import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServicesService from "../../api/services.service.js";
import { NavBar } from "../NavBar.js";
import { Loading } from "../Loading.js";
import { 
  FormError,
  formErrorsCreateService, 
  getFormErrorObjectCreateService, 
  getPricingDetailErrorObject  
} from "./common.js";

export const ServiceEdit = () => {
  let formInitialDetails = {
    title: "",
    image: "",
    description: "",
    pricing: [],
  };

  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Update");
  const [initialUpdateFlag, setInitialUpdateFlag] = useState(false);

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

  const updateServiceDetailsMutation = useMutation({
    mutationFn: ServicesService.updateServiceDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceDetails"] });
      setTimeout(() => {
        setButtonText("Update")
      }, 2000)
    },
  });

  const updateServiceDetailsEdit = () => {
    const id = serviceDetails._id;
    setButtonText("Updating...")
    updateServiceDetailsMutation.mutate({ id, ...formDetails });
  };

  const onFormUpdate = (category, value, idx) => {
    if (category === "price" || category === "type" || idx >= 0) {

      let obj = getPricingDetailErrorObject(category, value, pricingDetailErrorObject);
      let newObj = { ...pricingDetailErrorObject, ...obj };
      setPricingDetailErrorObject({ ...pricingDetailErrorObject, ...newObj }); 


      if (!formDetails.pricing[idx]) {
        setFormDetails(...formDetails, formDetails.pricing.push())
      }
      let newPriceArray = formDetails.pricing.map((item, idx2) => {
        if (idx2 === idx) { 
          return { ...formDetails.pricing[idx], [category]: value}
        }
        return item
      })
      let newFormDetails = { ...formDetails, pricing: newPriceArray }
      setFormDetails(newFormDetails);
    } else {

      let obj = getFormErrorObjectCreateService(category, value, formErrorObject);
      let newObj = { ...formErrorObject, ...obj };
      console.log(newObj);
      setFormErrorObject({ ...formErrorObject, ...newObj });


      setFormDetails({
        ...formDetails,
        [category]: value,
      });
    }
  };

  const updateFormDetails = (data) => {
    setFormDetails(data)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateServiceDetailsEdit();
  };

  // const handleReset = (e) => {
  //   e.preventDefault();
  //   setFormDetails(formInitialDetails)
  //   setButtonText('Send')
  // }

  let {
    isLoading,
    isError,
    data: serviceDetails,
    error,
  } = useQuery({
    queryKey: ["serviceDetails", location.state.id],
    queryFn: () => ServicesService.getServiceDetail(location.state.id), // fetch the posts using the async call
  });

  const handleCancel = () => {
    setFormDetails(formInitialDetails);
    navigate('/admin/services-details');
  }

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  if (initialUpdateFlag === false) {
    setInitialUpdateFlag(true);
    updateFormDetails(serviceDetails);
  }

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          {/* <Col size={12} md={6}> */}
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Update Service Details</h2>
                  <form>
                    <Row>
                      <div>Title: </div>
                      <input
                        type="text"
                        value={formDetails.title}
                        onChange={(e) => onFormUpdate("title", e.target.value)}
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
                        onChange={(e) => onFormUpdate("image", e.target.value)}
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
                        value={
                          formDetails.description
                        }
                        onChange={(e) => onFormUpdate("description", e.target.value)}
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

                    {formDetails &&
                      formDetails.pricing.map((service, idx) => {
                        return (
                          <Row key={service._id + "." + idx}>
                            <div>Type: </div>
                            <input
                              type="text"
                              value={service.type}
                              onChange={(e) =>
                                onFormUpdate("type", e.target.value, idx)
                              }
                              onBlur={() => 
                                service.type === '' ? 
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
                              value={service.price}
                              onChange={(e) =>
                                onFormUpdate("price", e.target.value, idx)
                              }
                              onBlur={() => 
                                service.price === '' ? 
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
                              value={service.description}
                              onChange={(e) =>
                                onFormUpdate("description", e.target.value, idx)
                              }
                              onBlur={() => 
                                service.description2 === '' ? 
                                  setPricingDetailErrorObject({ ...pricingDetailErrorObject, description2Error: true }) :
                                  null
                              }
                            />
                            {pricingDetailErrorObject.description2Error && (
                              <FormError msg={formErrorsCreateService["description2"].error} />
                            )}
                          </Row>
                        );
                      })}

                    <Row>
                      <Col size={12} className="px-1">
                        <button 
                        // style={{ marginRight: "20px" }} 
                        onClick={handleSubmit} 
                        // disabled={buttonText === "Updating..."}
                        disabled={buttonText === "Updating..." || doesFormHaveErrors()}
                        style={{
                          color: doesFormHaveErrors() && "lightgrey",
                          cursor: doesFormHaveErrors() && "not-allowed",
                          marginRight: "20px"
                        }}
                        >
                          <span>{buttonText}</span>
                        </button>
                        <button onClick={handleCancel}>
                          <span>Cancel</span>
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
      {/* <Footer /> */}
    </section>
  );
};
