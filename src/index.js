import React from "react";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename="/" >
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
