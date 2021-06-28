/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import Navigation from '../DashBoard/Navigation';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaEye, FaTrashAlt } from 'react-icons/fa'

import * as contactoServices from './ContactoServices'
import ContactoItem from './ContactoItem';

interface Contacto {
    id_contacto?: string;
    nombre: string;
    correo: string;
    mensaje: string;
}
const initialState: Contacto = {
    correo: "",
    mensaje: "",
    nombre: ""
}
const ContactoDash = () => {


    const [contactos, setContactos] = useState<Contacto[]>([]);
    const [contacto, setContacto] = useState<Contacto>(initialState);

    const refMensaje = useRef<HTMLParagraphElement | null>();
    const [cantidad, setCantidad] = useState<number>(0)
    const [cantidadPaginas, setCantidadPaginas] = useState<number>(0)
    const [page, setPage] = useState<number>(1);

    const paginaSiguiente = () => {
        if (page === cantidadPaginas) return;
        setPage(page + 1)
    }

    const paginaAnterior = () => {
        if (page === 1) return;
        setPage(page - 1)
    }

    const getCantidad = async () => {
        const res = await contactoServices.getCount();
        setCantidad(res.data);
        setCantidadPaginas(Math.ceil(res.data / 12));
    }
    useEffect(() => {
        getAllContactos();
        return () => {
            setContactos([]);
            setContacto(initialState);
        }
    }, [page])

    useEffect(() => {
        getCantidad();
        return () => {
            setCantidad(0);
            setCantidadPaginas(0);
            setPage(1);
        }
    }, []);

    const getAllContactos = async () => {
        const res = await contactoServices.getAllContactos(page);
        for (let i = 0; i < res.data.length; i++) {
            const newMensaje = res.data[i].mensaje.replace(/\n/g, "<br/>");
            res.data[i].mensaje = newMensaje;
        }
        setContactos(res.data);
    }

    const changeModalContent = (contacto: Contacto) => {
        setContacto(contacto);
        if (refMensaje.current) refMensaje.current.innerHTML = contacto.mensaje;
    }


    return (
        <React.Fragment>
            <Navigation />
            <ToastContainer />
            <div className="contenido-principal p-4">
                <div className="d-flex flex-row bg-white efecto_titulo">
                    <FontAwesomeIcon className="me-3 fs-3" icon={faEnvelope} />
                    <h6 className="m-0 text-uppercase fs-3">Mensajes de Contacto</h6>
                </div>
                <div className="d-flex flex-row p-2 mt-4 flex-wrap justify-content-between">
                    <div className="mx-4 my-2">
                    </div>
                </div>
                <div className="py-4 mt-4">
                    <div className="table-responsive">
                        <table className="table table-striped table-light-gray table-bordered table-hover">
                            <caption>Cantidad de mensajes de contacto: {cantidad}</caption>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th style={{ minWidth: "500px" }}>Correo</th>
                                    <th className="text-center"><FaEye className="mb-1" /> VER MÁS</th>
                                    <th className="text-center"><FaTrashAlt className="mb-1" /> ELIMINAR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactos.length === 0 ? (<>
                                    <tr>
                                        <td>
                                            No hay mensajes aún
                                        </td>
                                    </tr>
                                </>) : (<>
                                    {contactos.map(contacto => {
                                        return (
                                            <ContactoItem getCantidad={getCantidad} page={page}  getAllContactos={getAllContactos} changeModalContent={changeModalContent} contacto={contacto} key={contacto.id_contacto} />
                                        )
                                    })}
                                </>)}
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
                    </div>
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="modalContacto" aria-labelledby="modalContactoLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header btn__blue">
                            <h5 className="modal-title" id="modalContactoLabel">{contacto.nombre}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card mb-3">
                                <div className="g-0">
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <p className="m-0 text-uppercase fw-bold">Correo:</p>
                                            <p className="ms-4">{contacto.correo}</p>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <p className="m-0 text-uppercase fw-bold">Mensaje:</p>
                                            <p className="mt-2 px-5" ref={node => refMensaje.current = node} style={{ textAlign: "justify" }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ContactoDash;
