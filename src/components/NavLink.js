import { Nav } from "react-bootstrap";

export default function NavLink({ activeLink, title, eventKey, onClick, href, children }) {
  return (
    <Nav.Link
      eventKey={eventKey}
      className={activeLink === title ? "active navbar-link" : "navbar-link"}
      onClick={onClick}
      href={href}
    >
      {children}
    </Nav.Link>
  );
}
