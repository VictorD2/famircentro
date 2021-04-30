import React, { useEffect, useState } from "react";

import { Profesor } from "./Profesor";
import * as videoServices from "./ProfesoresServices";
import ProfesorItem from "./ProfesorItem";

const ListaProfesores = () => {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [loading, setLoading] = useState(false);

  //Traer datos de la bd
  const loadProfesores = async () => {
    const res = await videoServices.getAll();
    setProfesores(res.data);
    setLoading(true);
  };
  //Cuando cargue
  useEffect(() => {
    loadProfesores();
  }, []);
  if (!loading)
    return (
      <tr>
        <td>Cargando datos...</td>
      </tr>
    );
  if (profesores.length === 0)
    return (
      <tr>
        <td>No hay profesores registrados aún</td>
      </tr>
    );

  return (
    <React.Fragment>
      {profesores.map((profesor) => {
        return <ProfesorItem profesor={profesor} key={profesor.id_profesor} />;
      })}
    </React.Fragment>
  );
};

export default ListaProfesores;
