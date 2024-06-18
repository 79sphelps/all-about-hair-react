import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import contactImg from "../../assets/img/contact-img.svg";
// import contactImg from "../assets/img/Female-Hair-Silhouette.svg"
// import contactImg from "../assets/img/person_0.jpeg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

import { NavBar } from "../NavBar.js";
// import { Footer } from "../Footer.js";

import { Loading } from "../Loading.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getHomepageDetails, updateHomepageDetails } from "../../api/index.js";
// import { useAuth0 } from "@auth0/auth0-react";

export const HomePageDetails = () => {
  const queryClient = useQueryClient();

  // const access_token = useAuth0().getAccessTokenSilently();

  const formInitialDetails = {
    headline: '',
    headlineSubMsg: '',
    servicesHeadline: '',
    servicesSubMsg: '',
    aboutHeadline: '',
    aboutSubMsg: '',
    aboutImage: '',
    aboutVideoLink: '',
    stylistsHeadline: '',
    stylistsSubMsg: '',
    serviceDetailsHeadline: '',
    serviceDetailsSubMsg: '',
    contactHeadline: '',
    contactSubMsg: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Update');
  // const [resetText, setResetText] = useState('Reset');
  // const [status, setStatus] = useState({});

  const updateHomepageDetailsMutation = useMutation({
    mutationFn: updateHomepageDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homepageDetails"] });
      // navigate("/");
    },
  });

  const updateHomepageDetailsEdit = () => {
    const id = homepageDetails[0]._id;
    // updateHomepageDetailsMutation.mutate({ id, access_token, ...formDetails });  // **AUTH0 access token not functional yet**
    updateHomepageDetailsMutation.mutate({ id, ...formDetails });
  };

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.entries(formDetails).forEach(([key, value]) => {
      if (!value) {
        formDetails[key] = homepageDetails[0][key]
      }
    })
    updateHomepageDetailsEdit();

    // setButtonText("Sending...");
    // let response = await fetch("http://localhost:5000/contact", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json;charset=utf-8",
    //   },
    //   body: JSON.stringify(formDetails),
    // });
    // setButtonText("Send");
    // let result = await response.json();
    // setFormDetails(formInitialDetails);
    // if (result.code == 200) {
    //   setStatus({ succes: true, message: 'Message sent successfully'});
    // } else {
    //   setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    // }
  };

  // const handleReset = (e) => {
  //   e.preventDefault();
  //   setFormDetails(formInitialDetails)
  //   setButtonText('Send')
  // }

  let {
    isLoading,
    isError,
    data: homepageDetails,
    error,
  } = useQuery({
    queryKey: ["homepageDetails"],
    queryFn: getHomepageDetails, // fetch the posts using the async call
    // onSuccess: (data) => setBannerDetails(data),
  });

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    <section className="contact">
      <NavBar />

      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          {/* <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col> */}
          {/* <Col size={12} md={6}> */}
          <Col >
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Update Homepage Details</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    {/* <Col size={12} sm={6} className="px-1"> */}
                    {/* <Col lg={12} className="px-1" style={{ display: "flex"}}> */}
                    <Col lg={12} className="px-1">
                      {/* <div style={{ marginRight: "10px", position: "relative", top: "25%" }}>Headline: </div> */}
                      <div >Headline: </div>
                      <input type="text" value={formDetails.headline || homepageDetails[0].headline} placeholder={homepageDetails && homepageDetails[0].headline} onChange={(e) => onFormUpdate('headline', e.target.value)} />
                    </Col>
                    <Col lg={12} className="px-1">
                    <div>Headline Sub M: </div>
                      <input type="text" value={formDetails.headlineSubMsg || homepageDetails[0].headlineSubMsg} placeholder={homepageDetails && homepageDetails[0].headlineSubMsg}  onChange={(e) => onFormUpdate('headlineSubMsg', e.target.value)}/>
                    </Col>
                    <Col lg={12} className="px-1">
                      <div>Services Headline</div>
                      <input type="email" value={ formDetails.servicesHeadline || homepageDetails[0].servicesHeadline } placeholder={homepageDetails && homepageDetails[0].servicesHeadline}  onChange={(e) => onFormUpdate('servicesHeadline', e.target.value)} />
                    </Col>
                    <Col lg={12} className="px-1">
                    <div>About Section Headline</div>
                      <input type="email" value={formDetails.aboutHeadline || homepageDetails[0].aboutHeadline} placeholder={homepageDetails && homepageDetails[0].aboutHeadline}  onChange={(e) => onFormUpdate('aboutHeadline', e.target.value)} />
                    </Col>
                    <Col lg={12} className="px-1">
                    <div>About Section Sub Msg</div>
                      <input type="email" value={formDetails.aboutSubMsg || homepageDetails[0].aboutSubMsg} placeholder={homepageDetails && homepageDetails[0].aboutSubMsg} onChange={(e) => onFormUpdate('aboutSubMsg', e.target.value)} />
                    </Col>
                    <Col lg={12} className="px-1">
                    <div>About Image</div>
                      <input type="email" value={formDetails.aboutImage || homepageDetails[0].aboutImage} placeholder={homepageDetails && homepageDetails[0].aboutImage}  onChange={(e) => onFormUpdate('aboutImage', e.target.value)} />
                    </Col>
                    <Col lg={12} className="px-1">
                    <div>About Section Video Link</div>
                      <input type="email" value={formDetails.aboutVideoLink || homepageDetails[0].aboutVideoLink} placeholder={homepageDetails && homepageDetails[0].aboutVideoLink}  onChange={(e) => onFormUpdate('aboutVideoLink', e.target.value)} />
                    </Col>
                    <Col lg={12} className="px-1">
                    <div>Stylists Section Headline</div>
                      <input type="email" value={formDetails.stylistsHeadline || homepageDetails[0].stylistsHeadline} placeholder={homepageDetails && homepageDetails[0].stylistsHeadline}  onChange={(e) => onFormUpdate('stylistsHeadline', e.target.value)} />
                    </Col>
                    <Col lg={12} className="px-1">
                    <div>Stylists Section Sub Msg</div>
                      <input type="email" value={formDetails.stylistsSubMsg || homepageDetails[0].stylistsSubMsg } placeholder={homepageDetails && homepageDetails[0].stylistsSubMsg}  onChange={(e) => onFormUpdate('stylistsSubMsg', e.target.value)} />
                    </Col>
                    <Col lg={12} className="px-1">
                    <div>Service Details Section Headline</div>
                      <input type="email" value={formDetails.serviceDetailsHeadline || homepageDetails[0].serviceDetailsHeadline } placeholder={homepageDetails && homepageDetails[0].serviceDetailsHeadline}  onChange={(e) => onFormUpdate('serviceDetailsHeadline', e.target.value)} />
                    </Col>
                    <Col lg={12} className="px-1">
                    <div>Service Details Section Sub Msg</div>
                      <input type="email" value={formDetails.serviceDetailsSubMsg || homepageDetails[0].serviceDetailsSubMsg} placeholder={homepageDetails && homepageDetails[0].serviceDetailsSubMsg} onChange={(e) => onFormUpdate('serviceDetailsSubMsg', e.target.value)} />
                    </Col>
                    <Col lg={12} className="px-1">
                    <div>Contact Section Headline</div>
                      <input type="tel" value={formDetails.contactHeadline || homepageDetails[0].contactHeadline} placeholder={homepageDetails && homepageDetails[0].contactHeadline}  onChange={(e) => onFormUpdate('contactHeadline', e.target.value)}/>
                    </Col>
                    <Col lg={12} className="px-1">
                    <div>Contact Section Sub Msg</div>
                      <input type="tel" value={formDetails.contactSubMsg || homepageDetails[0].contactSubMsg} placeholder={homepageDetails && homepageDetails[0].contactSubMsg}  onChange={(e) => onFormUpdate('contactSubMsg', e.target.value)}/>
                    </Col>

                    <Col size={12} className="px-1">
                      {/* <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea> */}
                      {/* <button type="submit"><span>{buttonText}</span></button> */}
                      <button onClick={handleSubmit}><span>{buttonText}</span></button>
                      {/* <button onClick={handleReset}><span>{resetText}</span></button> */}
                    </Col>
                    {/* {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    } */}
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

      {/* <Footer /> */}

    </section>
  )
}
