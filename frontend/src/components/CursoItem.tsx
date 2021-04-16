import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface Props {
  icon: IconDefinition;
  title: string;
  descripcion: string;
}
const CursoItem = (props: Props) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mt-5 d-flex curso-item">
      <div className="icon-curso-container">
        <FontAwesomeIcon
          className="my-auto mx-2 text-white"
          icon={props.icon}
        />
      </div>
      <div>
        <h5 className="curso-title">{props.title}</h5>
        <p className="curso-descripcion">{props.descripcion}</p>
      </div>
    </div>
  );
};

export default CursoItem;
