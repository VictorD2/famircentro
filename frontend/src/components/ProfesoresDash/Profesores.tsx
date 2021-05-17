import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Components
import Navigation from "../../pages/DashBoard/Navigation";
import ListaProfesores from "./ListaProfesores";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Profesor } from "./Profesor";
import {FaCheck, FaTimes} from 'react-icons/fa';

//Components
import BuscadorProfesor from "./BuscadorProfesor";

//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css/animate.min.css';

const Profesores = () => {

  const [profesor, setProfesor] = useState<Profesor>({})
  const [filtro, setFiltro] = useState<string>("")
  const history = useHistory();
  //Redireccionamiento del boton crear profesor
  const createUser = () => {
    history.push("/DashBoard/Profesores/nuevo");
  };

  const handleModalChange = (profesor: Profesor) => {
    setProfesor(profesor);
  }

  const buscar = (text: string) => {
    setFiltro(text);
  }

  return (
    <React.Fragment>
      <Navigation />
      <ToastContainer/>
      <div className="contenido-principal p-4">
        <div className="d-flex flex-row bg-white">
          <FontAwesomeIcon className="me-3 fs-3" icon={faBookReader} />
          <h6 className="m-0 text-uppercase fs-3">PROFESORES</h6>
        </div>
        <div className="d-flex flex-row p-2 mt-4 flex-wrap justify-content-between">
          <button onClick={createUser} className="btn btn__blue mx-4 my-2">
            <FontAwesomeIcon className="me-2" icon={faPlus} />
            Agrega un profesor
          </button>
          <div className="mx-4 my-2">
            <BuscadorProfesor funcion={buscar} />
          </div>
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
                <th className="text-center">DESHABILITAR</th>
              </tr>
            </thead>
            <tbody>
              <ListaProfesores filtro={filtro} funcion={handleModalChange} />
            </tbody>
          </table>
          {/* Modal */}
          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header btn__blue">
                  <h5 className="modal-title" id="exampleModalLabel">{profesor.nombre} {profesor.apellido}</h5>
                  <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={profesor.url_foto_usuario} className="w-100" alt="..." />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <p className="card-text">Profesión :{profesor.profesion}</p>
                          <p className="card-text">Correo : {profesor.correo}</p>
                          <p className="card-text">Pais : {profesor.nombre_pais}</p>
                          <p className="card-text">Telefono : {profesor.telefono}</p>
                          <p className="card-text">RUT : {profesor.rut}</p>
                          <p className="card-text">Habilitado : {profesor.habilitado_u===1?(<FaCheck className="text-success mb-1 ms-1"/>):(<FaTimes className="text-danger mb-1 ms-1"/>)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profesores;
