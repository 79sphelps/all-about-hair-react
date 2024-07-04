import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { NavBar } from "../NavBar.js";
// import { Footer } from "../Footer.js";
import { Loading } from "../Loading.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceDetail, updateServiceDetails } from "../../api/index.js";
import { useLocation, useNavigate } from "react-router-dom";

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
  // const [status, setStatus] = useState({});

  const updateServiceDetailsMutation = useMutation({
    mutationFn: updateServiceDetails,
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
    queryFn: () => getServiceDetail(location.state.id), // fetch the posts using the async call
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
                      />
                    </Row>
                    <Row>
                      <div>Image Path </div>
                      <input
                        type="text"
                        value={formDetails.image}
                        onChange={(e) => onFormUpdate("image", e.target.value)}
                      />
                    </Row>
                    <Row>
                      <div>Description</div>
                      <textarea
                        style={{ marginTop: "25px" }}
                        rows="6"
                        value={
                          formDetails.description
                        }
                        onChange={(e) =>
                          onFormUpdate("description", e.target.value)
                        }
                      ></textarea>
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
                            />
                            <div>Price: </div>
                            <input
                              type="text"
                              value={service.price}
                              onChange={(e) =>
                                onFormUpdate("price", e.target.value, idx)
                              }
                            />
                            <div>Description: </div>
                            <input
                              type="text"
                              value={service.description}
                              onChange={(e) =>
                                onFormUpdate("description", e.target.value, idx)
                              }
                            />
                          </Row>
                        );
                      })}

                    <Row>
                      <Col size={12} className="px-1">
                        <button style={{ marginRight: "20px" }} onClick={handleSubmit} disabled={buttonText === "Updating..."}>
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
