import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { NavBar } from "./NavBar.js";
// import { Footer } from "../Footer.js";
import { Loading } from "./Loading.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceDetail, updateServiceDetails } from "../api/index.js";
// import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ArrowRightCircle } from 'react-bootstrap-icons';

export const Service = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  // const access_token = useAuth0().getAccessTokenSilently();

  let formInitialDetails = {
    title: "",
    image: "",
    description: "",
    pricing: [],
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Update");
  const [initialUpdateFlag, setInitialUpdateFlag] = useState(false);
  // const [resetText, setResetText] = useState('Reset');
  // const [status, setStatus] = useState({});


  let {
    isLoading,
    isError,
    data: serviceDetails,
    error,
  } = useQuery({
    queryKey: ["serviceDetails", location.state.id],
    queryFn: () => getServiceDetail(location.state.id), // fetch the posts using the async call
  });

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;


  return (
    <section className="contact">
      {/* <NavBar /> */}

      {/* <Container style={{ marginTop: "100px" }}> */}
      <Container>
      <button 
        className="animate__animated animate__backInLeft" 
        onClick={() => { navigate('/')}} 
        style={{ border: "1px solid rgba(255, 255, 255, 0.5)",
            marginTop: "25px",
            marginBottom: "50px",
            padding: "25px",
            borderRadius: "25px",
            width: "20%",
            fontColor: "white !important;" 
                }} ><span style={{ fontColor: "white !important;" }}>Back to Home</span> <ArrowRightCircle size={25} /></button>
            
        <Row className="align-items-center" style={{ border: "1px solid rgba(255, 255, 255, 0.5)",
                                  marginTop: "25px",
                                  marginBottom: "50px",
                                  padding: "25px",
                                  borderRadius: "25px" }}>

            <Col lg={4} md={4} sm={12}>
            <h2>Service: { serviceDetails.title }</h2>
            
            <div style={{ alignContent: "center", alignItems: "center"}}>
                <img src={ require('../' + serviceDetails.image) } style={{ width: "50%"}}></img>
            </div>
        
            </Col>
            <Col>
                {/* <div style={{ fontSize: "1.7rem" }}>Description</div> */}
                <div style={{ fontSize: "1.5rem" }}>{ serviceDetails.description }</div>
            </Col>
            </Row>

                {serviceDetails &&
                    serviceDetails.pricing.map((service, idx) => {
                    return (
                        <Row key={service._id}  className="align-items-center" style={{ border: "1px solid rgba(255, 255, 255, 0.5)",
                        marginTop: "25px",
                        marginBottom: "50px",
                        padding: "25px",
                        borderRadius: "25px" }}>
                        <div>Type: {service.type}</div>
                    
                        <div>Price: {service.price}</div>
            
                        <div>Description: </div>
                        <div>{service.description}</div>
                        </Row>
                    );
                    })}
                  
               

       
         
       </Container>

    </section>
  );
};
