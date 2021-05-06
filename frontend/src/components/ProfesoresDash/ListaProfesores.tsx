import React, { useEffect, useState } from "react";

import { Profesor } from "./Profesor";
import * as videoServices from "./ProfesoresServices";
import ProfesorItem from "./ProfesorItem";

interface Props {
  funcion: (profesor: Profesor) => void;
  filtro: string;
}
const ListaProfesores = (props: Props) => {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [loading, setLoading] = useState(false);

  //Traer datos de la bd
  const loadProfesores = async () => {
    const res = await videoServices.getAll();
    setProfesores(res.data);
    setLoading(true);
  };

  const limpieza = () => {
    setProfesores([]);
    setLoading(false);
  }

  //Cuando cargue
  useEffect(() => {
    loadProfesores();
    return () => {
      limpieza();
    }
  }, []);

  // Cargando
  if (!loading)
    return (
      <tr>
        <td>Cargando datos...</td>
      </tr>
    );

  // Sin profesores
  if (profesores.length === 0)
    return (
      <tr>
        <td>No hay profesores registrados aún</td>
      </tr>
    );

  // Profesores
  return (
    <React.Fragment>
      {profesores.map((profesor) => {
        if (props.filtro === "") return <ProfesorItem cargaDatos={loadProfesores} funcion={props.funcion} profesor={profesor} key={profesor.id_usuario} />;
        if (props.filtro === profesor.id_usuario?.toString()
          || profesor.nombre?.toLowerCase().search(props.filtro.toLowerCase()) !== -1
          || profesor.apellido?.toLowerCase().search(props.filtro.toLowerCase()) !== -1
          || profesor.correo?.toLowerCase().search(props.filtro.toLowerCase()) !== -1
          || profesor.nombre_pais?.toLowerCase().search(props.filtro.toLowerCase()) !== -1
          || profesor.profesion?.toLowerCase().search(props.filtro.toLowerCase()) !== -1
          || profesor.telefono?.toLowerCase().search(props.filtro.toLowerCase()) !== -1
          || profesor.rut?.toLowerCase().search(props.filtro.toLowerCase()) !== -1)
          return <ProfesorItem cargaDatos={loadProfesores} funcion={props.funcion} profesor={profesor} key={profesor.id_usuario} />;
        return <tr key={profesor.id_usuario}></tr>
      })}
    </React.Fragment>

  );
};

export default ListaProfesores;
