/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { faBook, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaCalendarAlt, FaCheck, FaDollarSign, FaEdit, FaEye, FaPhoneAlt, FaTimes } from 'react-icons/fa'
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { Curso } from './Curso'
import Navigation from '../../pages/DashBoard/Navigation'
import BuscadorProfesor from '../ProfesoresDash/BuscadorProfesor'
import ListaCursos from './ListaCursos'
import { FiClock } from 'react-icons/fi';
import fotoSinCurso from '../../images/sinCurso.png';
interface Params {
    modalidad: string;
    tipo: string;
}
const initialState = {
    nombre_curso: "",
    descripcion: "",
    precio: 0,
    duracion: 0,
    horario: "",
    enlace: "",
    id_usuario: 0,
    modulos: []
};
const Cursos = () => {
    const params = useParams<Params>();
    const history = useHistory();

    const [curso, setCurso] = useState<Curso>(initialState);
    const [filtro, setFiltro] = useState<string>("");
    const [tipo, setTipo] = useState("");
    const [modalidad, setModalidad] = useState("");

    const handleModalChange = (curso: Curso) => setCurso(curso);

    const createCurso = () => history.push(`/DashBoard/${params.tipo}/${params.modalidad}/nuevo`);

    const buscar = (text: string) => setFiltro(text);


    useEffect(() => {
        if ((params.tipo !== 'Talleres' && params.tipo !== 'Cursos') || (params.modalidad !== 'Asincronos' && params.modalidad !== 'Sincronos')) return history.push('/Dashboard');//Validando ruta
        params.tipo === "Talleres" ? setTipo('Taller') : setTipo('Curso');
        params.modalidad === "Asincronos" ? setModalidad('Asincrónico') : setModalidad('Sincrónico');
    }, [params.tipo, params.modalidad]);
    return (
        <React.Fragment>
            <Navigation />
            <ToastContainer />
            <div className="contenido-principal p-4">
                <div className="d-flex flex-row bg-white">
                    <FontAwesomeIcon className="me-3 fs-3" icon={faBook} />
                    <h6 className="m-0 text-uppercase fs-3">{tipo} {modalidad}</h6>
                </div>
                <div className="d-flex flex-row p-2 mt-4 flex-wrap justify-content-between">
                    <button onClick={createCurso} className="btn btn__blue mx-4 my-2">
                        <FontAwesomeIcon className="me-2" icon={faPlus} />
                        Agrega un {tipo} {modalidad}
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
                                <th><FaDollarSign className="mb-1" /> PRECIO</th>
                                {modalidad === 'Sincrónico' ? (<>
                                    <th><FaCalendarAlt className="mb-1" /> HORARIO</th>
                                    <th><FiClock className="mb-1" /> DURACIÓN</th>
                                </>) : (<></>)}
                                <th className="text-center"><FaEdit className="mb-1" /> EDITAR</th>
                                <th className="text-center"><FaEye className="mb-1" /> VER MÁS</th>
                                <th className="text-center"><FaTimes className="mb-1" /> DESHABILITAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListaCursos filtro={filtro} funcion={handleModalChange} />
                        </tbody>
                    </table>
                    {/* Modal */}
                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <div className="modal-header btn__blue">
                                    <h5 className="modal-title" id="exampleModalLabel">{curso.nombre_curso}</h5>
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
                                                    {curso.url_foto_curso ? (<>
                                                        <img src={curso.url_foto_curso} className="w-100" alt="..." />
                                                    </>) : (<>
                                                        <img src={fotoSinCurso} className="w-100" alt="..." />
                                                    </>)
                                                    }
                                                </div>

                                                <div className="col-8">
                                                    <p className="card-text fw-bold">Descripción: <p className="fw-normal">{curso.descripcion}</p> </p>
                                                    <p className="card-text fw-bold">Precio: <p className="fw-normal"><FaDollarSign className="mb-1" />{curso.precio}</p> </p>

                                                    {modalidad === 'Sincrónico' ? (<>
                                                        <p className="card-text fw-bold">Enlace: <p className="fw-normal">{curso.enlace}</p> </p>
                                                        <p className="card-text fw-bold"><FiClock className="mb-1" /> Duración: <p className="fw-normal">{curso.duracion} horas</p> </p>
                                                        <p className="card-text fw-bold"><FaCalendarAlt className="mb-1" /> Horario: <p className="fw-normal">{curso.horario}</p> </p>
                                                    </>) : (<></>)}

                                                    <p className="card-text">Habilitado : {curso.habilitado === 1 ? (<FaCheck className="text-success mb-1 ms-1" />) : (<FaTimes className="text-danger mb-1 ms-1" />)}</p>
                                                </div>
                                                {modalidad !== 'Sincrónico' ? (<>
                                                    <div className="col-12 my-4">
                                                        <button className="btn btn__blue">Agregar Modulo</button>
                                                    </div>
                                                </>) : (<></>)}
                                                <div className="col-12">
                                                    <h4 className="card-title my-4">Datos del Profesor</h4>
                                                </div>
                                                <div className="col-4">
                                                    <img src={curso.url_foto_usuario} className="w-100" alt="..." />
                                                </div>
                                                <div className="col-8">
                                                    <p className="card-text fw-bold">Nombre: <p className="fw-normal">{curso.nombre} {curso.apellido}</p> </p>
                                                    <p className="card-text fw-bold">Profesión: <p className="fw-normal">{curso.profesion}</p> </p>
                                                    <p className="card-text fw-bold">Correo: <p className="fw-normal">{curso.correo}</p> </p>
                                                    <p className="card-text fw-bold">Teléfono: <p className="fw-normal"><FaPhoneAlt className="mb-1" /> {curso.telefono}</p> </p>
                                                    <p className="card-text fw-bold">RUT: <p className="fw-normal">{curso.rut}</p> </p>
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
                </div>
            </div>
        </React.Fragment>
    )
}

export default Cursos
