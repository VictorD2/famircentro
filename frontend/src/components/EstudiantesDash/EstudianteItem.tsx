import { faCheck, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { TiCancel } from 'react-icons/ti';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Estudiante } from './Estudiante'
import * as estudiantesServices from './EstudianteService';

interface Props {
    estudiante: Estudiante;
    funcion: (profesor: Estudiante) => void;
    cargaDatos: () => void;
}

const EstudianteItem = (props: Props) => {
    const history = useHistory();
    const ponerDatos = () => props.funcion(props.estudiante);

    const deshabilitar = async () => {
        if (!window.confirm("¿Está seguro que desea habilitar/deshabilitar el usuario?")) return;

        const res = await estudiantesServices.eliminarEstudiante(props.estudiante.id_usuario?.toString());
        if (res.data.message === "success") {
            props.cargaDatos();
            return toast.success(`Estado del profesor ${props.estudiante.nombre} actualizado`);
        }
        return toast.success("Ocurrió un error");

    }
    return (
        <React.Fragment>
            <tr>
                <td>{props.estudiante.id_usuario}</td>
                <td>{props.estudiante.nombre}</td>
                <td>{props.estudiante.apellido}</td>
                <td>{props.estudiante.correo}</td>
                <td>{props.estudiante.nombre_pais}</td>
                <td>{props.estudiante.profesion}</td>

                <td className="text-center">
                    <button onClick={() => history.push(`/DashBoard/Estudiantes/update/${props.estudiante.id_usuario}`)} className="btn btn__amarillo">
                        <FontAwesomeIcon className="fs-5" icon={faEdit} />
                    </button>
                </td>

                <td className="text-center">
                    <button onClick={ponerDatos} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn__blue"> <FontAwesomeIcon className="fs-5" icon={faEye} /> </button>
                </td>
                <td className="text-center">
                    {props.estudiante.habilitado ? (
                        <>
                            <button onClick={deshabilitar} className="btn btn-secondary"> <TiCancel className="fs-4" /> </button>
                        </>) :
                        (<>
                            <button onClick={deshabilitar} className="btn btn-success"> <FontAwesomeIcon className="fs-4" icon={faCheck} /> </button>
                        </>)}
                </td>

            </tr>
        </React.Fragment >
    )
}

export default EstudianteItem
