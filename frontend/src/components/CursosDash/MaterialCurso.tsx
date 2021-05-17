/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

//Icons
import { faBook, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer } from 'react-toastify';

//Components
import Navigation from '../../pages/DashBoard/Navigation';
import ModuloItem from './Modulos/ModuloItem';

//Interfaces
import { Curso } from './Curso';
import { Modulo } from './Modulos/Modulo';
import { Tema } from './Temas/Tema';

//Services
import * as CursosServices from './CursosServices';

//Modales
import ModalModulo from './Modulos/ModalModulo';
import ModalTema from './Temas/ModalTema';

interface Params {
    modalidad: string;
    tipo: string;
    id: string;
}
const initialStateCurso = {
    nombre_curso: "",
    descripcion: "",
    precio: 0,
    duracion: 0,
    horario: "",
    enlace: "",
    id_usuario: 0,
};

const initialStateModulo = {
    titulo: ""
}
const initialStateTema = {
    titulo: "",
    descripcion: "",
    video: [new File([""], "filename")],
}

const MaterialCurso = () => {

    const params = useParams<Params>();
    const history = useHistory();

    const [curso, setCurso] = useState<Curso>(initialStateCurso);//Curso en la ventana
    const [modulos, setModulos] = useState<Modulo[]>([]);//Lista de modulos

    const [tipo, setTipo] = useState<string>("");//Taller o Curso
    const [modalidad, setModalidad] = useState<string>("");//Sincrono o asincrono

    // Ventanas modales
    const [count, setcount] = useState(0);
    const [moduloModal, setModuloModal] = useState<Modulo>(initialStateModulo);
    const [temaModal, setTemaModal] = useState<Tema>(initialStateTema);


    //Traer los datos deModall curso
    const getCurso = async (idCurso: string) => {
        const res = await CursosServices.getCursoById(idCurso);
        if (res.data.message === "failed") window.location.href = '/Dashboard/Cursos/Asincronos';
        setCurso(res.data);
        getAllModulos(idCurso);
    };

    // Traer los modulos del curso
    const getAllModulos = async (idCurso: string) => {
        const rows = await CursosServices.getAllModulesByCursoId(idCurso);
        setModulos(rows.data);
    };

    //Cuando se desrenderice
    const limpieza = () => {
        setCurso(initialStateCurso);//Limpiando estado curso
        setModuloModal(initialStateModulo);//Limpiando estado tema
        setTemaModal(initialStateTema);//Limpiando estado modulo
        setModulos([]);//Limpiando estado modulos
    }

    useEffect(() => {
        if ((params.tipo !== 'Talleres' && params.tipo !== 'Cursos') || (params.modalidad !== 'Asincronos' && params.modalidad !== 'Sincronos')) return history.push('/Dashboard');//Validando ruta
        params.tipo === "Talleres" ? setTipo('Taller') : setTipo('Curso');//Definiendo si es taller o curso
        params.modalidad === "Asincronos" ? setModalidad('Asincrónico') : setModalidad('Sincrónico');//Definiendo si es sincrono o asincrono
        getCurso(params.id);//Trayendo los datos de la bd
        return () => limpieza();
    }, [params.tipo, params.modalidad]);

    return (
        <React.Fragment>
            <Navigation />
            <ToastContainer />
            <div className="contenido-principal p-4">

                {/* Title */}
                <div className="d-flex flex-row bg-white">
                    <FontAwesomeIcon className="me-3 fs-3" icon={faBook} />
                    <h6 className="m-0 text-uppercase fs-3">{tipo} {modalidad} {curso.nombre_curso}</h6>
                </div>

                {/* Options */}
                <div className="d-flex flex-row p-2 mt-4 flex-wrap justify-content-between">
                    <button onClick={() => setModuloModal({ titulo: "" })} className="btn btn__blue mx-4 my-2" data-bs-toggle="modal" data-bs-target="#crearModulo" >
                        <FontAwesomeIcon className="me-2" icon={faPlus} />
                        Agrega un modulo
                    </button>
                </div>

                {/* Content */}
                <div className="py-4 mt-4">
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                        {modulos.map(modulo => {
                            return <ModuloItem count={count} modulo={modulo} temaModal={temaModal} load={getAllModulos} setModuloModal={setModuloModal} setTemaModal={setTemaModal} key={modulo.id_modulo} />
                        })}
                    </div>
                </div>

            </div>
            <ModalModulo load={getAllModulos} moduloModal={moduloModal} />
            <ModalTema count={count} setcount={setcount} load={getAllModulos} moduloModal={moduloModal} temaModal={temaModal} />
        </React.Fragment>
    )
}

export default MaterialCurso
