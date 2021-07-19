/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//Iconos
import { GiTeacher } from "react-icons/gi";
import { GrShop } from "react-icons/gr";

//Imagenes
import foto from "../../images/bg-2.jpg";

//Interfaces
import { Curso } from "../CursosDash/Curso";

interface Props {
  curso: Curso;
}
const CursoItem = (props: Props) => {
  const ref = useRef<HTMLParagraphElement | null>();

  useEffect(() => {
    if (ref.current) ref.current.innerHTML = props.curso.descripcion;
    return () => {};
  }, []);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 bg-white">
      <div className="w-100 mt-3 overflow-hidden">
        <Link to={`/Clase/${props.curso.id_curso}`} className="w-100">
          <img className="img-fluid fotoCurso" src={foto} alt={props.curso.nombre_curso} />
        </Link>
      </div>
      <div className="bg-white">
        <h3 className="ms-3 fw-bold mt-3" style={{ fontSize: "16px" }}>
          {props.curso.nombre_curso}
        </h3>
        <p className="mx-3 mt-3 overflow-hidden descripcion__curso" style={{ fontSize: "16px", minHeight: "78px", maxHeight: "78px" }}>
          {props.curso.descripcion}
        </p>
      </div>
      <div className="d-flex flex-lg-row flex-column media flex-md-column align-items-start align-items-lg-center justify-content-between bg-white mb-3">
        <p className="text-truncate m-0 descripcion__curso mb-3 mb-lg-0">
          <GiTeacher className="me-2 text-truncate" /> {props.curso.nombre} {props.curso.apellido}
        </p>
        <Link to={`/Comprar/${props.curso.id_curso}`} className="text-decoration-none text-dark">
          <button className="btn btn-warning">
            <GrShop className="me-2 text-danger" />
            Comprar
          </button>
        </Link>
      </div>
    </div>
    // <div className="container__curso">
    //   <div className="content__row">
    //     <div className="row column-detail">
    //       <div className="col-12 col-sm-6">
    //         <h3 className="fw-bold justify-content-start">{props.curso.nombre_curso}</h3>
    //         <p style={{ textAlign: "justify" }} ref={(node) => (ref.current = node)}></p>
    //         <div className="mt-5">
    //           <div className="d-flex align-items-center">
    //             <GiTeacher className="me-2" />
    //             <span>
    //               Docente: {props.curso.nombre} {props.curso.apellido}
    //             </span>
    //           </div>
    //           <div className="d-flex align-items-center mt-2">
    //             <FaDollarSign className="me-2" />
    //             <span className="me-1">Precio: {props.curso.precio}</span>
    //             <Link className="text-decoration-none" to={`/Clase/${props.curso.id_curso}`}>
    //               (Ver temario)
    //             </Link>
    //           </div>
    //           <div className="d-flex align-items-center mt-2">
    //             <BsStar className="me-2" />
    //             <span className="me-1">Calificación: 4.8</span>
    //           </div>
    //         </div>
    //         <div className="row mt-5">
    //           <Link to={`/Clase/${props.curso.id_curso}`} className="btn btn__curso btn-width btn-space d-flex justify-content-center align-items-center">
    //             <FaEye className="me-2" />
    //             Ver Curso
    //           </Link>
    //           <Link to={`/Comprar/${props.curso.id_curso}`} className="btn btn-warning btn-width d-flex justify-content-center align-items-center">
    //             <GrShop className="me-2 text-danger" />
    //             Comprar curso
    //           </Link>
    //         </div>
    //       </div>
    //       <div className="col-12 col-sm-6">
    //         <div className="my-auto">
    //           <img src={foto} className="img-fluid ancho-img" alt={`Curso`} />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CursoItem;
