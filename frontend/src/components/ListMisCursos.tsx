import React from 'react';
import ImgCurso from './ImgCurso';

function ListCursosPerfil() {
    return (
        <li className="BadgesListItem" key="1">
            <a href="/cursos" className="link-unstyled d-flex align-items-center" >
                <div className="row">
                    <div className="col-lg-3 col-md-3">
                        <ImgCurso
                            className="BadgesListItem__avatar"
                        />
                    </div>
                    <div className="col-lg-8 col-md-9 text-start">
                        <span className="font-weight-bold fs-3">Ruby on Rails desde cero</span>
                        <p className="mt-2">Domina el framework para Ruby más completo y práctico para desarrollo Web.</p>
                    </div>
                </div>
            </a>
        </li>
    );
}

export default ListCursosPerfil;