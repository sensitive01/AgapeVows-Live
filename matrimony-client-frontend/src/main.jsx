import "./assets/css/bootstrap.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/style.css";

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
