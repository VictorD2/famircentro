import React from "react";
import CursoItem from "./CursoItem";
import {  faAddressCard,faGlobe,faMap,faPaperPlane,faServer,faThumbsUp } from "@fortawesome/free-solid-svg-icons";
const ListaCursos = () => {
  return (
    <div className="w-100 lista-cursos">
      <div className="container">
        <div className="row mx-auto">
          <CursoItem icon={faAddressCard} title={"Business School"} descripcion={"Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."} />
          <CursoItem icon={faGlobe} title={"Marketing"} descripcion={"Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."} />
          <CursoItem icon={faMap} title={"Photography"} descripcion={"Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."} />
          <CursoItem icon={faThumbsUp} title={"Social Media"} descripcion={"Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."} />
          <CursoItem icon={faServer} title={"Development"} descripcion={"Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."} />
          <CursoItem icon={faPaperPlane} title={"Design"} descripcion={"Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."} />
        </div>
      </div>
    </div>
  );
};

export default ListaCursos;
