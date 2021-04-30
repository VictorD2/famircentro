import React from "react";
import { Profesor } from "./Profesor";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";

interface Props {
  profesor: Profesor;
}

const ProfesorItem = (props: Props) => {
  const history = useHistory();

  return (
    <tr>
      <td>{props.profesor.id_profesor}</td>
      <td>{props.profesor.nombre}</td>
      <td>{props.profesor.apellido}</td>
      <td>{props.profesor.email}</td>
      <td>{props.profesor.pais}</td>
      <td>{props.profesor.profesion}</td>
      <td className="text-center">
        <button className="btn btn-outline-info">
          <FontAwesomeIcon className="fs-5" icon={faEye} />
        </button>
      </td>
      <td className="text-center">
        <button
          onClick={() =>
            history.push(
              `/DashBoard/Profesores/update/${props.profesor.id_profesor}`
            )
          }
          className="btn btn-outline-warning"
        >
          <FontAwesomeIcon className="fs-5" icon={faEdit} />
        </button>
      </td>
    </tr>
  );
};

export default ProfesorItem;
