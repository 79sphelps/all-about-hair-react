import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "animate.css";
import NavBar from "../NavBar";
import Loading from "../Loading";
import ServicesService from "../../api/services.service.js";

const ServicesDetails = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: servicesInfo,
    error,
  } = useQuery({
    queryKey: ["servicesInfo"],
    queryFn: ServicesService.getServiceDetails,
  });

  const handleEdit = async (e, id) => {
    e.preventDefault();
    navigate(`/admin/service-edit/${id}`, { state: { id: id } });
  };

  const deleteServiceMutation = useMutation({
    mutationFn: ServicesService.deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["servicesInfo"],
        refetchType: "all",
      });
    },
  });

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteServiceMutation.mutate(id);
  };

  if (isLoading || servicesInfo === undefined) return <Loading />;
  if (isError) return `Error: ${error.message}`;

  return (
    <section className="contact">
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="align-items-center">
          {/* <Col size={12} md={6}> */}
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Update Services Details</h2>
                  <form>
                    {servicesInfo &&
                      servicesInfo.map((service, idx) => {
                        return (
                          <Row key={service._id}>
                            <Col lg={2} className="px-1">
                              <div>{service.title}</div>
                              <img
                                src={require("../../" + service.image)}
                                alt=""
                              ></img>
                            </Col>
                            <Col size={12} className="px-1">
                              <div
                                style={{
                                  border: "1px solid rgba(255, 255, 255, 0.5)",
                                  marginTop: "25px",
                                  borderRadius: "25px",
                                  padding: "20px",
                                }}
                              >
                                {service.description}
                              </div>
                              <button
                                style={{ marginRight: "20px" }}
                                onClick={(e) => handleEdit(e, service._id)}
                              >
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={(e) => handleDelete(e, service._id)}
                              >
                                <span>Delete</span>
                              </button>
                            </Col>
                          </Row>
                        );
                      })}
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}
    </section>
  );
};

export default ServicesDetails;
