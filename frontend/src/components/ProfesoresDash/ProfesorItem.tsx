import React from "react";
import { useHistory } from "react-router-dom";

//Services
import * as profesorServices from "./ProfesoresServices";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { TiCancel } from "react-icons/ti";

//Toastify
import { toast } from "react-toastify";

// Interfaces
import { Profesor } from "./Profesor";

interface Props {
  profesor: Profesor;
  funcion: (profesor: Profesor) => void;
  cargaDatos: () => void;
}

const ProfesorItem = (props: Props) => {
  const history = useHistory();

  const ponerDatos = () => props.funcion(props.profesor);

  const deshabilitar = async () => {
    if (!window.confirm("¿Está seguro que desea habilitar/deshabilitar el usuario?")) return;

    const res = await profesorServices.eliminarProfesor(props.profesor.id_usuario?.toString());
    if (res.data.success) {
      props.cargaDatos();
      return toast.success(res.data.success);
    }
    if (res.data.error) return toast.error(res.data.success);
  };
  return (
    <React.Fragment>
      <tr>
        <td>{props.profesor.id_usuario}</td>
        <td>{props.profesor.nombre}</td>
        <td>{props.profesor.apellido}</td>
        <td>{props.profesor.correo}</td>
        <td>{props.profesor.profesion}</td>

        <td className="text-center">
          <button onClick={() => history.push(`/DashBoard/Profesores/update/${props.profesor.id_usuario}`)} className="btn btn__amarillo">
            <FontAwesomeIcon className="fs-5" icon={faEdit} />
          </button>
        </td>

        <td className="text-center">
          <button onClick={ponerDatos} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn__blue">
            <FontAwesomeIcon className="fs-5" icon={faEye} />
          </button>
        </td>
        <td className="text-center">
          {props.profesor.habilitado_u ? (
            <>
              <button onClick={deshabilitar} className="btn btn-secondary">
                <TiCancel className="fs-4" />
              </button>
            </>
          ) : (
            <>
              <button onClick={deshabilitar} className="btn btn-success">
                <FontAwesomeIcon className="fs-4" icon={faCheck} />
              </button>
            </>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default ProfesorItem;
