import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserHistory } from "history";
import { getConfig } from "./config";
import { Auth0Provider } from "@auth0/auth0-react";
// import { BrowserRouter } from "react-router-dom";

// create a client
const queryClient = new QueryClient();

const history = createBrowserHistory();

const onRedirectCallback = (appState) => {
  console.log(window.location.pathname);
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  // redirectUri: window.location.origin,
  // redirectUri: window.location.origin + '/callback',
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
  cacheLocation: "localstorage",
  onRedirectCallback,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <Auth0Provider {...providerConfig}>
      <QueryClientProvider client={queryClient}>
        {/* <BrowserRouter> */}
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        {/* </BrowserRouter> */}
      </QueryClientProvider>
    </Auth0Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
