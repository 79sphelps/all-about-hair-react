import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import Loading from "../Loading.js";
import {
  ABOUT_QUALITIES_ARY,
  ABOUT_MISSION_STATEMENT_TEXT,
  ABOUT_MISSION_STATEMENT_SUBTEXT,
} from "../../lib/data.js";

import { useHomePageDetails } from "../admin/hooks/useHomePageDetails"; // Adjust import path if needed

const MissionAbout = () => {
  const {
    isLoading,
    isError,
    data: homepageInfo,
    error,
  } = useHomePageDetails();

  if (isLoading || homepageInfo === undefined) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify", marginBottom: 15 }}>
            {homepageInfo && homepageInfo[0].aboutSubMsg}
          </p>
          <ul>
            {ABOUT_QUALITIES_ARY.map((item, idx) => (
              <li className="about-activity" key={idx}>
                <ImPointRight /> {item}
              </li>
            ))}
          </ul>
          <p
            style={{
              color: "rgb(155 126 172)",
              marginBottom: 15,
              marginTop: 15,
            }}
          >
            "{ABOUT_MISSION_STATEMENT_TEXT}"
          </p>
          <footer className="blockquote-footer">
            {ABOUT_MISSION_STATEMENT_SUBTEXT}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default MissionAbout;
