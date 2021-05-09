import React, { useState } from "react";
import Navigation from "../../pages/DashBoard/Navigation";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import BuscadorProfesor from "../ProfesoresDash/BuscadorProfesor";
import { Estudiante } from "./Estudiante";
import ListaEstudiantes from "./ListaEstudiantes";
import { FaCheck, FaTimes } from "react-icons/fa";

const Usuarios = () => {
  const [estudiante, setEstudiante] = useState<Estudiante>({})
  const [filtro, setFiltro] = useState<string>("")
  const buscar = (text: string) => {
    setFiltro(text);
  }
  const handleModalChange = (estudiante: Estudiante) => {
    setEstudiante(estudiante);
  }

  return (
    <React.Fragment>
      <Navigation />
      <div className="contenido-principal p-4">
        <div className="d-flex flex-row">
          <FontAwesomeIcon className="me-3 fs-3" icon={faUser} />
          <h6 className="m-0 text-uppercase fs-3">Estudiantes</h6>
        </div>
        
        <div className="d-flex flex-row p-2 mt-4 justify-content-between flex-wrap">
          <div></div>
          <div className="mx-4 my-2"> <BuscadorProfesor funcion={buscar} /> </div>
        </div>

        <div className="py-4 mt-4">
          <table className="table table-bordered table-hover table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>APELLIDOS</th>
                <th>CORREO</th>
                <th>PAIS</th>
                <th>PROFESION</th>
                <th className="text-center">VER MÁS</th>
                <th className="text-center">DESHABILITAR</th>
              </tr>
            </thead>
            <tbody>
              <ListaEstudiantes filtro={filtro} funcion={handleModalChange} />
            </tbody>
          </table>
          {/* Modal */}
          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{estudiante.nombre} {estudiante.apellido}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={estudiante.url_foto_usuario} className="w-100" alt="..." />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{estudiante.profesion}</h5>
                          <p className="card-text">Correo : {estudiante.correo}</p>
                          <p className="card-text">Pais : {estudiante.nombre_pais}</p>
                          <p className="card-text">Telefono : {estudiante.telefono}</p>
                          <p className="card-text">RUT : {estudiante.rut}</p>
                          <p className="card-text">Habilitado : {estudiante.habilitado === 1 ? (<FaCheck className="text-success mb-1 ms-1" />) : (<FaTimes className="text-danger mb-1 ms-1" />)}</p>
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

export default Usuarios;