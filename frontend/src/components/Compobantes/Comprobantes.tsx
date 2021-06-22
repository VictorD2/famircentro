/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react';

//Iconos
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navigation from '../../pages/DashBoard/Navigation'
import { RiFileForbidLine } from "react-icons/ri";

//Toastify
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from 'react';

//Foto prueba
// import fotoPrueba from '../../images/pc-2.jpg';

//Services
import * as comprobanteServices from './ComprobanteServices';
import * as cursoServices from '../CursosDash/CursosServices';
import * as usuarioServices from '../EstudiantesDash/EstudianteService';


//Interfaces
import { Comprobante } from './Comprobante';
import { Curso } from '../CursosDash/Curso';
import { Estudiante } from '../EstudiantesDash/Estudiante';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


const initialStateComprobante: Comprobante = {
    fecha_enviado: "",
    id_curso: "",
    id_usuario: "",
    url_foto_comprobante: "",
}

const initialStateCurso: Curso = {
    descripcion: "",
    enlace: "",
    horario: "",
    nombre_curso: "",
    precio: 0,
    url_foto_curso: "",

}

const Comprobantes = () => {

    const [comprobantes, setComprobantes] = useState<Comprobante[]>([]);
    const [comprobante, setComprobante] = useState<Comprobante>(initialStateComprobante);
    const [estudiante, setEstudiante] = useState<Estudiante>({});
    const [curso, setCurso] = useState<Curso>(initialStateCurso);

    useEffect(() => {
        getComprobantes();
        return () => {
            setComprobantes([]);
            setEstudiante({})
            setComprobante(initialStateComprobante);
            setCurso(initialStateCurso);
        }
    }, [])

    const getComprobantes = async () => {
        const res = await comprobanteServices.getComprobantes();
        setComprobantes(res.data);
    }
    const cambiarDatosModal = async (id_comprobante?: number) => {
        const res = await comprobanteServices.getComprobanteById(id_comprobante);
        setComprobante(res.data);
        const resCurso = await cursoServices.getCursoById(res.data.id_curso);
        setCurso(resCurso.data);
        const resUsuario = await usuarioServices.getEstudianteById(res.data.id_usuario);
        setEstudiante(resUsuario.data);
    }

    const inscribirCurso = async () => {
        if (comprobante.id_curso === "") return toast.warning('No ha seleccionado un comprobante');
        const res = await comprobanteServices.crearInscripcion(comprobante);
        if (res.data.success) {
            setComprobante(initialStateComprobante);
            getComprobantes();
            return toast.success(res.data.success);
        }
        if (res.data.error) return toast.error(res.data.error);
    }
    const eliminarComprobante = async () => {
        if (comprobante.id_curso === "") return toast.warning('No ha seleccionado un comprobante');
        const res = await comprobanteServices.eliminarComprobante(comprobante.id_comprobante + "");
        if (res.data.success) {
            setComprobante(initialStateComprobante);
            getComprobantes();
            return toast.success(res.data.success);
        }
        if (res.data.error) return toast.error(res.data.error);
    }

    return (
        <React.Fragment>
            <Navigation />
            <ToastContainer />
            <div className="contenido-principal p-4">
                <div className="d-flex flex-row bg-white efecto_titulo">
                    <FontAwesomeIcon className="me-3 fs-3" icon={faFileAlt} />
                    <h6 className="m-0 text-uppercase fs-3">COMPROBANTES</h6>
                </div>
                <div className="d-flex flex-row p-2 mt-4 flex-wrap justify-content-between">
                    <div className="mx-4 my-2">
                        {/* <BuscadorProfesor funcion={buscar} /> */}
                    </div>
                </div>
                {comprobantes.length === 0 ? (<>
                    <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "74vh" }}>
                        <RiFileForbidLine className="fs-1 mb-2" />
                        <p className="fs-4">No hay comprobantes</p>
                    </div>
                </>) : (<>
                    <div className="py-4 mt-4">
                        <div className="row">
                            {comprobantes.map(comprobante => {
                                return (
                                    <div key={comprobante.id_comprobante} className="col-12 col-sm-6 col-lg-3">
                                        <div className="card mb-5">
                                            <div className="card-header">
                                                {comprobante.nombre_curso}
                                            </div>
                                            <div className="card-body">
                                                <img src={comprobante.url_foto_comprobante} className="img-fluid" alt="" />
                                                <p className="m-0 mt-2"><span className="fw-bold">Estudiante:<span /></span> {comprobante.nombre} {comprobante.apellido}</p>
                                            </div>
                                            <div className="card-footer ms-auto">
                                                <button onClick={() => cambiarDatosModal(comprobante.id_comprobante)} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn__blue">
                                                    <FontAwesomeIcon className="fs-6 me-1" icon={faFileAlt} /> Ver Comprobante
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>)}
                {/* Modal */}
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header btn__blue">
                                <h5 className="modal-title" id="exampleModalLabel">{curso?.tipo} {curso?.nombre_curso}</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="card mb-3">
                                    <div className="row g-0">
                                        <div className="col-md-6">
                                            <img src={comprobante.url_foto_comprobante} className="w-100" alt="..." />
                                            <p><span className="text-uppercase fw-bold">Fecha Enviado: </span>{comprobante?.fecha_enviado}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card-body">
                                                <div className="w-100">
                                                    <p className="fw-bold text-uppercase">Datos del Curso:</p>
                                                    <p>Nombre del Curso: <span className="ms-2"> {curso?.nombre_curso}</span></p>
                                                    <p>Precio del Curso: <span className="ms-2"> $ {curso?.precio}</span></p>
                                                    <p className="fw-bold text-uppercase">Datos del Estudiante:</p>
                                                    <p>Nombre del Estudiante: <span className="ms-2"> {estudiante?.nombre} {estudiante?.apellido}</span></p>
                                                    <p>Correo: <span className="ms-2"> {estudiante?.correo}</span></p>
                                                    <p>Pais: <span className="ms-2"> {estudiante?.nombre_pais}</span></p>
                                                    <p>Telefono: <span className="ms-2"> {estudiante?.telefono}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button onClick={() => eliminarComprobante()} type="button" className="btn btn-danger"><FaTrashAlt className="mb-1" /> Eliminar</button>
                                <button onClick={() => inscribirCurso()} type="button" className="btn btn__verde"><FaEdit className="mb-1" /> Inscribir al {curso?.tipo}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Comprobantes
