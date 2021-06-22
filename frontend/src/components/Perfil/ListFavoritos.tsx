import React from 'react';
import { Link } from 'react-router-dom';
import { Curso } from '../CursosDash/Curso';
import ImgCurso from '../Helpers/ImgCurso';

interface Props {
    curso: Curso;
}
function ListFavoritos(props: Props) {
    return (
        <li className="BadgesListItem" key="1">
            <Link to={`/Clase/${props.curso.id_curso}`} className="link-unstyled d-flex align-items-center" >
                <div className="row">
                    <div className="col-lg-3 col-md-3">
                        <ImgCurso className="BadgesListItem__avatar" />
                    </div>
                    <div className="col-lg-8 col-md-9 text-start">
                        <span className="font-weight-bold fs-3">Ruby on Rails desde cero</span>
                        <p className="mt-2">Domina el framework para Ruby más completo y práctico para desarrollo Web.</p>
                    </div>
                </div>
            </Link>
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-danger" style={{ width: "5rem" }}>Quitar</button>
                </div>
            </div>
        </li>
    );
}

export default ListFavoritos;