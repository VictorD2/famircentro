import React from "react";

import Carrusel from "../components/Carrusel";
import ListaCursos from "../components/ListaCursos";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUser, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";


const Home = () => {
  return (
    <React.Fragment>
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
    <ListaCursos/>

    </React.Fragment>
  );
};

export default Home;
