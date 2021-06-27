/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

//Services
import * as profesorServices from "./ProfesoresServices";
//Components
import ProfesorItem from "./ProfesorItem";

//Interfaces
import { Profesor } from "./Profesor";

interface Props {
  funcion: (profesor: Profesor) => void;
  filtro: string;
}
const ListaProfesores = (props: Props) => {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [loading, setLoading] = useState(false);
  const [cantidad, setCantidad] = useState<number>(0)
  const [cantidadPaginas, setCantidadPaginas] = useState<number>(0)
  const [page, setPage] = useState<number>(1);


  const getCantidad = async () => {
    const res = await profesorServices.getCount();
    setCantidad(res.data);
    setCantidadPaginas(Math.ceil(res.data / 12));
  }
  const paginaSiguiente = () => {
    if (page === cantidadPaginas) return;
    setPage(page + 1)
  }

  const paginaAnterior = () => {
    if (page === 1) return;
    setPage(page - 1)
  }
  //Cuando cargue
  useEffect(() => {
    loadProfesores();
    return () => limpieza();
  }, [page]);

  useEffect(() => {
    getCantidad();
    return () => setCantidad(0);
  }, []);

  //Traer datos de la bd
  const loadProfesores = async () => {
    const res = await profesorServices.getAll(page);
    setProfesores(res.data);
    setLoading(true);
  };


  const limpieza = () => {
    setProfesores([]);
    setLoading(false);
  }

  // Cargando
  if (!loading)
    return (
      <table className="table table-light-gray table-bordered table-hover table-responsive">
        <caption>Cantidad de profesores: {cantidad}</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>APELLIDOS</th>
            <th>CORREO</th>
            <th>PAIS</th>
            <th>PROFESION</th>
            <th className="text-center">EDITAR</th>
            <th className="text-center">VER MÁS</th>
            <th className="text-center">DESHABILITAR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cargando datos...</td>
          </tr>
        </tbody>
      </table>
    );

  // Sin profesores
  if (profesores.length === 0)
    return (
      <table className="table table-light-gray table-bordered table-hover table-responsive">
        <caption>Cantidad de profesores: {cantidad}</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>APELLIDOS</th>
            <th>CORREO</th>
            <th>PAIS</th>
            <th>PROFESION</th>
            <th className="text-center">EDITAR</th>
            <th className="text-center">VER MÁS</th>
            <th className="text-center">DESHABILITAR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>No hay profesores registrados aún</td>
          </tr>
        </tbody>
      </table>

    );

  // Profesores
  return (
    <>
      <table className="table table-light-gray table-bordered table-hover table-responsive">
        <caption>Cantidad de profesores: {cantidad}</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>APELLIDOS</th>
            <th>CORREO</th>
            <th>PAIS</th>
            <th>PROFESION</th>
            <th className="text-center">EDITAR</th>
            <th className="text-center">VER MÁS</th>
            <th className="text-center">DESHABILITAR</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        {page === 1 ? (<>
        </>) : (<>
          <button onClick={() => { paginaAnterior() }} className="btn btn__blue"><span aria-hidden="true">&laquo; Página Anterior</span></button>
        </>)}
        {page === cantidadPaginas ? (<>
        </>) : (<>
          <button onClick={() => { paginaSiguiente() }} className="btn btn__blue ms-auto"><span aria-hidden="true">Página Siguiente &raquo;</span></button>
        </>)}
      </div>
    </>
  );
};

export default ListaProfesores;
