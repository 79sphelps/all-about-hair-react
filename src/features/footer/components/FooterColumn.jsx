import { Col } from "react-bootstrap";

const FooterColumn = ({
  title,
  children,
  md = 4,
  className = "footer-copywright",
}) => {
  return (
    <Col md={md} className={className}>
      <h3>{title}</h3>
      {children}
    </Col>
  );
};

export default FooterColumn;