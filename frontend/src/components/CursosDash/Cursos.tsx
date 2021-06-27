/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';

//Icons
import { faBook, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Toastify
import { ToastContainer } from 'react-toastify'

//Components
import Navigation from '../../pages/DashBoard/Navigation'
import BuscadorProfesor from '../ProfesoresDash/BuscadorProfesor'
import ListaCursos from './ListaCursos'

//Interfaces

interface Params {
    modalidad: string;
    tipo: string;
}

const Cursos = () => {
    const modalidades = ['Sincronicos', 'Asincronicos', 'Talleres', 'Cursos'];

    const params = useParams<Params>();
    const history = useHistory();

    const [filtro, setFiltro] = useState<string>("");

    const [tipo, setTipo] = useState("");
    const [modalidad, setModalidad] = useState("");


    const buscar = (text: string) => setFiltro(text);

    useEffect(() => {
        if (!modalidades.includes(params.modalidad) || !modalidades.includes(params.tipo)) return history.push('/Dashboard');//Validando ruta
        params.tipo === "Talleres" ? setTipo('Taller') : setTipo('Curso');
        params.modalidad === "Asincronicos" ? setModalidad('Asincrónico') : setModalidad('Sincrónico');
    }, [params.tipo, params.modalidad]);

    return (
        <React.Fragment>
            <Navigation />
            <ToastContainer />
            <div className="contenido-principal p-4">
                <div className="d-flex flex-row bg-white efecto_titulo">
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
                    <div className="table-responsive">
                        <ListaCursos filtro={filtro} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Cursos
