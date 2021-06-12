/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
//Iconos
import { FaEnvelope, FaTimes } from 'react-icons/fa';

//Toastify
import { toast } from 'react-toastify';

//Interfaces
import { Comentario } from './Comentario';

//Services
import * as comentariosServices from './ComentariosServices';

//TimeAgo
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/es';
import { useUsuario } from '../../context-user/UsuarioProvider';
timeago.register('vi', vi);

const initialState: Comentario = {
    comentario: "",
    fecha: "",
    id_usuario: 0
}
interface Params {
    idCurso: string;
    idTema: string;
}
const Comentarios = () => {
    const { usuario } = useUsuario();

    const params = useParams<Params>();

    const [comentario, setComentario] = useState<Comentario>(initialState);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);

    useEffect(() => {
        getComentarios();
        return () => {
            setComentario(initialState);
            setComentarios([]);
        }
    }, [])

    //Funciones
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (comentario.comentario === "") return toast.warning('No ha escrito un comentario');
        const res = await comentariosServices.crearComentario(comentario, params.idCurso, params.idTema);
        if (res.data.success) {
            toast.success(res.data.success);
            getComentarios();
            setComentario(initialState);
            return
        }
        toast.error(res.data.error);
    }
    
    const eliminarComentario = async (id?: number) => {
        if (!window.confirm('¿Está seguro que desea eliminar el comentario?')) return;
        const res = await comentariosServices.eliminarComentario(id + "");
        if (res.data.success) {
            getComentarios();
            return toast.success(res.data.success);
        }
        toast.error(res.data.error);
    }
    const getComentarios = async () => {
        const res = await comentariosServices.getAll(params.idCurso, params.idTema);
        setComentarios(res.data);
    }

    const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComentario({ ...comentario, [e.target.name]: e.target.value });
    }

    return (
        <div className="w-100">
            <form onSubmit={handleFormSubmit} className="d-flex flex-column">
                <div className="form-floating w-100">
                    <textarea onChange={handleTextArea} name="comentario" value={comentario.comentario} className="form-control" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                    <label htmlFor="floatingTextarea2">Escribe tu aporte o comentario</label>
                </div>
                <button className="btn btn__blue mt-1 ms-auto"><FaEnvelope className="mb-1" /> Enviar</button>
            </form>
            <div className="">
                {comentarios.map(comentarioItem => {
                    return (
                        <div className="card my-3" key={comentarioItem.id_comentario}>
                            <div className="px-3 pt-2 pb-3">
                                <div className="author-info">
                                    <div className="foto-author">
                                        <figure className="figure">
                                            <img className="img-fluid" src={comentarioItem.url_foto_usuario} alt="Foto Perfil" />
                                        </figure>
                                    </div>
                                    <div className="nombre-author">
                                        <p>{comentarioItem.nombre} {comentarioItem.apellido}</p>
                                        <TimeAgo style={{ fontSize: "12px" }} className="text-black-50" datetime={comentarioItem.fecha} live={false} locale='vi' />

                                    </div>
                                    {usuario.id_rango === 2 ? (<>
                                        <div className="ms-auto">
                                            <button onClick={() => eliminarComentario(comentarioItem.id_comentario)} className="btn">
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </>) : (<></>)}
                                </div>
                                <div className="comentario">
                                    <p>{comentarioItem.comentario}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Comentarios
