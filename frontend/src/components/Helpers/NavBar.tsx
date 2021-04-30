import React from "react";
import logo from "../../images/logoFamir.svg";
import Axios from "axios";

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faBars, faTimes, faDoorOpen, faUser } from "@fortawesome/free-solid-svg-icons";

import { useUsuario } from "../../context-user/UsuarioProvider";

const NavBar = () => {
  const { usuario, loadUser } = useUsuario();
  // Para fijar el nav al scrollear la pagina
  window.onscroll = () => {
    if (window.scrollY >= 117) {
      document.querySelector("#navPrincipal")?.classList.add("fijar-nav");
      document
        .querySelector(".navigation-responsive")
        ?.classList.add("fijar-nav");
    } else {
      document.querySelector("#navPrincipal")?.classList.remove("fijar-nav");
      document
        .querySelector(".navigation-responsive")
        ?.classList.remove("fijar-nav");
    }
  };

  // Para mostrar o ocultar la barra lateral
  const moverNavLateral = () => {
    const panel = document.querySelector(".navigation-left");
    panel?.classList.toggle("moverDerecha");
    panel?.classList.toggle("moverIzquierda");
  };

  //Desconectar
  const logout = async () => {
    const res = await Axios.get("http://localhost:4000/logout", {
      withCredentials: true,
    });
    if (res.data.message === "success") window.location.href = "/"; //<- Te regresa a la pagina principal
  };

  return (
    <React.Fragment>
      <header className="header-area">
        {/* Logo y Boton Registrar   */}
        <div className="top-header">
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-12 h-100">
                <div className="header-content h-100 d-flex align-items-center justify-content-between">
                  <div className="logo-content align-self-cemter justify-content-start">
                    <a className="logo-link" href="/">
                      <img className="logo" src={logo} alt="Logo FamirCentro" />
                    </a>
                  </div>
                  <div className="align-self-center justify-content-end">
                    {loadUser ? (<>
                      {usuario.authenticate ? (
                        <>
                          <Link className="login-button p-3 fs-3" to="/Perfil">
                            <FontAwesomeIcon icon={faUser} />
                          </Link>
                          <a
                            onClick={logout}
                            className="login-button p-3 fs-3"
                            href="/logout"
                          >
                            <FontAwesomeIcon icon={faDoorOpen} />
                          </a>
                        </>
                      ) : (
                        // {/* //Cuando no lo está */}
                        <>
                          <Link className="login-button" to="/Login">
                            Login /
                        </Link>
                          <Link className="login-button" to="/Register">
                            / Register
                        </Link>
                        </>
                      )}

                    </>) : (<></>)}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* NavBar */}
      <nav id="navPrincipal" className="navigation justify-content-center">
        <div className="left-side">
          <ul className="lista-enlace">
            <li className="lista-item">
              <Link className="item-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="lista-item">
              <Link className="item-link" to="/Nosotros">
                Nosotros
              </Link>
            </li>
            <li className="lista-item">
              <Link className="item-link" to="/Contactanos">
                Contáctanos
              </Link>
            </li>
            <li className="lista-item">
              <Link className="item-link" to="/Programa">
                Programa
              </Link>
            </li>
          </ul>
        </div>
        <div className="right-side">
          <div className="icon-phone">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <p className="phone">(+65) 456 332 5568 889</p>
        </div>
      </nav>
      {/* NavBar Responsive */}
      <div className="navigation-responsive">
        <div className="left-side text-center">
          <button onClick={moverNavLateral} className="btn fs-3">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className="right-side">
          <div className="icon-phone">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <p className="phone">(+65) 456 332 5568 889</p>
        </div>
      </div>
      {/* Nav Lateral */}
      <nav className="navigation-left moverIzquierda">
        <div className="w-100 d-flex justify-content-end">
          <button
            onClick={moverNavLateral}
            className="btn justify-content-end fs-3"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <ul className="d-flex flex-column pt-5 navigation-list">
          <li className="item-list">
            <Link className="item-link" to="/">
              Inicio
            </Link>
          </li>
          <li className="item-list">
            <Link className="item-link" to="/Nosotros">
              ¿Quienes Somos?
            </Link>
          </li>
          <li className="item-list">
            <Link className="item-link" to="/Contactanos">
              Contáctanos
            </Link>
          </li>
          <li className="item-list">
            <Link className="item-link" to="/Programa">
              Programa
            </Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
