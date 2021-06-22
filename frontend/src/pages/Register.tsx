import React, { ChangeEvent, FormEvent, useState, useRef, RefObject } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";
import swal from 'sweetalert';

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

const Register = () => {

  //Initial State
  const [usuario, setUsuario] = useState<Usuario>({
    name: "",
    surname: "",
    email: "",
    rut: "",
    telefono: "",
    pais: 1,
    password: "",
    profesion: "",
    verifyPassword: "",
  });

  // const validacion = ['password', 'verifyPassword'];

  const exprRegular = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // name@example.com
    telefono: /^\d{9,14}$/ // 7 a 14 numeros.
  }

  // CAPTCHA State
  const [captchaValidation, setCaptchaValidation] = useState<Boolean>();

  // REFERENCE
  const captcha: RefObject<ReCAPTCHA> = useRef(null);

  const parrafoName = useRef<HTMLParagraphElement>(null);
  const parrafoSurname = useRef<HTMLParagraphElement>(null);
  const parrafoEmail = useRef<HTMLInputElement>(null);
  const parrafoProfesion = useRef<HTMLInputElement>(null);
  const parrafoTelephone = useRef<HTMLInputElement>(null);

  const refPasswordVerify = useRef<HTMLInputElement>(null)
  const refPassword = useRef<HTMLInputElement>(null)

  // onChange ReCAPTCHA
  const onChange = () => {
    if (captcha.current?.getValue()) {
      setCaptchaValidation(true);
    }
  }

  //Set state
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case 'name': validation(exprRegular.nombre, e.target.value, e.target, parrafoName);
        break;
      case 'surname': validation(exprRegular.nombre, e.target.value, e.target, parrafoSurname);
        break;
      case 'email': validation(exprRegular.correo, e.target.value, e.target, parrafoEmail);
        break;
      case 'profesion': validation(exprRegular.nombre, e.target.value, e.target, parrafoProfesion);
        break;
      case 'telefono': validation(exprRegular.telefono, e.target.value, e.target, parrafoTelephone);
        break;
      case 'password': validationPassword();
        break;
      case 'verifyPassword': validationPassword();
        break;
    }
  };

  //Submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (captcha.current?.getValue()) {
      // console.log('El usuario no es un Robot');
      // if (usuario.password !== usuario.verifyPassword) return toast.error('Las contraseña nos coinciden');
      if (exprRegular.nombre.test(usuario.name) && exprRegular.nombre.test(usuario.surname) && usuario.password === usuario.verifyPassword) {
        const datos = await axios.post("http://localhost:4000/signup", usuario);
        if (datos.data.message === "failed") return toast.error('El correo electrónico ya está en uso');
        window.location.href = "/";
        setCaptchaValidation(true);
        return
      }
      swal("Oops!", "Ocurrió un error al intentar registrarse", "error")
    } else {
      setCaptchaValidation(false);
    }
  };

  // Validación de campos
  const validation = (expr: RegExp, valor: string, input: EventTarget & (HTMLInputElement | HTMLSelectElement), msg: RefObject<HTMLParagraphElement>) => {
    if (expr.test(valor)) {
      input.classList.remove('is-invalid');
      msg.current?.classList.add('d-none');
      return
    }
    input.classList.add('is-invalid');
    msg.current?.classList.remove('d-none');
  }

  const validationPassword = () => {
    if (refPassword.current?.value === refPasswordVerify.current?.value) {
      console.log(refPassword.current?.value, refPasswordVerify.current?.value)
      refPassword.current?.classList.remove('is-invalid');
      refPasswordVerify.current?.classList.remove('is-invalid');
      return
    }
    console.log(refPassword.current?.value, refPasswordVerify.current?.value)
    refPassword.current?.classList.add('is-invalid');
    refPasswordVerify.current?.classList.add('is-invalid');
  }

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
              <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Nombres</label>
                      <input
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        type="text"
                        name="name" />
                      <p
                        className="text-danger fw-light d-none mt-2"
                        ref={parrafoName}
                        style={{ fontSize: '0.75rem' }}>
                        El nombre solo puede contener letras y espacios.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Apellidos</label>
                      <input
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        type="text"
                        name="surname" />
                      <p
                        className="text-danger fw-light d-none mt-2"
                        ref={parrafoSurname}
                        style={{ fontSize: '0.75rem' }}>
                        El apellido solo puede contener letras y espacios.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Correo</label>
                      <input
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        type="email"
                        name="email"
                        placeholder="name@example.com" />
                      <p
                        className="text-danger fw-light d-none mt-2"
                        ref={parrafoEmail}
                        style={{ fontSize: '0.75rem' }}>
                        El email debe tener formato name@example.com
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Pais</label>
                      <select onChange={handleInputChange} className="form-control rgt__form-control" name="pais" >
                        <option value="0" >Chile</option>
                        <option value="1" selected>Perú</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Profesión</label>
                      <input
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        type="text"
                        name="profesion" />
                      <p
                        className="text-danger fw-light d-none mt-2"
                        ref={parrafoProfesion}
                        style={{ fontSize: '0.75rem' }}>
                        La profesion debe contener letras y espacios
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Teléfono</label>
                      <input
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        type="text"
                        name="telefono"
                        placeholder="Telefono" />
                      <p
                        className="text-danger fw-light d-none mt-2"
                        ref={parrafoTelephone}
                        style={{ fontSize: '0.75rem' }}>
                        El telefono solo debe tener 9 a 14 numeros
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">RUT</label>
                      <input
                      onChange={handleInputChange}
                      className="form-control rgt__form-control"
                      type="text"
                      name="rut"
                      placeholder="RUT" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Contraseña</label>
                      <input
                      onChange={handleInputChange}
                      ref={refPassword}
                      className="form-control rgt__form-control"
                      type="password"
                      name="password" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label"> Confirmar contraseña </label>
                      <input
                      onChange={handleInputChange}
                      ref={refPasswordVerify}
                      className="form-control rgt__form-control"
                      type="password"
                      name="verifyPassword" />
                    </div>
                  </div>
                  <div className="recaptcha d-flex justify-content-center">
                    <ReCAPTCHA
                      ref={captcha}
                      sitekey="6LejHikbAAAAADWr-hPzdVv7v7pU4m0M_ceI_6SB"
                      onChange={onChange}
                    />
                  </div>
                  {captchaValidation === false &&
                    <div className="text-center text-danger mt-2">
                      Por favor acepta el captcha
                    </div>
                  }
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

export default Register;
