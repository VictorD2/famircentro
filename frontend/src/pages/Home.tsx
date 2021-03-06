import React from "react";

// Componentes
import Carrusel from "../components/Carrousel/Carrusel";
import ListaCursos from "../components/Cursos/ListaCursos";
import ListaOpiniones from "../components/Opiniones/ListaOpiniones";
import ListaTopCursos from "../components/TopCursos/ListaTopCursos";
import NavBar from "../components/Helpers/NavBar";
import Footer from "../components/Helpers/Footer";

// Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUser, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

// ScrollReveal
import ScrollReveal from "scrollreveal";
class Home extends React.Component {
  componentDidMount() {
    window.scrollTo({ top: 0 });
    //Para los efectos de aparicion
    const config = {
      duration: 1000,
      delay: 150,
      easing: "ease",
    };
    ScrollReveal().reveal(".show", config);
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />

        <Carrusel />
        <div className="w-100 h-100 d-flex justify-content-center">
          <div className="caracteristicas">
            <div className="d-flex justify-content-around align-items-center w-100 h-100 fila">
              <div className="w-100 caracteristicas-item">
                <FontAwesomeIcon className="fs-3" icon={faBook} />
                <h5 className="caracteristicas-text">Cursos Virtuales</h5>
              </div>
              <div className="w-100 caracteristicas-item">
                <FontAwesomeIcon className="fs-3" icon={faUser} />
                <h5 className="caracteristicas-text">Increíbles Profesores</h5>
              </div>
              <div className="w-100 caracteristicas-item">
                <FontAwesomeIcon className="fs-3" icon={faPhoneAlt} />
                <h5 className="caracteristicas-text">Amazing Teachers</h5>
              </div>
            </div>
          </div>
        </div>
        <ListaCursos />
        <ListaOpiniones />
        <ListaTopCursos />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
