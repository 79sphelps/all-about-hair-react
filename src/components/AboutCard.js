import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

import { useQuery } from "@tanstack/react-query";
import { getHomepageDetails } from "../api/index.js";

function AboutCard() {

  let {
    isLoading,
    isError,
    data: homepageInfo,
    error,
  } = useQuery({
    queryKey: ["homepageInfo"],
    queryFn: getHomepageDetails, // fetch the posts using the async call
    // onSuccess: (data) => setBannerDetails(data),
  });

  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">

          {/* <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Soumyajit Behera </span>
            from <span className="purple"> Bhubaneswar, India.</span>
            <br />
            I am currently employed as a software developer at Juspay.
            <br />
            I have completed Integrated MSc (IMSc) in Maths and Computing at BIT
            Mesra.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p> */}

          <p style={{ textAlign: "justify" }}>
            {/* All About Hair is an Aveda Exclusive Salon with a mission to provide an upscale experience with a friendly, neighborhood feeling. Stylists have been chosen based on talent, passion, personality & commitment. Ongoing training & support will assure each guest receives the utmost enjoyable experience, along with a personally tailored look that fits their expectations. */}
            { homepageInfo && homepageInfo[0].aboutSubMsg }
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Great Customer Service
            </li>
            <li className="about-activity">
              <ImPointRight /> Professional Cuts and Styles
            </li>
            <li className="about-activity">
              <ImPointRight /> Flexible Scheduling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Styling hair that makes a difference!"{" "}
          </p>
          <footer className="blockquote-footer">mission statement</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
