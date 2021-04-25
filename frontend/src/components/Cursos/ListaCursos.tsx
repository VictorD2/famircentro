import React from "react";
import CursoItem from "./CursoItem";
//import axios from "axios";

import {
  faAddressCard,
  faGlobe,
  faMap,
  faPaperPlane,
  faServer,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

const ListaCursos = () => {
  // const loadEmpleados = async () => {
  //   const res = await axios.get("http://localhost:4000/api/empleados");
  //   console.log(res);
  //   const empleado = { nombre: "XD", edad: 4 };
  //   const res1= await axios.post('http://localhost:4000/api/empleados',empleado);
  //   // console.log(res1);
  // };

  // useEffect(() => {
   
  // }, []);
  return (
    <div className="w-100 lista-cursos">
      <div className="container">
        <div className="row mx-auto">
          <CursoItem
            icon={faAddressCard}
            title={"Business School"}
            descripcion={
              "Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."
            }
          />
          <CursoItem
            icon={faGlobe}
            title={"Marketing"}
            descripcion={
              "Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."
            }
          />
          <CursoItem
            icon={faMap}
            title={"Photography"}
            descripcion={
              "Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."
            }
          />
          <CursoItem
            icon={faThumbsUp}
            title={"Social Media"}
            descripcion={
              "Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."
            }
          />
          <CursoItem
            icon={faServer}
            title={"Development"}
            descripcion={
              "Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."
            }
          />
          <CursoItem
            icon={faPaperPlane}
            title={"Design"}
            descripcion={
              "Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ListaCursos;
