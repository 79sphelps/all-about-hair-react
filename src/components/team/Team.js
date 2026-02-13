import { Container, Row, Col } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import TeamCard from "./TeamCard";
import Loading from "../Loading";

import { useHomePageDetails } from "../admin/hooks/useHomePageDetails";
import { useTeamMembers } from "../admin/hooks/useTeamMember";

const Team = () => {
  const {
    data: homepageInfo,
    isLoading: isHomepageLoading,
    isError: isHomepageError,
    error: homepageError,
  } = useHomePageDetails();

  const {
    data: teamInfo,
    isLoading: isTeamLoading,
    isError: isTeamError,
    error: teamError,
  } = useTeamMembers();

  if (isHomepageLoading || isTeamLoading) {
    return <Loading role="status" aria-live="polite" />;
  }

  if (isHomepageError) {
    return <div role="alert">Error: {homepageError.message}</div>;
  }

  if (isTeamError) {
    return <div role="alert">Error: {teamError.message}</div>;
  }

  const homepage = homepageInfo?.[0];

  return (
    <section className="skill" id="team" aria-labelledby="team-heading">
      <Container fluid className="team-section">
        <Container>
          <header style={{ marginLeft: "7px" }}>
            <h2 id="team-heading" className="project-heading">
              {homepage?.stylistsHeadline}
            </h2>
            <p id="team-description">{homepage?.stylistsSubMsg}</p>
          </header>

          <Row
            as="ul"
            role="list"
            aria-describedby="team-description"
            style={{ listStyleType: "none", justifyContent: "center", paddingBottom: "10px" }}
          >
            {teamInfo?.slice(1).map((team) => (
              <Col
                as="li"
                role="listitem"
                key={team._id}
                lg={3}
                md={6}
                sm={6}
                xs={10}
                className="project-card"
              >
                <TeamCard
                  imgPath={require("../../" + team.photo)}
                  title={team.name}
                  description={team.role.split(" ").join("-")}
                  bio={team.bio}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </section>
  );
};

export default Team;
