import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logoFamir.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone,faBars,faTimes } from "@fortawesome/free-solid-svg-icons";
const NavBar = () => {

    const moverNavLateral = ()=>{
       const panel = document.querySelector('.navigation-left');
       panel?.classList.toggle('moverDerecha');
       panel?.classList.toggle('moverIzquierda');
        // document.querySelector('.navigation-left')?.classList.toggle('moverDerecha');
    }

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
                    <Link className="logo-link" to="index.html">
                      <img className="logo" src={logo} alt="Logo FamirCentro" />
                    </Link>
                  </div>
                  <div className="align-self-center justify-content-end">
                    <Link className="login-button" to="#">
                      Register / Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* NavBar */}
      <nav className="navigation">
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
              <Link className="item-link" to="/Nosotros">
                Contáctanos
              </Link>
            </li>
            <li className="lista-item">
              <Link className="item-link" to="/Nosotros">
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
            <button  onClick={moverNavLateral} className="btn justify-content-end fs-3">
                <FontAwesomeIcon icon={faTimes}/>
            </button>
          </div>
          <ul className="d-flex flex-column pt-5 navigation-list">
              <li className="item-list">
                  <Link className="item-link" to="/">Inicio</Link>
              </li>
              <li className="item-list">
                  <Link className="item-link" to="/Nosotros">¿Quienes Somos?</Link>
              </li>
              <li className="item-list">
                  <Link className="item-link" to="/Contactanos">Contáctanos</Link>
              </li>
              <li className="item-list">
                  <Link className="item-link" to="/Programas">Programa</Link>
              </li>
          </ul>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
