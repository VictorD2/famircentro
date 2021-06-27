/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';


//Services
import * as cursoServices from "./CursosServices";

//Components
import CursoItem from './CursoItem';

import { FaCalendarAlt, FaDollarSign, FaEdit, FaEye, FaTimes } from 'react-icons/fa'
import { FiClock } from 'react-icons/fi';
import { IoNewspaperSharp } from 'react-icons/io5';

//Interfaces
import { Curso } from './Curso';

interface Params {
    modalidad: string;
    tipo: string;
}
interface Props {
    filtro: string;
}

const ListaCursos = (props: Props) => {

    const modalidades = ['Sincronicos', 'Asincronicos', 'Talleres', 'Cursos'];


    const params = useParams<Params>();

    const history = useHistory();

    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalidad, setModalidad] = useState<string>();
    const [tipo, setTipo] = useState<string>();

    const [cantidad, setCantidad] = useState<number>(0)
    const [cantidadPaginas, setCantidadPaginas] = useState<number>(0)
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        if (!modalidades.includes(params.modalidad) || !modalidades.includes(params.tipo)) return history.push('/Dashboard');//Validando ruta
        setModalidad(params.modalidad);
        setTipo(params.tipo);
        loadCursos();
        return () => limpieza();
    }, [params.modalidad, params.tipo, page]);

    useEffect(() => {
        getCantidad();
        return () => {
            setCantidad(0);
            setCantidadPaginas(0);
            setPage(1);
        }
    }, [params.modalidad, params.tipo]);

    //Funciones

    const getCantidad = async () => {
        const res = await cursoServices.getCount(params.tipo, params.modalidad);
        setCantidad(res.data);
        setCantidadPaginas(Math.ceil(res.data / 12));
    }

    const paginaSiguiente = () => {
        if (page === cantidadPaginas) return;
        setPage(page + 1)
    }

    const paginaAnterior = () => {
        if (page === 1) return;
        setPage(page - 1)
    }

    //Traer datos de la bd
    const loadCursos = async () => {
        const res = await cursoServices.getAllCursos(params.tipo, params.modalidad, page);
        setCursos(res.data);
        setLoading(true);
    };

    const limpieza = () => {
        setCursos([]);
        setLoading(false);
    }


    // Cargando
    if (!loading)
        return (
            <table className="table table-light-gray table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th><FaDollarSign className="mb-1" /> PRECIO</th>
                        {modalidad === 'Sincronicos' ? (<>
                            <th><FaCalendarAlt className="mb-1" />  HORARIO</th>
                            <th><FiClock className="mb-1" /> DURACIÓN</th>
                        </>) : (<></>)}
                        <th className="text-center"><FaEdit className="mb-1" /> EDITAR</th>
                        <th className="text-center"><FaEye className="mb-1" /> VER MÁS</th>
                        <th className="text-center"><IoNewspaperSharp className="mb-1" /> MATERIAL</th>
                        <th className="text-center"><FaTimes className="mb-1" /> DESHABILITAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cargando datos...</td>
                    </tr>
                </tbody>
            </table>

        );

    // Sin profesores
    if (cursos.length === 0)
        return (
            <table className="table table-light-gray table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th><FaDollarSign className="mb-1" /> PRECIO</th>
                        {modalidad === 'Sincronicos' ? (<>
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
                    <tr>
                        <td>No hay {tipo} {modalidad} registrados aún</td>
                    </tr>
                </tbody>
            </table>

        );

    // Profesores
    return (
        <React.Fragment>
            <table className="table table-light-gray table-bordered table-hover">
                <caption>Cantidad de {params.tipo} {params.modalidad}: {cantidad}</caption>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th><FaDollarSign className="mb-1" /> PRECIO</th>
                        {modalidad === 'Sincronicos' ? (<>
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
                    {cursos.map((curso) => {
                        if (props.filtro === "") return <CursoItem cargaDatos={loadCursos} curso={curso} key={curso.id_curso} />;
                        if (props.filtro === curso.id_curso?.toString()
                            || curso.nombre_curso?.toLowerCase().search(props.filtro.toLowerCase()) !== -1)
                            return <CursoItem cargaDatos={loadCursos} curso={curso} key={curso.id_curso} />;
                        return <tr key={curso.id_curso}></tr>
                    })}
                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                {page === 1 ? (<>
                </>) : (<>
                    <button onClick={() => { paginaAnterior() }} className="btn btn__blue"><span aria-hidden="true">&laquo; Página Anterior</span></button>
                </>)}
                {page === cantidadPaginas ? (<>
                </>) : (<>
                    <button onClick={() => { paginaSiguiente() }} className="btn btn__blue ms-auto"><span aria-hidden="true">Página Siguiente &raquo;</span></button>
                </>)}
            </div>
        </React.Fragment>

    );
}

export default ListaCursos
