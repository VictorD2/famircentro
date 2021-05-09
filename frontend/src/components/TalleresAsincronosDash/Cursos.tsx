/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { faBook, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaDollarSign, FaEdit, FaEye, FaTimes } from 'react-icons/fa'
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { Curso } from './Curso'
import Navigation from '../../pages/DashBoard/Navigation'
import BuscadorProfesor from '../ProfesoresDash/BuscadorProfesor'
import ListaTalleresAsincronos from './ListaCursos'
interface Params {
    modalidad: string;
    tipo: string;
}
const TalleresAsincronos = () => {
    const params = useParams<Params>();
    const history = useHistory();
    const [curso, setCurso] = useState<Curso>({})
    const [filtro, setFiltro] = useState<string>("");
    const [tipo, setTipo] = useState("")
    const [modalidad, setModalidad] = useState("")
    const handleModalChange = (curso: Curso) => {
        setCurso(curso);
    }
    const createCurso = () => {
        history.push(`/DashBoard/${params.tipo}/${params.modalidad}/nuevo`);
    }
    const buscar = (text: string) => {
        setFiltro(text);
    }
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
                                <th className="text-center"><FaEdit className="mb-1" /> EDITAR</th>
                                <th className="text-center"><FaEye className="mb-1" /> VER MÁS</th>
                                <th className="text-center"><FaTimes className="mb-1" /> DESHABILITAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListaTalleresAsincronos filtro={filtro} funcion={handleModalChange} />
                        </tbody>
                    </table>
                    {/* Modal */}
                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">{curso.nombre_curso}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={curso.url_foto_curso} className="w-100" alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                </div>
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

export default TalleresAsincronos
