import React from "react";
import Navigation from "../../pages/DashBoard/Navigation";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEye } from "@fortawesome/free-solid-svg-icons";

const Usuarios = () => {
  return (
    <React.Fragment>
      <Navigation />
      <div className="contenido-principal p-4">
        <div className="d-flex flex-row">
          <FontAwesomeIcon className="me-3 fs-3" icon={faBars} />
          <h6 className="m-0 text-uppercase fs-3">Titulo Section</h6>
        </div>
        <div className="d-flex flex-row p-2 mt-4 justify-content-evenly flex-wrap">
          <button className="btn btn-primary mx-4 my-2">xdddd</button>
          <button className="btn btn-primary mx-4 my-2">xdddd</button>
          <button className="btn btn-primary mx-4 my-2">xdddd</button>
          <button className="btn btn-primary mx-4 my-2">xdddd</button>
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
                <th className="text-center">VER MÁS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>XD</td>
                <td>XD</td>
                <td>XD</td>
                <td>XD</td>
                <td>XD</td>
                <td className="text-center">
                  <button className="btn btn-outline-info">
                    <FontAwesomeIcon className="fs-5" icon={faEye} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Usuarios;
