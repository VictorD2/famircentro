import React from "react";
import Navigation from "../../pages/DashBoard/Navigation";
import ListaProfesores from "./ListaProfesores";
import { useHistory } from "react-router-dom";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader, faPlus } from "@fortawesome/free-solid-svg-icons";

const Profesores = () => {
  const history = useHistory();
  //Redireccionamiento del boton crear profesor
  const createUser = () => {
    history.push("/DashBoard/Profesores/nuevo");
  };
  return (
    <React.Fragment>
      <Navigation />
      <div className="contenido-principal p-4">
        <div className="d-flex flex-row bg-white">
          <FontAwesomeIcon className="me-3 fs-3" icon={faBookReader} />
          <h6 className="m-0 text-uppercase fs-3">PROFESORES</h6>
        </div>
        <div className="d-flex flex-row p-2 mt-4 flex-wrap">
          <button onClick={createUser} className="btn btn-primary mx-4 my-2">
            <FontAwesomeIcon className="me-2" icon={faPlus} />
            Agrega un profesor
          </button>
        </div>
        <div className="py-4 mt-4">
          <table className="table table-light-gray table-bordered table-hover table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>APELLIDOS</th>
                <th>CORREO</th>
                <th>PAIS</th>
                <th>PROFESION</th>
                <th className="text-center">EDITAR</th>
                <th className="text-center">VER MÁS</th>
              </tr>
            </thead>
            <tbody>
              <ListaProfesores />
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profesores;
