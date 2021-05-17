import React, { ChangeEvent, FormEvent } from "react";
import axios from "axios";

import logoRegister from "../images/Logo.svg";
//Toast
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css/animate.min.css';
interface Usuario {
  name: string;
  surname: string;
  email: string;
  password: string;
  verifyPassword: string;
  rut: string;
  telefono: string;
  pais: number;
  profesion: string;
}

class Register extends React.Component {

  //Initial State
  state: Usuario = {
    name: "",
    surname: "",
    email: "",
    rut: "",
    telefono: "",
    pais: 1,
    password: "",
    profesion: "",
    verifyPassword: "",
  };

  //Set state
  handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Submit
  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.password !== this.state.verifyPassword) return toast.error('Las contraseña nos coinciden');
    const datos = await axios.post("http://localhost:4000/signup", this.state);
    if (datos.data.message === "failed") return toast.error('El correo electrónico ya está en uso');
    window.location.href = "/";
  };
  render() {
    return (
      <div className="rgt__main">
        <ToastContainer />
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
                        <input onChange={this.handleInputChange} className="form-control rgt__form-control" type="text" name="name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input onChange={this.handleInputChange} className="form-control rgt__form-control" type="text" name="surname" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input onChange={this.handleInputChange} className="form-control rgt__form-control" type="email" name="email" placeholder="name@example.com" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Pais</label>
                        <select onChange={this.handleInputChange} className="form-control rgt__form-control" name="pais" >
                          <option value="1">Perú</option>
                          <option value="2">Chile</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Profesión</label>
                        <input onChange={this.handleInputChange} className="form-control rgt__form-control" type="text" name="profesion" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input onChange={this.handleInputChange} className="form-control rgt__form-control" type="text" name="telefono" placeholder="Telefono" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">RUT</label>
                        <input onChange={this.handleInputChange} className="form-control rgt__form-control" type="text" name="rut" placeholder="RUT" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input onChange={this.handleInputChange} className="form-control rgt__form-control" type="password" name="password" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label"> Confirmar contraseña </label>
                        <input onChange={this.handleInputChange} className="form-control rgt__form-control" type="password" name="verifyPassword" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="rgt__button">
                        <button type="submit" className="btn btn__more" style={{ padding: "0.7rem 2rem" }}> Registrar </button>
                      </div>
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
