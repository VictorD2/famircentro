import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import * as contactoServices from './ContactoServices';
import { toast } from 'react-toastify';
interface Contacto {
    id_contacto?: string;
    nombre: string;
    correo: string;
    mensaje: string;
}

interface Props {
    contacto: Contacto;
    changeModalContent: (contacto: Contacto) => void;
    getAllContactos: () => void;
}

const ContactoItem = (props: Props) => {

    const eliminarContacto = async () => {
        if (!window.confirm('¿Está seguro de eliminar el mensaje?')) return;
        const res = await contactoServices.deleteContacto(props.contacto.id_contacto + "");
        if (res.data.success) {
            props.getAllContactos();
            return toast.success(res.data.success);
        }
        if (res.data.error) return toast.success(res.data.error);
    }

    return (
        <tr>
            <td>{props.contacto.nombre}</td>
            <td>{props.contacto.correo}</td>
            <td className="text-center">
                <button onClick={() => props.changeModalContent(props.contacto)} data-bs-toggle="modal" data-bs-target="#modalContacto" className="btn btn__blue">
                    <FontAwesomeIcon className="fs-5" icon={faEye} />
                </button>
            </td>
            <td className="text-center">
                <button onClick={() => eliminarContacto()} className="btn btn-danger">
                    <FontAwesomeIcon className="fs-5" icon={faTrashAlt} />
                </button>
            </td>
        </tr>
    )
}

export default ContactoItem
