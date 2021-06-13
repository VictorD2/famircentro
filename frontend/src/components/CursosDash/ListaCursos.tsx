/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';


//Services
import * as cursoServices from "./CursosServices";

//Components
import CursoItem from './CursoItem';

//Interfaces
import { Curso } from './Curso';

interface Params {
    modalidad: string;
    tipo: string;
}
interface Props {
    funcion: (curso: Curso) => void;
    filtro: string;
}

const ListaCursos = (props: Props) => {

    const params = useParams<Params>();

    const history = useHistory();

    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalidad, setModalidad] = useState<string>();
    const [tipo, setTipo] = useState<string>();

    useEffect(() => {
        if ((params.tipo !== 'Talleres' && params.tipo !== 'Cursos') || (params.modalidad !== 'Asincronos' && params.modalidad !== 'Sincronos')) return history.push('/Dashboard');//Validando ruta
        setModalidad(params.modalidad);
        setTipo(params.tipo);
        loadCursos();
        return () => {
            limpieza();
        }
    }, [params.modalidad, params.tipo]);


    //Funciones

    //Traer datos de la bd
    const loadCursos = async () => {
        const res = await cursoServices.getAllCursos(params.tipo, params.modalidad);
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
            <tr>
                <td>Cargando datos...</td>
            </tr>
        );

    // Sin profesores
    if (cursos.length === 0)
        return (
            <tr>
                <td>No hay {tipo} {modalidad} registrados aún</td>
            </tr>
        );

    // Profesores
    return (
        <React.Fragment>
            {cursos.map((curso) => {
                if (props.filtro === "") return <CursoItem cargaDatos={loadCursos} funcion={props.funcion} curso={curso} key={curso.id_curso} />;
                if (props.filtro === curso.id_curso?.toString()
                    || curso.nombre_curso?.toLowerCase().search(props.filtro.toLowerCase()) !== -1)
                    return <CursoItem cargaDatos={loadCursos} funcion={props.funcion} curso={curso} key={curso.id_curso} />;
                return <tr key={curso.id_curso}></tr>
            })}
        </React.Fragment>

    );
}

export default ListaCursos
