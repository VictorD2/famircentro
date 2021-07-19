/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

//Services
import * as estudianteServices from "./EstudianteService";

//Componentes
import EstudianteItem from "./EstudianteItem";

//Interfaces
import { Estudiante } from "./Estudiante";

interface Props {
  funcion: (estudiante: Estudiante) => void;
  filtro: string;
}

const ListaEstudiantes = (props: Props) => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(false);

  const [cantidad, setCantidad] = useState<number>(0);
  const [cantidadPaginas, setCantidadPaginas] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const paginaSiguiente = () => {
    if (page === cantidadPaginas) return;
    setPage(page + 1);
  };

  const paginaAnterior = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  //Traer datos de la bd
  const loadEstudiantes = async () => {
    const res = await estudianteServices.getAll(page, props.filtro);
    setEstudiantes(res.data);
    setLoading(true);
  };
  const getCantidad = async () => {
    const res = await estudianteServices.getCount(props.filtro);
    setCantidad(res.data);
    setCantidadPaginas(Math.ceil(res.data / 3));
  };
  const limpieza = () => {
    setEstudiantes([]);
    setLoading(false);
  };

  //Cuando cargue
  useEffect(() => {
    loadEstudiantes();
    return () => limpieza();
  }, [page, props.filtro]);

  useEffect(() => {
    setPage(1);
    setCantidadPaginas(0);
    getCantidad();
    return () => {
      setCantidad(0);
      setCantidadPaginas(0);
      setPage(1);
    };
  }, [props.filtro]);

  // Estudiantes
  return (
    <React.Fragment>
      <table className="table table-bordered table-hover table-responsive">
        <caption>Cantidad de estudiantes: {cantidad}</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>APELLIDOS</th>
            <th>CORREO</th>
            <th>PROFESION</th>
            <th className="text-center">VER MÁS</th>
            <th className="text-center">DESHABILITAR</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            <>
              <tr>
                <td>Cargando datos...</td>
              </tr>
            </>
          ) : (
            <>
              {estudiantes.length === 0 ? (
                <>
                  <tr>
                    <td>No hay profesores registrados aún</td>
                  </tr>
                </>
              ) : (
                <>
                  {estudiantes.map((estudiante) => {
                    return <EstudianteItem cargaDatos={loadEstudiantes} funcion={props.funcion} estudiante={estudiante} key={estudiante.id_usuario} />;
                  })}
                </>
              )}
            </>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        {page === 1 ? (
          <></>
        ) : (
          <>
            <button onClick={() => { paginaAnterior(); }} className="btn btn__blue" >
              <span aria-hidden="true">&laquo; Página Anterior</span>
            </button>
          </>
        )}
        {page === cantidadPaginas ? (
          <></>
        ) : (
          <>
            <button onClick={() => { paginaSiguiente(); }} className="btn btn__blue ms-auto" >
              <span aria-hidden="true">Página Siguiente &raquo;</span>
            </button>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default ListaEstudiantes;
