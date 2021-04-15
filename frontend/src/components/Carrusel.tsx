import React from "react";
import fondo1 from "../images/bg-1.jpg";
import fondo2 from "../images/bg-2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import CarruselItem from "../components/CarruselItem";

const Carrusel = () => {
  const desaparecerFlechas = (e: React.MouseEvent<HTMLDivElement>) => {
    document.querySelectorAll(".icon__carrusel")?.forEach((elemento) => {
      elemento.classList.toggle("desaparecer");
    });
  };

  return (
    <section
      className="w-100"
      onMouseEnter={desaparecerFlechas}
      onMouseLeave={desaparecerFlechas}
    >
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={fondo1} className="d-block w-100" alt="..." />
            <div className="carrousel-text row h-100 align-items-center">
              <div className="col-12">
                <h5 className="carrousel-title">All the courses you need</h5>
                <p className="carrousel-subtitle">Welcome to our university</p>
              </div>
            </div>
          </div>
          <CarruselItem
            img={fondo2}
            title={"All the courses you need"}
            subtitle={"Welcome to our university"}
          />
          <CarruselItem
            img={fondo1}
            title={"All the courses you need"}
            subtitle={`Welcome to our university`}
          />
        </div>
        <button
          className="btn__carrusel-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <div className="icon__carrusel d-flex align-items-center desaparecer">
            <FontAwesomeIcon className="mx-auto" icon={faAngleLeft} />
          </div>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="btn__carrusel-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <div className="icon__carrusel d-flex align-items-center desaparecer">
            <FontAwesomeIcon className="mx-auto" icon={faAngleRight} />
          </div>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Carrusel;
