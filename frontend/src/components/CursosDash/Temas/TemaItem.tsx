import React from 'react'
import { FaEdit, FaPlus, FaTimes } from 'react-icons/fa'
import { GoKebabVertical } from 'react-icons/go'

// Interfaces
import { Modulo } from '../Modulos/Modulo'
import { Tema } from './Tema'

interface Props {
    setModuloModal: (modulo: Modulo) => void;
    setTemaModal: (tema: Tema) => void;
    tema: Tema;
    modulo: Modulo;
}
const TemaItem = (props: Props) => {



    return (
        <li className="list-group-item d-flex align-items-center justify-content-start">
            <p className="fw-bold m-0 ms-2">
                {props.tema.titulo}
            </p>
            <div className="btn-group ms-auto">
                <button type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                    <GoKebabVertical className="mb-1" />
                </button>
                <ul className="dropdown-menu">
                    {/* Creando un tema */}
                    <li><button data-bs-toggle="modal" data-bs-target="#crearMaterial" className="dropdown-item" ><FaPlus className="mb-1" /> Agregar Material</button></li>

                    {/* Editar modulo */}
                    <li><button onClick={() => {
                        props.setTemaModal(props.tema);
                        props.setModuloModal(props.modulo)
                    }} data-bs-toggle="modal" data-bs-target="#crearTema" className="dropdown-item" ><FaEdit className="mb-1" /> Editar Tema</button></li>

                    {/* Eliminar modulo */}
                    <li><button className="dropdown-item" ><FaTimes className="mb-1" /> Eliminar Tema</button></li>
                </ul>
            </div>
        </li>
    )
}

export default TemaItem
