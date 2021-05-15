import React from 'react'
import { FaEdit, FaPlus, FaTimes } from 'react-icons/fa'
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Modulo } from './Modulo'
import { GoKebabVertical } from "react-icons/go";
import * as moduloServices from './ModuloService';
import { Tema } from '../Temas/Tema';
interface Props {
    modulo: Modulo;
    tema:Tema;
    load: (id: string) => void;
    setModulo: (modulo: Modulo) => void;
    setTema: (tema: Tema) => void;
}
interface Params {
    id: string;
}
const ModuloItem = (props: Props) => {
    const params = useParams<Params>();
    const eliminarModulo = async () => {
        if (!window.confirm('¿Está seguro que desea eliminar el módulo?')) return;

        const res = await moduloServices.eliminarModulo(props.modulo);
        if (res.data.message === 'success') {
            toast.success('Módulo eliminado correctamente');
            props.load(params.id);
            return;
        }
        return toast.error('Ocurrió un error');
    }

    return (
        <div className="accordion-item my-4">
            <div className="w-100 d-flex justify-content-end bg-light">
                <div className="btn-group">
                    <button type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                        <GoKebabVertical className="mb-1" />
                    </button>
                    <ul className="dropdown-menu">
                        <li><button onClick={() => props.setTema(props.tema)} data-bs-toggle="modal" data-bs-target="#crearTema" className="dropdown-item" ><FaPlus className="mb-1" /> Agregar Tema</button></li>
                        <li><button onClick={() => props.setModulo(props.modulo)} data-bs-toggle="modal" data-bs-target="#crearModulo" className="dropdown-item" ><FaEdit className="mb-1" /> Editar Modulo</button></li>
                        <li><button onClick={eliminarModulo} className="dropdown-item" ><FaTimes className="mb-1" /> Eliminar Modulo</button></li>
                    </ul>
                </div>
            </div>
            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#r${props.modulo.id_modulo}`} aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                    {props.modulo.titulo}
                </button>
            </h2>
            <div id={`r${props.modulo.id_modulo}`} className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                <div className="p-5">

                </div>
            </div>
        </div>
    )
}

export default ModuloItem
