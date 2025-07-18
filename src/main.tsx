import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./lib/i18n"; // Initialize i18n
import "./assets/shimmer.css";
import "./styles.css";

// Disable context menu in production
if (import.meta.env.PROD) {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
