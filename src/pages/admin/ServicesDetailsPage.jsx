import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";

import NavBar from "../../ui/navigation/NavBar";
import Loading from "../../ui/feedback/LoadingSpinner";

import { useServices } from "../../features/admin/hooks/useServices";
import { useDeleteService } from "../../features/admin/hooks/useDeleteService";

const ServicesDetailsPage = () => {
  const navigate = useNavigate();

  const { data: services, isLoading, error } = useServices();
  const deleteService = useDeleteService();

  const handleEdit = (serviceId) => {
    navigate(`/admin/service-edit/${serviceId}`, { state: { id: serviceId } });
  };

  const handleDelete = (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService.mutate(serviceId);
    }
  };

  if (isLoading || !services) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          <Col>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Services Details</h2>
                  {services.map((service) => (
                    <Row key={service._id} className="service-row mb-4">
                      {/* Image & Title */}
                      <Col lg={2} className="px-1">
                        <div>{service.title}</div>
                        {service.image && (
                          <img
                            src={require(`../../${service.image}`)}
                            alt={service.title}
                            style={{ width: "100%", borderRadius: "8px" }}
                          />
                        )}
                      </Col>

                      {/* Description & Actions */}
                      <Col lg={10} className="px-1">
                        <div
                          style={{
                            border: "1px solid rgba(255, 255, 255, 0.5)",
                            marginTop: "15px",
                            borderRadius: "15px",
                            padding: "15px",
                          }}
                        >
                          {service.description}
                        </div>

                        <div style={{ marginTop: "10px" }}>
                          <button
                            className="admin-btn me-2"
                            onClick={() => handleEdit(service._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="admin-btn"
                            onClick={() => handleDelete(service._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServicesDetailsPage;
