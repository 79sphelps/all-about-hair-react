import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import Loading from "../../ui/feedback/LoadingSpinner.jsx";
import {
  ABOUT_QUALITIES_ARY,
  ABOUT_MISSION_STATEMENT_TEXT,
  ABOUT_MISSION_STATEMENT_SUBTEXT,
} from "../../lib/data.js";

import { useHomePageDetails } from "../admin/hooks/useHomePageDetails.js"; // Adjust import path if needed

const MissionAbout = () => {
  const {
    isLoading,
    isError,
    data: homepageInfo,
    error,
  } = useHomePageDetails();

  if (isLoading || homepageInfo === undefined) {
    return <Loading role="status" aria-live="polite" />;
  }

  if (isError) {
    return <div role="alert">Error: {error.message}</div>;
  }

  const aboutText = homepageInfo?.[0]?.aboutSubMsg;

  return (
    <Card
      className="quote-card-view"
      role="region"
      aria-labelledby="mission-about-heading"
    >
      <Card.Body>
        <div>
          <h3 id="mission-about-heading" className="visually-hidden">
            About Our Mission
          </h3>

          <blockquote
            className="blockquote mb-0"
            aria-describedby="mission-about-text"
          >
            {/* Main description */}
            <p
              id="mission-about-text"
              style={{ textAlign: "justify", marginBottom: 15 }}
            >
              {aboutText}
            </p>

            {/* Qualities List */}
            <ul role="list">
              {ABOUT_QUALITIES_ARY.map((item, idx) => (
                <li className="about-activity" key={idx}>
                  <ImPointRight aria-hidden="true" focusable="false" />{" "}
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Mission Quote */}
            <p
              style={{
                color: "rgb(155 126 172)",
                marginBottom: 15,
                marginTop: 15,
              }}
            >
              <q>{ABOUT_MISSION_STATEMENT_TEXT}</q>
            </p>

            {/* Quote attribution */}
            <footer className="blockquote-footer">
              <cite>{ABOUT_MISSION_STATEMENT_SUBTEXT}</cite>
            </footer>
          </blockquote>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MissionAbout;
