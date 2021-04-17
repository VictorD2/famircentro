import React from "react";
import imagen from "../images/pc-2.jpg";
import TopCursosItem from "./TopCursosItem";

const ListaTopCursos = () => {
  return (
    <section className="top-cursos">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="top-cursos-heading">
              <span>The best</span>
              <h3>Top Popular Courses</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <TopCursosItem img={imagen} fecha="15/05/2000" url="/" title="Business for begginers" descripcion="Cras vitae turpis lacinia, lacinia lacus non, fermentum nisi. Donec et sollicitudin est, in euismod."nombre_profesor="Simon Smith" />
          <TopCursosItem img={imagen} fecha="15/05/2000" url="/" title="Business for begginers" descripcion="Cras vitae turpis lacinia, lacinia lacus non, fermentum nisi. Donec et sollicitudin est, in euismod."nombre_profesor="Simon Smith" />
          <TopCursosItem img={imagen} fecha="15/05/2000" url="/" title="Business for begginers" descripcion="Cras vitae turpis lacinia, lacinia lacus non, fermentum nisi. Donec et sollicitudin est, in euismod."nombre_profesor="Simon Smith" />
          <TopCursosItem img={imagen} fecha="15/05/2000" url="/" title="Business for begginers" descripcion="Cras vitae turpis lacinia, lacinia lacus non, fermentum nisi. Donec et sollicitudin est, in euismod."nombre_profesor="Simon Smith" />
        </div>
      </div>
    </section>
  );
};

export default ListaTopCursos;