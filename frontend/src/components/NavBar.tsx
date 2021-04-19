import React from "react";
import logo from "../images/logoFamir.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
const NavBar = () => {
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
                    <a className="login-button" href="/Login">
                      Login /
                    </a>
                    <a className="login-button" href="/Register">
                      / Register
                    </a>
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
              <a className="item-link" href="/">
                Inicio
              </a>
            </li>
            <li className="lista-item">
              <a className="item-link" href="/Nosotros">
                Nosotros
              </a>
            </li>
            <li className="lista-item">
              <a className="item-link" href="/Contactanos">
                Contáctanos
              </a>
            </li>
            <li className="lista-item">
              <a className="item-link" href="/Programa">
                Programa
              </a>
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
            <a className="item-link" href="/">
              Inicio
            </a>
          </li>
          <li className="item-list">
            <a className="item-link" href="/Nosotros">
              ¿Quienes Somos?
            </a>
          </li>
          <li className="item-list">
            <a className="item-link" href="/Contactanos">
              Contáctanos
            </a>
          </li>
          <li className="item-list">
            <a className="item-link" href="/Programas">
              Programa
            </a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
