import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import { getHomepageDetails } from "../api/index.js";
import { Loading } from "./Loading.js";

function AboutCard() {
  let {
    isLoading,
    isError,
    data: homepageInfo,
    error,
  } = useQuery({
    queryKey: ["homepageInfo"],
    queryFn: getHomepageDetails, // fetch the posts using the async call
  });

  if (isLoading) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (!isLoading && 
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
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