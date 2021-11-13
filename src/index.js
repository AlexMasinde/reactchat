import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

Sentry.init({
  dsn: "https://c532109757af43cd9bf3e3af12bd9015@o1064810.ingest.sentry.io/6055905",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.2,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
