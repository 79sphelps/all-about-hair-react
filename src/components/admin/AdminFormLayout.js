import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import NavBar from "../../ui/navigation/NavBar";

const AdminFormLayout = ({
  title,
  children,
  subtitle,
  className = "",
}) => {
  const headingId =
    title?.toLowerCase().replace(/\s+/g, "-") || "admin-heading";

  return (
    <>
      <NavBar />

      <main aria-labelledby={headingId}>
        <section className={`contact ${className}`}>
          <Container style={{ marginTop: "100px" }}>
            <Row className="align-items-center">
              <Col>
                <TrackVisibility once>
                  {({ isVisible }) => (
                    <div
                      className={
                        isVisible
                          ? "animate__animated animate__fadeIn"
                          : ""
                      }
                    >
                      {title && <h1 id={headingId}>{title}</h1>}

                      {subtitle && <p>{subtitle}</p>}

                      {children}
                    </div>
                  )}
                </TrackVisibility>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default AdminFormLayout;
