import React from 'react';

// Icons
import { FaCalendarAlt, FaCheck, FaDollarSign, FaPhoneAlt, FaTimes } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';


//Imagenes
import fotoSinCurso from '../../images/sinCurso.png';

//Interfaces
import { Curso } from './Curso';

interface Props {
    curso: Curso
    modalidad: string
}

const ModalCurso = (props: Props) => {
    return (
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header btn__blue">
                        <h5 className="modal-title" id="exampleModalLabel">{props.curso.nombre_curso}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card mb-3">
                            <div className="g-0">
                                <div className="row card-body">
                                    <div className="col-12">
                                        <h4 className="card-title mb-4">Datos del curso</h4>
                                    </div>
                                    <div className="col-4">
                                        {props.curso.url_foto_curso ? (<>
                                            <img src={props.curso.url_foto_curso} className="w-100" alt="..." />
                                        </>) : (<>
                                            <img src={fotoSinCurso} className="w-100" alt="..." />
                                        </>)
                                        }
                                    </div>

                                    <div className="col-8">
                                        <div className="d-flex">
                                            <p className="card-text fw-bold">Descripción: </p>
                                            <p className="ms-2 fw-normal">{props.curso.descripcion}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="card-text fw-bold">Precio:  </p>
                                            <p className="ms-2 fw-normal"><FaDollarSign className="mb-1" />{props.curso.precio}</p>
                                        </div>

                                        {props.modalidad === 'Sincrónico' ? (<>
                                            <div className="d-flex">
                                                <p className="card-text fw-bold">Enlace:  </p>
                                                <p className="ms-2 fw-normal">{props.curso.enlace}</p>
                                            </div>
                                            <div className="d-flex">
                                                <p className="card-text fw-bold"><FiClock className="mb-1" /> Duración:  </p>
                                                <p className="ms-2 fw-normal">{props.curso.duracion} horas</p>
                                            </div>
                                            <div className="d-flex">
                                                <p className="card-text fw-bold"><FaCalendarAlt className="mb-1" /> Horario: </p>
                                                <p className="ms-2 fw-normal">{props.curso.horario}</p>
                                            </div>
                                        </>) : (<></>)}

                                        <p className="card-text">Habilitado : {props.curso.habilitado === 1 ? (<FaCheck className="text-success mb-1 ms-1" />) : (<FaTimes className="text-danger mb-1 ms-1" />)}</p>
                                    </div>
                                    <div className="col-12">
                                        <h4 className="card-title my-4">Datos del Profesor</h4>
                                    </div>
                                    <div className="col-4">
                                        <img src={props.curso.url_foto_usuario} className="w-100" alt="..." />
                                    </div>
                                    <div className="col-8">
                                        <div className="d-flex">
                                            <p className="card-text fw-bold">Nombre:</p>
                                            <p className="ms-2 fw-normal">{props.curso.nombre} {props.curso.apellido}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="card-text fw-bold">Profesión:  </p>
                                            <p className="ms-2 fw-normal">{props.curso.profesion}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="card-text fw-bold">Correo:  </p>
                                            <p className="ms-2 fw-normal">{props.curso.correo}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="card-text fw-bold"><FaPhoneAlt className="mb-1" /> Teléfono: </p>
                                            <p className="ms-2 fw-normal"> {props.curso.telefono}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="card-text fw-bold">RUT:  </p>
                                            <p className="ms-2 fw-normal">{props.curso.rut}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCurso
