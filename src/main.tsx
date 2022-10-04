import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { InitWasm } from "./components";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <InitWasm>
      <BrowserRouter>
        <App>
          <Router />
        </App>
      </BrowserRouter>
    </InitWasm>
  </React.StrictMode>
);
