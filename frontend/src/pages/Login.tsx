import React from 'react';

import logoLogin from '../images/Logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faGoogle,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

class Login extends React.Component {
    render() {
        return (
            <div className="rgt__main">
                <div className="card content__Login">
                    <a href="/" className="card-header rgt__header">
                        <img className="rgt__img" src={logoLogin} alt="logo-register" />
                        <h5 className="rgt__title">FAMIR CENTRO</h5>
                    </a>
                    <div className="card-body px-4">
                        <div className="row pt-2">
                            <div className="col-12">
                                <a href="https://facebook.com" className="btn btn-primary icon__social">
                                    <FontAwesomeIcon icon={faFacebook} className="fs-3" /> <span className="ms-3">Iniciar sesión con Facebook</span>
                                </a>
                            </div>
                            <div className="col-12 mt-2">
                                <a href="https://instagram.com" className="btn btn-instagram icon__social">
                                    <FontAwesomeIcon icon={faInstagram} className="fs-3" /> <span className="ms-3">Iniciar sesión con Instagram</span>
                                </a>
                            </div>
                            <div className="col-12 mt-2">
                                <a href="https://instagram.com" className="btn btn-danger icon__social">
                                    <FontAwesomeIcon icon={faGoogle} className="fs-3" /> <span className="ms-3">Iniciar sesión con Google</span>
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <span className="line__login">
                                    <span>O</span>
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <form action="">
                                    <div className="form-floating mb-3">
                                        <input type="email" name="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                        <label htmlFor="floatingInput">Correo</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                        <label htmlFor="floatingPassword">Contraseña</label>
                                    </div>
                                    <div className="rgt__button">
                                        <button
                                            type="submit"
                                            className="btn btn__more"
                                            style={{ padding: "0.7rem 2rem" }}
                                        >
                                        Inicia sesión
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center mb-3">
                                <span style={{color: "#000000"}}>¿Aún no tienes cuenta en FAMIR CENTRO?</span>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-center mb-3">
                            <a href="/Register" className="btn btn-outline-success w-75">Regístrate</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;