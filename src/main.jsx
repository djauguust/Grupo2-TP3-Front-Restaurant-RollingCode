import "./styles/fuenteDeLetra.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.css";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
