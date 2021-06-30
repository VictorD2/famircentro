import React from "react";
import { Link } from "react-router-dom";

// Interfaces
interface Props {
  title: string;
  url: string;
  nombre_profesor: string;
  fecha: string;
  descripcion: string;
  img: string;
}
const TopCursosItem = (props: Props) => {
  return (
    <div className="col-12 col-lg-6 show">
      <div className="d-flex top-cursos-item">
        <div className="info">
          <h5>{props.title}</h5>
          <p className="autor">
            By {props.nombre_profesor} | {props.fecha}
          </p>
          <p className="curso-description">{props.descripcion}</p>
          <Link to={props.url} className="btn btn__more mt-5">
            Ver más
          </Link>
        </div>
        <div className="img" style={{ backgroundImage: `url(${props.img})` }}></div>
      </div>
    </div>
  );
};

export default TopCursosItem;
