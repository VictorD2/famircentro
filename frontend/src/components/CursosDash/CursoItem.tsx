import React from 'react'
import { Curso } from './Curso'
import { useHistory, useParams } from "react-router-dom";
import * as CursosServices from './CursosServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { TiCancel } from 'react-icons/ti';
import { toast } from 'react-toastify';
import { IoNewspaperSharp } from 'react-icons/io5';
interface Params {
    id?: string;
    modalidad?: string;
    tipo?: string;
}
interface Props {
    curso: Curso;
    funcion: (curso: Curso) => void;
    cargaDatos: () => void;
}
const CursoItem = (props: Props) => {
    const params = useParams<Params>();
    const history = useHistory();
    const ponerDatos = () => props.funcion(props.curso);

    const deshabilitar = async () => {
        console.log(props.curso.habilitado);
        if (!window.confirm("¿Está seguro que desea habilitar/deshabilitar el curso?")) return;

        const res = await CursosServices.eliminarCurso(props.curso.id_curso?.toString());
        if (res.data.message === "success") {
            props.cargaDatos();
            return toast.success(`Estado del curso ${props.curso.nombre_curso} actualizado`);
        }
        return toast.success("Ocurrió un error");

    }
    return (
        <React.Fragment>
            <tr>
                <td>{props.curso.id_curso}</td>
                <td>{props.curso.nombre_curso}</td>
                <td>{props.curso.precio}</td>
                {props.curso.modalidad === 'Sincrono' ? (
                    <>
                        <td>{props.curso.horario}</td>
                        <td>{props.curso.duracion} horas</td>
                    </>) :
                    (<></>)}
                <td className="text-center">
                    <button onClick={() => history.push(`/DashBoard/${params.tipo}/${params.modalidad}/update/${props.curso.id_curso}`)} className="btn btn__amarillo">
                        <FontAwesomeIcon className="fs-5" icon={faEdit} />
                    </button>
                </td>

                <td className="text-center">
                    <button onClick={ponerDatos} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn__blue">
                        <FontAwesomeIcon className="fs-5" icon={faEye} />
                    </button>
                </td>
                <td className="text-center">
                    <button onClick={() => history.push(`/DashBoard/${params.tipo}/${params.modalidad}/Material/${props.curso.id_curso}`)} className="btn btn__verde">
                        <IoNewspaperSharp className="fs-5 mb-1" />
                    </button>
                </td>
                <td className="text-center">
                    {props.curso.habilitado ? (
                        <>
                            <button onClick={deshabilitar} className="btn btn-secondary">
                                <TiCancel className="fs-4" />
                            </button>
                        </>) :
                        (<>
                            <button onClick={deshabilitar} className="btn btn-success">
                                <FontAwesomeIcon className="fs-4" icon={faCheck} />
                            </button>
                        </>
                        )
                    }
                </td>
            </tr>
        </React.Fragment >
    )
}

export default CursoItem