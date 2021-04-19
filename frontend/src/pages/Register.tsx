import React from "react";

import logoRegister from "../images/Logo.svg";

class Register extends React.Component {
    render() {
        return (
            <div className="rgt__main">
                <div className="card content__form">
                    <a href="/" className="card-header rgt__header">
                        <img className="rgt__img" src={logoRegister} alt="logo-register" />
                        <h5 className="rgt__title">FAMIR CENTRO</h5>
                    </a>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <form action="">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Nombres</label>
                                                <input
                                                    className="form-control rgt__form-control"
                                                    type="text"
                                                    name="name"
                                                    required
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
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Correo</label>
                                                <input
                                                    className="form-control rgt__form-control"
                                                    type="email"
                                                    name="userName"
                                                    required
                                                    placeholder="name@example.com"
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
                                            <div className="mb-3">
                                                <label className="form-label">Contraseña</label>
                                                <input
                                                    className="form-control rgt__form-control"
                                                    type="password"
                                                    name="password"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Confirmar contraseña</label>
                                                <input
                                                    className="form-control rgt__form-control"
                                                    type="password"
                                                    name="verifyPassword"
                                                    required
                                                />
                                            </div>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
