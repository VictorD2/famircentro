import React, { useState } from "react";

import axios from "axios";
import logoLogin from "../images/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(initialState);
  //Set state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //On submit login
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/signin", state);
    if (res.data.message === "failed") return toast.error("Correo o contraseña incorrectos");
    window.location.href = "/";
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="rgt__main">
        <div className="card content__Login animate__animated animate__flipInY">
          <a href="/" className="card-header rgt__header">
            <img className="rgt__img" src={logoLogin} alt="logo-register" />
            <h5 className="rgt__title">FAMIR CENTRO</h5>
          </a>
          <div className="card-body px-4">
            <div className="row pt-2">
              <div className="col-12">
                <a
                  href="auth/facebook"
                  // onClick={this.handleFacebook}
                  className="btn btn-primary w-100 icon__social"
                >
                  <FontAwesomeIcon icon={faFacebook} className="fs-3" />
                  <span className="ms-3">Iniciar sesión con Facebook</span>
                </a>
              </div>
              <div className="col-12 mt-2">
                <a
                  // onClick={this.handleGoogle}
                  href="auth/google"
                  className="btn btn-danger w-100 icon__social"
                >
                  <FontAwesomeIcon icon={faGoogle} className="fs-3" />{" "}
                  <span className="ms-3">Iniciar sesión con Google</span>
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
                <form onSubmit={handleForm}>
                  <div className="form-floating mb-3">
                    <input
                      onChange={handleInputChange}
                      type="email"
                      name="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Correo</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={handleInputChange}
                      type="password"
                      name="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
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
                <span style={{ color: "#000000" }}>
                  ¿Aún no tienes cuenta en FAMIR CENTRO?
                </span>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center mb-3">
              <a href="/Register" className="btn btn-outline-success w-75">
                Regístrate
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
