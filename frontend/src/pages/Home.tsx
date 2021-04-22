import React from "react";

import Carrusel from "../components/Carrusel";
import ListaCursos from "../components/ListaCursos";
import ListaOpiniones from "../components/ListaOpiniones";
import ListaTopCursos from "../components/ListaTopCursos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUser, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

class Home extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <NavBar />

        <Carrusel />
        <div className="position-static w-100 h-100 d-flex justify-content-center">
          <div className="caracteristicas">
            <div className="d-flex justify-content-around align-items-center w-100 h-100 fila">
              <div className="w-100 caracteristicas-item">
                <FontAwesomeIcon className="fs-3" icon={faBook} />
                <h5 className="caracteristicas-text">Online Courses</h5>
              </div>
              <div className="w-100 caracteristicas-item">
                <FontAwesomeIcon className="fs-3" icon={faUser} />
                <h5 className="caracteristicas-text">Amazing Teachers</h5>
              </div>
              <div className="w-100 caracteristicas-item">
                <FontAwesomeIcon className="fs-3" icon={faPhoneAlt} />
                <h5 className="caracteristicas-text">Amazing Teachers</h5>
              </div>
            </div>
          </div>
        </div>
        <ListaCursos />
        <ListaOpiniones />
        <ListaTopCursos />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
