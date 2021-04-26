import React from "react";

// Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/logoFamir2.png";

const Navigation = () => {
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
            <a className="navbar__link" href="/">
              Home
            </a>
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
          <img className="img-fluid" src={logo} alt="" />
          <div className="w-50">
            <p className="user__name">Pedro Marino Reyes Herrera</p>
          </div>
        </div>
        <ul className="opciones">
          <li className="opciones__item">
            <a className="item__link" href="/DashBoard/Usuarios">
              <FontAwesomeIcon icon={faBars} />
              <p>Usuarios</p>
            </a>
          </li>
          <li className="opciones__item">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                  >
                    <FontAwesomeIcon icon={faBars} />
                    <p>Cursos</p>
                    <div className="w-100 d-flex align-items-center justify-content-end">
                      <FontAwesomeIcon
                        className="icon__button"
                        icon={faChevronDown}
                      />
                    </div>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <a
                      className="item__link my-2 p-0"
                      href="/DashBoard/Asincronos"
                    >
                      <FontAwesomeIcon icon={faBars} />
                      <p>Cursos Asincronos</p>
                    </a>
                    <a
                      className="item__link my-0 p-0"
                      href="/DashBoard/Asincronos"
                    >
                      <FontAwesomeIcon icon={faBars} />
                      <p>Cursos Sincronos</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="opciones__item">
            <a className="item__link" href="/DashBoard/Profesores">
              <FontAwesomeIcon icon={faBars} />
              <p>Profesores</p>
            </a>
          </li>
        </ul>
      </aside>
    </React.Fragment>
  );
};

export default Navigation;