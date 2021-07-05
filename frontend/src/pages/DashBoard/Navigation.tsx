import React from "react";
import { Link } from "react-router-dom";

// Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBookReader, faChevronDown, faEnvelope, faFileAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/logoFamir2.png";

import { useUsuario } from "../../context-user/UsuarioProvider";

const Navigation = () => {
  const { usuario } = useUsuario();
  //Animacion de la navegacion
  const esconder = () => {
    document.querySelector(".left-aside")?.classList.toggle("esconder");
    document.querySelector(".nav-superior")?.classList.toggle("ajustar");
    document.querySelector(".contenido-principal")?.classList.toggle("ajustar");
  };

  return (
    <React.Fragment>
      {/* Nav Superior */}
      <nav className="nav-superior">
        <button onClick={esconder} className="btn btn-secondary">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link className="navbar__link" to="/">
              INICIO
            </Link>
          </li>
        </ul>
      </nav>

      {/* Nav Lateral */}
      <aside className="left-aside aparecer">
        <div className="logoDash">
          <img className="img-fluid" src={logo} alt="" />
          <p>FAMIR CENTRO</p>
        </div>
        <div className="user">
          <img className="img-fluid" src={usuario.url_foto_usuario} alt="" />
          <div className="w-50">
            <p className="user__name">{`${usuario.nombre} ${usuario.apellido}`} </p>
          </div>
        </div>
        <ul className="opciones">
          <li className="opciones__item">
            <Link className="item__link" to="/DashBoard/Usuarios">
              <FontAwesomeIcon icon={faUser} />
              <p>Usuarios</p>
            </Link>
          </li>
          <li className="opciones__item">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                    <FontAwesomeIcon icon={faBars} />
                    <p>Cursos</p>
                    <div className="w-100 d-flex align-items-center justify-content-end">
                      <FontAwesomeIcon className="icon__button" icon={faChevronDown} />
                    </div>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    {/* <Link className="item__link my-2 p-0" to="/DashBoard/Cursos/Asincronos" >
                      <FontAwesomeIcon icon={faBookReader} />
                      <p>Cursos Asincronos</p>
                    </Link> */}
                    <Link className="item__link my-0 p-0" to="/DashBoard/Cursos/Sincronicos">
                      <FontAwesomeIcon icon={faBars} />
                      <p>Cursos Sincrónicos</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="opciones__item">
            <div className="accordion" id="accordionExample2">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne2">
                    <FontAwesomeIcon icon={faBars} />
                    <p>Talleres</p>
                    <div className="w-100 d-flex align-items-center justify-content-end">
                      <FontAwesomeIcon className="icon__button" icon={faChevronDown} />
                    </div>
                  </button>
                </h2>
                <div id="collapseOne2" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <Link className="item__link my-2 p-0" to="/DashBoard/Talleres/Asincronicos">
                      <FontAwesomeIcon icon={faBookReader} />
                      <p>Talleres Asincrónicos</p>
                    </Link>
                    <Link className="item__link my-0 p-0" to="/DashBoard/Talleres/Sincronicos">
                      <FontAwesomeIcon icon={faBars} />
                      <p>Talleres Sincrónicos</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="opciones__item">
            <Link className="item__link" to="/DashBoard/Profesores">
              <FontAwesomeIcon icon={faBookReader} />
              <p>Profesores</p>
            </Link>
          </li>
          <li className="opciones__item">
            <Link className="item__link" to="/DashBoard/Comprobantes">
              <FontAwesomeIcon icon={faFileAlt} />
              <p>Comprobantes</p>
            </Link>
          </li>
          <li className="opciones__item">
            <Link className="item__link" to="/DashBoard/Contacto">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>Mensajes de Contacto</p>
            </Link>
          </li>
        </ul>
      </aside>
    </React.Fragment>
  );
};

export default Navigation;
