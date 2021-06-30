import React from "react";
import Navbar from "./Helpers/NavBar";
import Footer from "./Helpers/Footer";

function Layout(props: any) {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
