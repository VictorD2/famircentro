/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent, useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaRegEdit } from 'react-icons/fa';
import { useParams, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { Curso } from './Curso';
import Navigation from '../../pages/DashBoard/Navigation';
import * as CursosServices from './CursosServices';
import * as ProfesoresServices from '../ProfesoresDash/ProfesoresServices';
import { Profesor } from '../ProfesoresDash/Profesor';
interface Params {
    id?: string;
    modalidad?: string;
    tipo?: string;
}
const FormCurso = () => {
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
    const [profesores, setProfesores] = useState<Profesor[]>([]);
    const [curso, setCurso] = useState<Curso>(initialState);
    const [modalidad, setModalidad] = useState("");
    const [tipo, setTipo] = useState("");
    const params = useParams<Params>();
    const history = useHistory();

    const cargaProfesores = async () => {
        const res = await ProfesoresServices.getAll();
        setProfesores(res.data);
    }

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
    const limpieza = () => {
        setCurso(initialState);
        setProfesores([]);
    }


    useEffect(() => {
        if (params.id) getCurso(params.id); //Por si estoy en update
        params.tipo === "Talleres" ? setTipo("Taller") : setTipo("Curso");
        params.modalidad === "Asincronos" ? setModalidad("Asincrono") : setModalidad("Sincrono");
        cargaProfesores();
        return () => limpieza();
    }, [params.id, params.modalidad, params.tipo]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setCurso({ ...curso, [e.target.name]: e.target.value });
    };

    //Evento submit
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!params.id) {
            const res = await CursosServices.crearCurso(curso, tipo, modalidad);
            if (res.data.message === 'already exists') toast.error("Ya existe un curso con ese nombre");
            if (res.data.message === "success") {
                toast.success("Curso creado");
                history.push(`/Dashboard/${params.tipo}/${params.modalidad}`);
            }
            if (res.data.message === "failed") toast.error("Ocurrió un error");
            return;
        }
        const res = await CursosServices.updateCurso(params.id, curso);
        if (res.data.message === 'already exists') toast.error("Ya existe un curso con ese nombre");
        if (res.data.message === "success") toast.success("Curso actualizado");
        if (res.data.message === "failed") toast.error("Ocurrió un error");
    };

    return (
        <React.Fragment>
            <Navigation />
            <ToastContainer />
            <div className="contenido-principal p-4">
                <div className="d-flex flex-row bg-white mb-5">
                    {params.id ? (
                        <h4 className="mb-0 text-uppercase fs-3"><FaEdit className="fs-3 mb-2 " /> Actualizar {tipo} {modalidad}</h4>
                    ) : (
                        <h4 className="m-0 text-uppercase fs-3"><FaPlus className="fs-3 mb-1 " /> Crear {tipo} {modalidad}</h4>
                    )}
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-floating mb-3">
                                    <input onChange={handleInputChange} id="floatingInputNombre" className="form-control" type="text" placeholder="Nombre del Taller" name="nombre_curso" required value={curso.nombre_curso} />
                                    <label htmlFor="floatingInputNombre">Nombre del {tipo} {modalidad}</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea onChange={handleInputChange} className="form-control" placeholder="Descripción" name="descripcion" required value={curso.descripcion} />
                                    <label htmlFor="floatingInputDescripcion">Descripción</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={handleInputChange} id="floatingInputPrecio" className="form-control" type="text" placeholder="Precio" name="precio" required value={curso.precio} />
                                    <label htmlFor="floatingInputPrecio">Precio</label>
                                </div>

                                {/* En caso de que sean sincronos */}
                                {modalidad === 'Sincrono' ? (<>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleInputChange} id="floatingInputDuracion" className="form-control" type="number" placeholder="Duración" name="duracion" required value={curso.duracion} />
                                        <label htmlFor="floatingInputDuracion">Duración</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input onChange={handleInputChange} id="floatingInputHorario" className="form-control" type="datetime-local" placeholder="Horario" name="horario" required value={curso.horario} />
                                        <label htmlFor="floatingInputHorario">Horario</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleInputChange} id="floatingInputEnlace" className="form-control" type="text" placeholder="Enlace de Zoom" name="enlace" required value={curso.enlace} />
                                        <label htmlFor="floatingInputEnlace">Enlace de Zoom</label>
                                    </div>
                                </>) : (<></>)}
                                <div className="form-floating mb-3">
                                    <select value={curso.id_usuario} onChange={handleInputChange} id="floatingInputProfesor" className="form-control" name="id_usuario" required >
                                        {profesores.map(profesor => {
                                            return <option key={profesor.id_usuario} value={profesor.id_usuario}>{profesor.nombre} {profesor.apellido} - {profesor.correo}</option>
                                        })}
                                    </select>
                                    <label htmlFor="floatingInputProfesor">Profesor</label>
                                </div>

                                <div className="mb-3">
                                    {params.id ? (
                                        <button className="btn btn__blue"> <FaRegEdit className="fs-5 mb-1" /> Actualizar </button>
                                    ) : (
                                        <button className="btn btn__blue"> <FaPlus className="fs-5 mb-1" /> Crear </button>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default FormCurso
