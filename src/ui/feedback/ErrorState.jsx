import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

const normalizeErrors = (errors) => {
  if (!errors) return [];

  if (Array.isArray(errors)) return errors;

  if (errors instanceof Error) return [errors.message];

  if (typeof errors === "string") return [errors];

  if (typeof errors === "object") {
    return Object.values(errors).flat().map(String);
  }

  return ["Something went wrong while loading the page."];
};

const ErrorState = ({
  title = "Something went wrong",
  subtitle = "We couldn’t load the page data.",
  errors,
  showReload = true,
}) => {
  const messages = normalizeErrors(errors);

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        textAlign: "center",
        padding: "2rem",
      }}
      role="alert"
      aria-live="assertive"
    >
      <h1 style={{ marginBottom: "1rem" }}>{title}</h1>
      <p style={{ marginBottom: "1.5rem", maxWidth: 600 }}>
        {subtitle}
      </p>

      {messages.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginBottom: "2rem",
            maxWidth: 700,
          }}
        >
          {messages.map((msg, index) => (
            <li
              key={index}
              style={{
                background: "#fdecea",
                color: "#611a15",
                padding: "12px 16px",
                borderRadius: "6px",
                marginBottom: "8px",
              }}
            >
              {msg}
            </li>
          ))}
        </ul>
      )}

      {showReload && (
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      )}
    </Container>
  );
};

ErrorState.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  errors: PropTypes.any,
  showReload: PropTypes.bool,
};

export default ErrorState;
