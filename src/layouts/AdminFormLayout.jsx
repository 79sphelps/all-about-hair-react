import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import AdminNavBar from "../ui/navigation/AdminNavBar";

const AdminFormLayout = () => {
  return (
    <>
      <AdminNavBar />

      <main>
        <section className="contact">
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
                      <Outlet />
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
