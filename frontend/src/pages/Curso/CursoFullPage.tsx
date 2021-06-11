/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Footer from '../../components/Helpers/Footer';
import NavBar from '../../components/Helpers/NavBar';
import { GiTeacher } from "react-icons/gi";
import { GrShop } from "react-icons/gr";
import cursoFoto from '../../images/bg-2.jpg';
import * as cursoServices from '../../components/CursosDash/CursosServices';
import * as profesoresServices from '../../components/ProfesoresDash/ProfesoresServices';
import { Curso } from '../../components/CursosDash/Curso';
import { FaDollarSign } from 'react-icons/fa';
import { Profesor } from '../../components/ProfesoresDash/Profesor';
import { Modulo } from '../../components/CursosDash/Modulos/Modulo';
import Modulos from './Modulos';

interface Params {
    idCurso: string;
}
const initialState: Curso = {
    descripcion: "",
    enlace: "",
    nombre_curso: "",
    horario: "",
    precio: 0,
    url_foto_curso: "",
}
const CursoFullPage = () => {
    const params = useParams<Params>();
    const [curso, setCurso] = useState<Curso>(initialState);
    const [profesor, setProfesor] = useState<Profesor>(initialState);
    const [modulos, setModulos] = useState<Modulo[]>([]);
    let verificacion = false;
    const getCursoById = async () => {
        const res = await cursoServices.getCursoById(params.idCurso);
        const resProfesor = await profesoresServices.getProfesorById(res.data.id_usuario);
        const resModulos = await cursoServices.getAllModulesByCursoId(params.idCurso);
        setModulos(resModulos.data);
        setProfesor(resProfesor.data);
        await verificarSub();
        setCurso(res.data)
    }
    const verificarSub = async () => {
        const res = await cursoServices.verificarSuscribción(params.idCurso);
        verificacion = res.data;
    }
    useEffect(() => {
        getCursoById()
        return () => {
            setCurso(initialState);
            setProfesor({});
            setModulos([]);
        }
    }, [params.idCurso])

    return (
        <React.Fragment>
            <NavBar />
            <div className="p-5" style={{ marginTop: "5rem", background: "#eef3f6" }}>
                <div className="row">
                    <div className="col-5 ps-5">
                        <div className="column-detail">
                            <div className="row">
                                <h3 className="fw-bold">{curso.nombre_curso}</h3>
                            </div>
                            <div className="row">
                                <span>{curso.descripcion}</span>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex align-items-center">
                                    <GiTeacher className="me-2" /><span>Docente: {profesor.nombre} {profesor.apellido}</span>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <FaDollarSign className="me-2" /><span className="me-1">Precio: {curso.precio}</span>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <Link to={`/Comprar/${params.idCurso}`} className="btn btn-warning btn-width d-flex justify-content-center align-items-center">
                                    <GrShop className="me-2 text-danger" />Comprar curso
                                    </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="my-auto">
                            <img src={cursoFoto} className="img-fluid ancho-img" alt={`Curso`} />
                        </div>
                    </div>
                    <div className="col-5"></div>
                    <div className="col-7 mt-4">
                        {modulos.map(modulo => {
                            return <Modulos verificacion={verificacion} key={modulo.id_modulo} modulo={modulo} />
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default CursoFullPage;