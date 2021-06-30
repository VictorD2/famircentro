import React from "react";

// Componentes
import Navigation from "./Navigation";

// Styles
import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";

class DashBoard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default DashBoard;
