import React from "react";
import ReactDOM from "react-dom";

import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/plugins/fontawesome-free/css/all.min.css";
import "admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";

import "admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js";
import "admin-lte/dist/js/adminlte.min.js";
import "./index.css";
// Components
import App from "./components/App";
// Pages
ReactDOM.render(<App />, document.getElementById("root"));
