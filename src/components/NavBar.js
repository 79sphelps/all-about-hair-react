import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value, page) => {
    setActiveLink(value);
    navigate(page);
  };

  /* 
  Note: The collapseOnSelect property needs to be used in conjunction with adding the eventKey props to the 
        Nav.Link elements for the collapse on click to work in mobile view.
        */
  return (
    // <Router>
    <Navbar
      collapseOnSelect
      expand="md"
      className={scrolled ? "scrolled" : ""}
      id="#navbar_id"
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated && (
              <Nav.Link
                eventKey="1"
                className={
                  activeLink === "home" ? "active navbar-link" : "navbar-link"
                }
                onClick={() =>
                  onUpdateActiveLink("home", "/admin/home-page-details")
                }
              >
                Edit Homepage Details
              </Nav.Link>
            )}

            {isAuthenticated && (
              <Nav.Link
                eventKey="2"
                className={
                  activeLink === "services-details"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() =>
                  onUpdateActiveLink("services", "/admin/services-details")
                }
              >
                Edit Services
              </Nav.Link>
            )}

            {isAuthenticated && (
              <Nav.Link
                eventKey="3"
                className={
                  activeLink === "service-add"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() =>
                  onUpdateActiveLink("services", "/admin/service-add")
                }
              >
                Add Service
              </Nav.Link>
            )}

            {isAuthenticated && (
              <Nav.Link
                eventKey="4"
                className={
                  activeLink === "team-details"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() =>
                  onUpdateActiveLink("team", "/admin/team-details")
                }
              >
                Edit Team
              </Nav.Link>
            )}

            {isAuthenticated && (
              <Nav.Link
                eventKey="5"
                className={
                  activeLink === "team-member-add"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() =>
                  onUpdateActiveLink("team", "/admin/team-member-add")
                }
              >
                Add Team Member
              </Nav.Link>
            )}

            {!isAuthenticated && (
              <Nav.Link
                eventKey="1"
                href="#home"
                className={
                  activeLink === "home" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("home")}
              >
                Home
              </Nav.Link>
            )}

            {!isAuthenticated && (
              <Nav.Link
                eventKey="2"
                href="#services"
                className={
                  activeLink === "services"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("services")}
              >
                Services
              </Nav.Link>
            )}

            {!isAuthenticated && (
              <Nav.Link
                eventKey="3"
                href="#mission"
                className={
                  activeLink === "mission"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("mission")}
              >
                Mission
              </Nav.Link>
            )}
            {!isAuthenticated && (
              <Nav.Link
                eventKey="4"
                href="#team"
                className={
                  activeLink === "team" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("team")}
              >
                Team
              </Nav.Link>
            )}
            {!isAuthenticated && (
              <Nav.Link
                eventKey="5"
                href="#gallery"
                className={
                  activeLink === "gallery"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("gallery")}
              >
                Gallery
              </Nav.Link>
            )}

            {!isAuthenticated && (
              <Nav.Link
                eventKey="5"
                className={
                  activeLink === "gallery"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => loginWithRedirect({})}
                variant="default"
              >
                Log In
              </Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link
                eventKey="5"
                className={
                  activeLink === "gallery"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => logoutWithRedirect({})}
                variant="default"
              >
                Log Out
              </Nav.Link>
            )}

            {/* <Nav.Link href="#prices" className={activeLink === 'prices' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('prices')}>Prices</Nav.Link> */}
            {/* <Nav.Link href="#contact" className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('contact')}>Contact</Nav.Link> */}
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="#home">
                <img src={navIcon1} alt="" />
              </a>
              <a href="#home">
                <img src={navIcon2} alt="" />
              </a>
              <a href="#home">
                <img src={navIcon3} alt="" />
              </a>
            </div>

            {!isAuthenticated && (
              <Nav.Link href="#contact-info">
                <button className="vvd">
                  <span>Let’s Connect</span>
                </button>
              </Nav.Link>
            )}
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // </Router>
  );
};
