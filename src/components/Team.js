import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import "react-multi-carousel/lib/styles.css";
import TeamCard from "./TeamCard";
import TeamService from "../api/team.service.js";
import HomepageService from "../api/homepage.service.js";
import Loading from "./Loading";

const Team = () => {
  let {
    isLoading,
    isError,
    data: homepageInfo,
    error,
  } = useQuery({
    queryKey: ["homepageInfo"],
    queryFn: HomepageService.getHomepageDetails,
  });

  let {
    isLoading2,
    isError2,
    data: teamInfo,
    error2,
  } = useQuery({
    queryKey: ["teamInfo"],
    queryFn: TeamService.getTeamDetails,
  });

  if (isLoading || isLoading2) return <Loading />;
  if (isError) return `Error: ${error.message}`;
  if (isError2) return `Error: ${error2.message}`;

  return (
    !isLoading && (
      <section className="skill" id="team">
        <Container fluid className="team-section">
          <Container>
            <div style={{ marginLeft: "7px" }}>
              <h1 className="project-heading">
                {homepageInfo && homepageInfo[0].stylistsHeadline}
              </h1>
              {homepageInfo && homepageInfo[0].stylistsSubMsg}
            </div>
            <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
              {teamInfo &&
                teamInfo.slice(1, teamInfo.length).map((team) => {
                  return (
                    <Col
                      lg={3}
                      md={6}
                      sm={6}
                      xm={10}
                      className="project-card"
                      key={team._id}
                    >
                      <TeamCard
                        imgPath={require("../" + team.photo)}
                        title={team.name}
                        description={team.role.split(" ").join("-")}
                        bio={team.bio}
                      />
                    </Col>
                  );
                })}
            </Row>
          </Container>
        </Container>
      </section>
    )
  );
};

export default Team;