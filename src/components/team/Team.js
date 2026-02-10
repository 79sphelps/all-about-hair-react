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

  if (isHomepageLoading || isTeamLoading) return <Loading />;
  if (isHomepageError) return `Error: ${homepageError.message}`;
  if (isTeamError) return `Error: ${teamError.message}`;

  const homepage = homepageInfo?.[0];

  return (
    <section className="skill" id="team">
      <Container fluid className="team-section">
        <Container>
          <div style={{ marginLeft: "7px" }}>
            <h1 className="project-heading">
              {homepage?.stylistsHeadline}
            </h1>
            {homepage?.stylistsSubMsg}
          </div>

          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {teamInfo
              ?.slice(1)
              .map((team) => (
                <Col
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
