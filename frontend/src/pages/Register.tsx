import React, { ChangeEvent, FormEvent, useState, useRef, RefObject } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";
import { Link } from 'react-router-dom';
import logoRegister from "../images/Logo.svg";
import auth from '../context-user/auth';
//Toast
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css/animate.min.css';
import { useUsuario } from "../context-user/UsuarioProvider";
import { useHistory } from "react-router-dom";
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
  const [usuarioR, setUsuarioR] = useState<Usuario>({
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

  const history = useHistory();

  const refPasswordVerify = useRef<HTMLInputElement | null>()
  const refPassword = useRef<HTMLInputElement | null>()
  const validacion = ['password', 'verifyPassword'];

  const { setUsuario } = useUsuario();

  // CAPTCHA State
  const [captchaValidation, setCaptchaValidation] = useState<Boolean>();

  // CAPTCHA Reference
  const captcha: RefObject<ReCAPTCHA> = useRef(null);

  // onChange ReCAPTCHA
  const onChange = () => {
    if (captcha.current?.getValue()) {
      // console.log('El usuario no es un robot');
      setCaptchaValidation(true);
    }
  }

  //Set state
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUsuarioR({ ...usuarioR, [e.target.name]: e.target.value });
    if (validacion.includes(e.target.name)) {
      if (refPassword.current?.value === refPasswordVerify.current?.value) {
        refPassword.current?.classList.remove('is-invalid');
        refPasswordVerify.current?.classList.remove('is-invalid');
        return
      }
      refPassword.current?.classList.add('is-invalid');
      refPasswordVerify.current?.classList.add('is-invalid');
    }
  };

  //Submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (captcha.current?.getValue()) {
      // console.log('El usuario no es un Robot');
      if (usuarioR.password !== usuarioR.verifyPassword) return toast.error('Las contraseña nos coinciden');
      const datos = await axios.post("http://localhost:4000/signup", usuarioR);
      if (datos.data.success) {
        setUsuario(datos.data.user)
        auth.setRango(datos.data.user.id_rango);
        auth.sigIn();
        return history.push('/')
      }
      if (datos.data.error) return toast.error(datos.data.error);
      setCaptchaValidation(true);
    } else {
      // console.log('Por favor acepta el captcha');
      setCaptchaValidation(false);
    }
  };



  return (
    <div className="rgt__main">
      <ToastContainer />
      <div className="card content__form animate__animated animate__flipInY">
        <Link to="/" className="card-header rgt__header">
          <img className="rgt__img" src={logoRegister} alt="logo-register" />
          <h5 className="rgt__title">FAMIR CENTRO</h5>
        </Link>
        <div className="card-body">
          <div className="row">
            <div className="col-12 rgt__form">
              <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Nombres</label>
                      <input value={usuarioR.name} onChange={handleInputChange} className="form-control rgt__form-control" type="text" name="name" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Apellidos</label>
                      <input value={usuarioR.surname} onChange={handleInputChange} className="form-control rgt__form-control" type="text" name="surname" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Correo</label>
                      <input value={usuarioR.email} onChange={handleInputChange} className="form-control rgt__form-control" type="email" name="email" placeholder="name@example.com" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Pais</label>
                      <select value={usuarioR.pais} onChange={handleInputChange} className="form-control rgt__form-control" name="pais" >
                        <option value="2">Chile</option>
                        <option value="1">Perú</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Profesión</label>
                      <input value={usuarioR.profesion} onChange={handleInputChange} className="form-control rgt__form-control" type="text" name="profesion" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Teléfono</label>
                      <input value={usuarioR.telefono} onChange={handleInputChange} className="form-control rgt__form-control" type="text" name="telefono" placeholder="Telefono" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">RUT</label>
                      <input value={usuarioR.rut} onChange={handleInputChange} className="form-control rgt__form-control" type="text" name="rut" placeholder="RUT" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Contraseña</label>
                      <input value={usuarioR.password} onChange={handleInputChange} ref={node => refPassword.current = node} className="form-control rgt__form-control" type="password" name="password" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label"> Confirmar contraseña </label>
                      <input value={usuarioR.verifyPassword} onChange={handleInputChange} ref={node => refPasswordVerify.current = node} className="form-control rgt__form-control" type="password" name="verifyPassword" />
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
