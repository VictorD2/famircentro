/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useUsuario } from "../../context-user/UsuarioProvider";

//Iconos
import { FaEnvelope, FaTimes } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

//Toastify
import { toast } from "react-toastify";

//Interfaces
import { Comentario } from "./Comentario";

//Services
import * as comentariosServices from "./ComentariosServices";

//Components
import CajaComentario from "./CajaComentario";

//TimeAgo
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import vi from "timeago.js/lib/lang/es";
timeago.register("vi", vi);

const initialState: Comentario = {
  comentario: "",
  fecha: "",
  id_usuario: 0,
  id_rango: 0,
};
interface Params {
  idCurso: string;
  idTema: string;
}
const Comentarios = () => {
  const { usuario } = useUsuario();

  const params = useParams<Params>();

  const [comentario, setComentario] = useState<Comentario>(initialState);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  const [page, setPage] = useState<number>(1);
  const [cantidad, setCantidad] = useState<number>(0);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    getComentarios();
    return () => {
      setComentario(initialState);
      setComentarios([]);
    };
  }, [page]);

  useEffect(() => {
    getCantidad();
    return () => {
      setCantidad(0);
      setPage(1);
      setTrigger(0);
    };
  }, [trigger]);

  //Funciones
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comentario.comentario === "") return toast.warning("No ha escrito un comentario");
    const res = await comentariosServices.crearComentario(comentario, params.idCurso, params.idTema);
    if (res.data.success) {
      toast.success(res.data.success);
      getComentarios();
      setTrigger(trigger + 1);
      setComentario(initialState);
      return;
    }
    toast.error(res.data.error);
  };

  const getCantidad = async () => {
    const res = await comentariosServices.getCount(params.idCurso, params.idTema);
    console.log(Math.ceil(res.data / 4));
    setCantidad(res.data);
    setCantidad(Math.ceil(res.data / 4));
  };

  const eliminarComentario = async (id?: number) => {
    if (!window.confirm("¿Está seguro que desea eliminar el comentario?")) return;
    const res = await comentariosServices.eliminarComentario(id + "");
    if (res.data.success) {
      getComentarios();
      setTrigger(trigger + 1);
      return toast.success(res.data.success);
    }
    toast.error(res.data.error);
  };

  const getComentarios = async () => {
    const res = await comentariosServices.getAll(page, params.idCurso, params.idTema);
    setComentarios(res.data);
  };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComentario({ ...comentario, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-100">
      <form onSubmit={handleFormSubmit} className="d-flex flex-column">
        <div className="form-floating w-100">
          <textarea onChange={handleTextArea} name="comentario" value={comentario.comentario} className="form-control" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
          <label htmlFor="floatingTextarea2">Escribe tu aporte o comentario</label>
        </div>
        <button className="btn btn__blue mt-1 ms-auto">
          <FaEnvelope className="mb-1" /> Enviar
        </button>
      </form>
      <div className="">
        {comentarios.map((comentarioItem) => {
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
                    <p>
                      {comentarioItem.nombre} {comentarioItem.apellido}
                    </p>
                    {comentarioItem.id_rango === 1 ? (
                      <>
                        <p className="mt-1" style={{ color: "var(--verde-oscuro)" }}>
                          Administrador
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
                    <TimeAgo style={{ fontSize: "12px" }} className="text-black-50" datetime={comentarioItem.fecha} live={false} locale="vi" />
                  </div>
                  {usuario.id_rango === 1 ? (
                    <>
                      <div className="ms-auto">
                        <button onClick={() => eliminarComentario(comentarioItem.id_comentario)} className="btn">
                          <FaTimes />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {comentarioItem.id_usuario === parseInt(usuario.id_usuario) ? (
                        <>
                          <div className="ms-auto">
                            <button onClick={() => eliminarComentario(comentarioItem.id_comentario)} className="btn">
                              <FaTimes />
                            </button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
                <CajaComentario comentario={comentarioItem.comentario} />
              </div>
            </div>
          );
        })}
        {cantidad === page || cantidad === 0 ? (
          <></>
        ) : (
          <>
            <div className="w-100 d-flex justify-content-center p-2">
              <button
                onClick={() => {
                  setPage(page + 1);
                }}
                className="btn btn__blue"
              >
                <FaChevronDown /> Ver más comentarios
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comentarios;
