import React from "react";

import logoRegister from "../images/Logo.svg";

class Register extends React.Component {
    render() {
        return (
            <div className="rgt__main">
                <div className="card content__form">
                    <div className="card-header rgt__header">
                        <img className="rgt__img" src={logoRegister} alt="logo-register" />
                        <h5 className="rgt__title">FAMIR CENTRO</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-7 rgt__form">
                                <form action="">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Nombres</label>
                                                <input
                                                    className="form-control rgt__form-control"
                                                    type="text"
                                                    name="name"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Apellidos</label>
                                                <input
                                                    className="form-control rgt__form-control"
                                                    type="text"
                                                    name="surname"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Nombre de Usuario</label>
                                                <input
                                                    className="form-control rgt__form-control"
                                                    type="text"
                                                    name="userName"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Pais</label>
                                                <select
                                                    className="form-control rgt__form-control"
                                                    name="pais"
                                                >
                                                    <option value="PE">Perú</option>
                                                    <option value="CL">Chile</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label">Contraseña</label>
                                            <input
                                                className="form-control rgt__form-control"
                                                type="password"
                                                name="password"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Confirmar contraseña</label>
                                            <input
                                                className="form-control rgt__form-control"
                                                type="password"
                                                name="verifyPassword"
                                            />
                                        </div>
                                    </div>
                                    <div className="row rgt__button">
                                        <div className="col-md-6 rgt__button mt-5">
                                            <button
                                                type="submit"
                                                className="btn btn__more"
                                                style={{ padding: "0.7rem 2rem" }}
                                            >
                                                Registrar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-5">Redes Sociales</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
