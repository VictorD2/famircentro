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

  const [cantidad, setCantidad] = useState<number>(0);
  const [cantidadPaginas, setCantidadPaginas] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const getCantidad = async () => {
    const res = await profesorServices.getCount(props.filtro);
    setCantidad(res.data);
    setCantidadPaginas(Math.ceil(res.data / 12));
  };
  const paginaSiguiente = () => {
    if (page === cantidadPaginas) return;
    setPage(page + 1);
  };

  const paginaAnterior = () => {
    if (page === 1) return;
    setPage(page - 1);
  };
  //Cuando cargue
  useEffect(() => {
    loadProfesores();
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

  //Traer datos de la bd
  const loadProfesores = async () => {
    const res = await profesorServices.getAll(page, props.filtro);
    setProfesores(res.data);
    setLoading(true);
  };

  const limpieza = () => {
    setProfesores([]);
    setLoading(false);
  };

  // Profesores
  return (
    <>
      <div className="table-responsive">
        <table className="table table-light-gray table-bordered table-hover">
          <caption>Cantidad de profesores: {cantidad}</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>APELLIDOS</th>
              <th>CORREO</th>
              <th>PROFESION</th>
              <th className="text-center">EDITAR</th>
              <th className="text-center">VER M??S</th>
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
                {profesores.length === 0 ? (
                  <>
                    <tr>
                      <td>No hay profesores registrados a??n</td>
                    </tr>
                  </>
                ) : (
                  <>
                    {profesores.map((profesor) => {
                      return <ProfesorItem cargaDatos={loadProfesores} funcion={props.funcion} profesor={profesor} key={profesor.id_usuario} />;
                    })}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between">
        {page === 1 ? (
          <></>
        ) : (
          <>
            <button
              onClick={() => {
                paginaAnterior();
              }}
              className="btn btn__blue"
            >
              <span aria-hidden="true">&laquo; P??gina Anterior</span>
            </button>
          </>
        )}
        {page === cantidadPaginas ? (
          <></>
        ) : (
          <>
            <button
              onClick={() => {
                paginaSiguiente();
              }}
              className="btn btn__blue ms-auto"
            >
              <span aria-hidden="true">P??gina Siguiente &raquo;</span>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ListaProfesores;
