import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    // Replace with Sentry / LogRocket / etc. in production
    if (process.env.NODE_ENV === "production") {
      // Example:
      // logErrorToService(error, errorInfo);
    } else {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
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

          <p>
            We're sorry — an unexpected error occurred.
          </p>

          <button
            onClick={this.handleReset}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>

          {process.env.NODE_ENV !== "production" && error && (
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
                Error Details (Development Only)
              </summary>
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {error.toString()}
                {"\n\n"}
                {errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;