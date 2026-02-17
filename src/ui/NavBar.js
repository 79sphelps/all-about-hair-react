import { useState, useEffect, useRef } from "react";
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
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const navbarRef = useRef(null);
  const toggleRef = useRef(null);

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

  /* CLOSE MENU ON OUTSIDE CLICK */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!expanded) return;

      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded]);

  const onUpdateActiveLink = (value, page) => {
    setActiveLink(value);
    setExpanded(false); // close mobile menu

    if (page) navigate(page);
  };

  const links = isAuthenticated
    ? [
        ["home", "/admin/home-page-details", "Edit Homepage Details"],
        ["services", "/admin/services-details", "Edit Services"],
        ["services", "/admin/service-add", "Add Service"],
        ["team", "/admin/team-details", "Edit Team"],
        ["team", "/admin/team-member-add", "Add Team Member"],
      ]
    : [
        ["home", null, "Home", "#home"],
        ["services", null, "Services", "#services"],
        ["mission", null, "Mission", "#mission"],
        ["team", null, "Team", "#team"],
        ["gallery", null, "Gallery", "#gallery"],
      ];

  /* 
  Note: The collapseOnSelect property needs to be used in conjunction with adding the eventKey props to the 
        Nav.Link elements for the collapse on click to work in mobile view.
        */
  return (
    <Navbar
      ref={navbarRef}
      expanded={expanded}
      onToggle={(value) => setExpanded(value)}
      as="nav"
      aria-label="Primary navigation"
      collapseOnSelect
      expand="md"
      className={scrolled ? "scrolled" : ""}
      id="#navbar_id"
    >
      <Container>
        <Navbar.Brand href="/" aria-label="All About Hair home">
          {/* <img src={logo} alt="Logo" /> */}
          <img src={logo} alt="All About Hair logo" />
        </Navbar.Brand>

        <Navbar.Toggle
          ref={toggleRef}
          aria-label="Toggle navigation menu"
          aria-controls="primary-navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="primary-navigation">
          <Nav className="ms-auto" role="menubar">
            {links.map(([title, page, text, href], idx) => (
              <div key={idx}>
                <NavLink
                  key={idx}
                  activeLink={activeLink}
                  title={title}
                  onClick={() =>
                    page
                      ? onUpdateActiveLink(title, page)
                      : onUpdateActiveLink(title)
                  }
                  href={href}
                >
                  {text}
                </NavLink>
              </div>
            ))}

            <NavLink
              title={isAuthenticated ? "logout" : "login"}
              onClick={isAuthenticated ? logoutWithRedirect : loginWithRedirect}
            >
              {isAuthenticated ? "Log Out" : "Log In"}
            </NavLink>

            {/* <Nav.Link href="#prices" className={activeLink === 'prices' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('prices')}>Prices</Nav.Link> */}
            {/* <Nav.Link href="#contact" className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('contact')}>Contact</Nav.Link> */}
          </Nav>
          {!isAuthenticated && (
            <span className="navbar-text">
              <div className="social-icon" aria-label="Social media links">
                <a href="#home" aria-label="Visit our Facebook">
                  <img src={navIcon1} alt="" aria-hidden="true" />
                </a>
                <a href="#home" aria-label="Visit our Instagram">
                  <img src={navIcon2} alt="" aria-hidden="true" />
                </a>
                <a href="#home" aria-label="Visit our Twitter">
                  <img src={navIcon3} alt="" aria-hidden="true" />
                </a>
              </div>
              <Nav.Link href="#contact" className="navbar-lets-connect-btn">
                <button type="button" className="vvd">
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
