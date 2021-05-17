/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';

//Icons
import { faBook, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaCalendarAlt, FaDollarSign, FaEdit, FaEye, FaTimes } from 'react-icons/fa'
import { FiClock } from 'react-icons/fi';
import { IoNewspaperSharp } from 'react-icons/io5';

// Toastify
import { ToastContainer } from 'react-toastify'

//Interfaces
import { Curso } from './Curso'

//Components
import Navigation from '../../pages/DashBoard/Navigation'
import BuscadorProfesor from '../ProfesoresDash/BuscadorProfesor'
import ListaCursos from './ListaCursos'
import ModalCurso from './ModalCurso';


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

                    <button onClick={() => history.push(`/DashBoard/${params.tipo}/${params.modalidad}/nuevo`)} className="btn btn__blue mx-4 my-2">
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
                                <th className="text-center"><IoNewspaperSharp className="mb-1" /> MATERIAL</th>
                                <th className="text-center"><FaTimes className="mb-1" /> DESHABILITAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListaCursos filtro={filtro} funcion={handleModalChange} />
                        </tbody>
                    </table>
                    <ModalCurso curso={curso} modalidad={modalidad} />
                    {/* Modal */}

                </div>
            </div>
        </React.Fragment>
    )
}

export default Cursos
