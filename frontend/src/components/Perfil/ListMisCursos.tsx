import React from "react";
import { Link } from "react-router-dom";
import { Curso } from "../CursosDash/Curso";
import ImgCurso from "../Helpers/ImgCurso";
import * as comprobanteServices from "../Compobantes/ComprobanteServices";
import { useUsuario } from "../../context-user/UsuarioProvider";
import swal from "sweetalert";

// Interfaces
interface Props {
  curso: Curso;
  refresh: () => void;
}
function ListCursosPerfil(props: Props) {
  const { usuario } = useUsuario();

  const setFavorito = async () => {
    const res = await comprobanteServices.setFavorito(props.curso.id_curso + "", usuario.id_usuario + "");
    if (res.data.success) {
      swal({
        title: "Hecho",
        text: `${res.data.success}`,
        icon: "success",
      });
      props.refresh();
    }
    if (res.data.error) {
      swal({
        title: "Ups!",
        text: `${res.data.error}`,
        icon: "error",
      });
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <Link to={`/Clase/${props.curso.id_curso}`} className="text-decoration-none text-dark">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <ImgCurso url={props.curso.url_foto_curso} className="BadgesListItem__avatar" />
            </div>
            <div className="col-lg-8 col-md-9 text-start">
              <span className="font-weight-bold fs-3">{props.curso.nombre_curso}</span>
              <p className="mt-2 text-truncate">{props.curso.descripcion}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <button onClick={() => setFavorito()} className="btn btn__blue">
          Añadir a favoritos
        </button>
      </div>
    </div>
  );
}

export default ListCursosPerfil;
