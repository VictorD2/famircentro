/* eslint-disable react-hooks/exhaustive-deps */
import { faBook, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Navigation from '../../pages/DashBoard/Navigation';

import * as CursosServices from './CursosServices';
import { Curso } from './Curso';
import ModalCrearModulo from './Modulos/ModalCrearModulo';
import ListaModulos from './Modulos/ListaModulos';
import { Modulo } from './Modulos/Modulo';
import ModalTema from './Temas/ModalTema';
import { Tema } from './Temas/Tema';
interface Params {
    modalidad: string;
    tipo: string;
    id: string;
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
const MaterialCurso = () => {

    const params = useParams<Params>();
    const history = useHistory();
    const [tipo, setTipo] = useState("");
    const [modalidad, setModalidad] = useState("");
    const [curso, setCurso] = useState<Curso>(initialState);
    const [modulo, setModulo] = useState<Modulo>({ titulo: "" });
    const [tema, setTema] = useState<Tema>({
        titulo: "",
        descripcion: "",
        video: [new File([""], "filename")],
        material: [new File([""], "filename")],
    });
    //Traer los datos del profesor si estça en update
    const getCurso = async (id: string) => {
        const res = await CursosServices.getCursoById(id);
        if (res.data.message === "failed") window.location.href = '/Dashboard/Cursos/Asincronos';
        if (res.data.horario) {
            const fecha = res.data.horario.replace(" ", "T");
            res.data.horario = fecha;
        }
        setCurso(res.data);
    };
    const limpieza = () => setCurso(initialState);

    useEffect(() => {
        if ((params.tipo !== 'Talleres' && params.tipo !== 'Cursos') || (params.modalidad !== 'Asincronos' && params.modalidad !== 'Sincronos')) return history.push('/Dashboard');//Validando ruta
        params.tipo === "Talleres" ? setTipo('Taller') : setTipo('Curso');
        params.modalidad === "Asincronos" ? setModalidad('Asincrónico') : setModalidad('Sincrónico');
        getCurso(params.id);
        return () => limpieza();
    }, [params.tipo, params.modalidad]);

    return (
        <React.Fragment>
            <Navigation />
            <ToastContainer />
            <div className="contenido-principal p-4">
                <div className="d-flex flex-row bg-white">
                    <FontAwesomeIcon className="me-3 fs-3" icon={faBook} />
                    <h6 className="m-0 text-uppercase fs-3">{tipo} {modalidad} {curso.nombre_curso}</h6>
                </div>
                <div className="d-flex flex-row p-2 mt-4 flex-wrap justify-content-between">
                    <button onClick={() => setModulo({ titulo: "" })} className="btn btn__blue mx-4 my-2" data-bs-toggle="modal" data-bs-target="#crearModulo" >
                        <FontAwesomeIcon className="me-2" icon={faPlus} />
                        Agrega un modulo
                    </button>
                </div>
                <div className="py-4 mt-4">
                    <ListaModulos tema={tema} setTema={setTema} setModulo={setModulo} load={getCurso} modulos={curso.modulos} />
                </div>
            </div>
            <ModalCrearModulo load={getCurso} modulo={modulo} />
            <ModalTema load={getCurso} tema={tema} />
        </React.Fragment>
    )
}

export default MaterialCurso
