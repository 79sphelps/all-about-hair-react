import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";


function Fallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      style={{
        padding: "2rem",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2>Something went wrong.</h2>
      <p>An unexpected error occurred.</p>

      <button
        onClick={resetErrorBoundary}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Try Again
      </button>

      {process.env.NODE_ENV !== "production" && (
        <details
          style={{
            marginTop: "1.5rem",
            textAlign: "left",
            background: "#f8f8f8",
            padding: "1rem",
            borderRadius: "6px",
            overflowX: "auto",
          }}
        >
          <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
            Error Details (Dev Only)
          </summary>
          <pre>{error?.stack}</pre>
        </details>
      )}
    </div>
  );
}

const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
      onError={(error, info) => {
        if (process.env.NODE_ENV === "production") {
          // send to Sentry / LogRocket here
        } else {
          console.error("ErrorBoundary caught:", error, info);
        }
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
