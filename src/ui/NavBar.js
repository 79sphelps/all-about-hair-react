import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import NavLink from "./NavLink";

const NavBar = () => {
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

  const AdminNavLinksAry = [
    {
      eventKey: "1",
      title: "home",
      onClick: () => onUpdateActiveLink("home", "/admin/home-page-details"),
      text: "Edit Homepage Details",
    },
    {
      eventKey: "2",
      title: "service-details",
      onClick: () => onUpdateActiveLink("services", "/admin/services-details"),
      text: "Edit Services",
    },
    {
      eventKey: "3",
      title: "service-add",
      onClick: () => onUpdateActiveLink("services", "/admin/service-add"),
      text: "Add Service",
    },
    {
      eventKey: "4",
      title: "team-details",
      onClick: () => onUpdateActiveLink("team", "/admin/team-details"),
      text: "Edit Team",
    },
    {
      eventKey: "5",
      title: "team-member-add",
      onClick: () => onUpdateActiveLink("team", "/admin/team-member-add"),
      text: "Add Team Member",
    },
    {
      eventKey: "6",
      title: "logout",
      onClick: logoutWithRedirect,
      text: "Log Out",
      href: "",
    },
  ];

  const NavLinksAry = [
    {
      eventKey: "1",
      title: "home",
      onClick: () => onUpdateActiveLink("home"),
      text: "Home",
      href: "#home",
    },
    {
      eventKey: "2",
      title: "services",
      onClick: () => onUpdateActiveLink("services"),
      text: "Services",
      href: "#services",
    },
    {
      eventKey: "3",
      title: "mission",
      onClick: () => onUpdateActiveLink("mission"),
      text: "Mission",
      href: "#mission",
    },
    {
      eventKey: "4",
      title: "team",
      onClick: () => onUpdateActiveLink("team"),
      text: "Team",
      href: "#team",
    },
    {
      eventKey: "5",
      title: "gallery",
      onClick: () => onUpdateActiveLink("gallery"),
      text: "Gallery",
      href: "#gallery",
    },
    {
      eventKey: "6",
      title: "login",
      onClick: loginWithRedirect,
      text: "Log In",
      href: "",
    },
  ];

  /* 
  Note: The collapseOnSelect property needs to be used in conjunction with adding the eventKey props to the 
        Nav.Link elements for the collapse on click to work in mobile view.
        */
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      className={scrolled ? "scrolled" : ""}
      id="#navbar_id"
    >
      <Container>
        <Navbar.Brand href="/">
          {/* <img src={logo} alt="Logo" /> */}
          <img src={logo} alt="All About Hair" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated && (
              <>
                {AdminNavLinksAry.map((item, idx) => (
                  <div key={idx}>
                    <NavLink
                      activeLink={activeLink}
                      title={item.title}
                      eventKey={item.eventKey}
                      onClick={item.onClick}
                    >
                      {item.text}
                    </NavLink>
                  </div>
                ))}
              </>
            )}
            {!isAuthenticated && (
              <>
                {NavLinksAry.map((item, idx) => (
                  <div key={idx}>
                    <NavLink
                      activeLink={activeLink}
                      title={item.title}
                      eventKey={item.eventKey}
                      onClick={item.onClick}
                      href={item.href}
                    >
                      {item.text}
                    </NavLink>
                  </div>
                ))}
              </>
            )}
            {/* <Nav.Link href="#prices" className={activeLink === 'prices' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('prices')}>Prices</Nav.Link> */}
            {/* <Nav.Link href="#contact" className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('contact')}>Contact</Nav.Link> */}
          </Nav>
          {!isAuthenticated && (
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
              <Nav.Link href="#contact">
                <button className="vvd">
                  <span>Let’s Connect</span>
                </button>
              </Nav.Link>
            </span>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
