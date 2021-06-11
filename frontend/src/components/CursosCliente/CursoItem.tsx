/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Link } from 'react-router-dom'
import { BsStar } from 'react-icons/bs'
import { GiTeacher } from 'react-icons/gi'
import { Curso } from '../CursosDash/Curso'
import { GrShop } from 'react-icons/gr'
import foto from '../../images/bg-2.jpg';
import { FaDollarSign, FaEye } from 'react-icons/fa'
interface Props {
    curso: Curso
}
const CursoItem = (props: Props) => {
    return (
        <div className="container__curso">
            <div className="content__row">
                <div className="column-detail">
                    <div className="row">
                        <h3 className="fw-bold justify-content-start">{props.curso.nombre_curso}</h3>
                    </div>
                    <div className="row">
                        <span>{props.curso.descripcion}</span>
                    </div>
                    <div className="row mt-5">
                        <div className="d-flex align-items-center">
                            <GiTeacher className="me-2" /><span>Docente: {props.curso.nombre} {props.curso.apellido}</span>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                            <FaDollarSign className="me-2" /><span className="me-1">Precio: {props.curso.precio}</span><Link className="text-decoration-none" to="#temario">(Ver temario)</Link>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                            <BsStar className="me-2" /><span className="me-1">Calificación: 4.8</span>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <Link to={`/Clase/${props.curso.id_curso}`} className="btn btn__curso btn-width btn-space d-flex justify-content-center align-items-center">
                            <FaEye className="me-2" />Ver Curso
                        </Link>
                        <Link to={`/Comprar/${props.curso.id_curso}`} className="btn btn-warning btn-width d-flex justify-content-center align-items-center">
                            <GrShop className="me-2 text-danger" />Comprar curso
                        </Link>
                    </div>
                </div>
                <div className="my-auto">
                    {/* <div className="img-fluid" style={{ width: "728px", height: "342px", background: "red" }}>

                        </div> */}
                    <img src={foto} className="img-fluid ancho-img" alt={`Curso`} />
                </div>
            </div>
        </div>
    )
}

export default CursoItem
