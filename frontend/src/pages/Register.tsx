import React, { ChangeEvent, FormEvent } from "react";
import axios from "axios";

import logoRegister from "../images/Logo.svg";

interface Usuario {
  name: string;
  surname: string;
  email: string;
  password: string;
  verifyPassword: string;
}

class Register extends React.Component {
  async getUser() {
    const res = await axios.get("http://localhost:4000/sucessfulLogin");
    console.log(res.data);
  }
  componentWillUnmount() {
    this.getUser();
  }

  //Initial State
  state: Usuario = {
    name: "",
    surname: "",
    email: "",
    password: "",
    verifyPassword: "",
  };

  //Set state
  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Submit
  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datos = await axios.post("http://localhost:4000/signup", this.state);
    if (datos.status === 200) {
      console.log(datos.data);
      if (datos.data.datos === "failed") {
        console.log("XDDDDD fallaste p");
        return;
      }
      window.location.href = "/";
    }
  };
  render() {
    return (
      <div className="rgt__main">
        <div className="card content__form animate__animated animate__flipInY">
          <a href="/" className="card-header rgt__header">
            <img className="rgt__img" src={logoRegister} alt="logo-register" />
            <h5 className="rgt__title">FAMIR CENTRO</h5>
          </a>
          <div className="card-body">
            <div className="row">
              <div className="col-12 rgt__form">
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Nombres</label>
                        <input
                          onChange={this.handleInputChange}
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
                          onChange={this.handleInputChange}
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
                        <label className="form-label">Correo</label>
                        <input
                          onChange={this.handleInputChange}
                          className="form-control rgt__form-control"
                          type="email"
                          name="email"
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
                          onChange={this.handleInputChange}
                          className="form-control rgt__form-control"
                          type="password"
                          name="password"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Confirmar contraseña
                        </label>
                        <input
                          onChange={this.handleInputChange}
                          className="form-control rgt__form-control"
                          type="password"
                          name="verifyPassword"
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
