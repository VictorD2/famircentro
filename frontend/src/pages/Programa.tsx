/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ScrollReveal from "scrollreveal";

// Componentes
import NavBar from "../components/Helpers/NavBar";
import Badge from "../components/Helpers/Badge";
import Footer from "../components/Helpers/Footer";
import CursoItem from "../components/CursosCliente/CursoItem";
import Buscador from "../components/Buscador/Buscador";

//Services
import * as cursosServices from "../components/CursosDash/CursosServices";

//Interfaces
import { Curso } from "../components/CursosDash/Curso";

interface Params {
  modalidad: string;
  tipo: string;
}

const Programa = () => {
  const modalidades = ["Sincronicos", "Asincronicos", "Talleres", "Cursos"];

  const params = useParams<Params>();

  const history = useHistory();

  const [tipo, setTipo] = useState<string>("");
  const [modalidad, setModalidad] = useState<string>("");
  const [cursos, setCursos] = useState<Curso[]>([]);

  const [filtro, setFiltro] = useState<string>("");

  const buscar = (text: string) => setFiltro(text);

  // const [cantidadPaginas, setCantidadPaginas] = useState<number>(0)
  const [page, setPage] = useState<number>(1);
  const getCursos = async () => {
    const res = await cursosServices.getAllCursos(params.tipo, params.modalidad, page, filtro);
    for (let index = 0; index < res.data.length; index++) res.data[index].descripcion = formatingDescripcion(res.data[index].descripcion);
    setCursos(res.data);
  };
  const formatingDescripcion = (descripcion: string): string => {
    return descripcion.replace(/\n/g, "<br/>");
  };
  const settings = () => {
    params.modalidad === "Sincronicos" ? setModalidad("Sincrónicos") : setModalidad("Asincrónicos");
    params.tipo === "Talleres" ? setTipo("Talleres") : setTipo("Cursos");
  };
  useEffect(() => {
    if (!modalidades.includes(params.modalidad) || !modalidades.includes(params.tipo) || (params.tipo === "Cursos" && params.modalidad === "Asincrónicos")) return history.push("/");
    getCursos();
    settings();
    return () => {
      setPage(1);
    };
  }, [params.modalidad, params.tipo, filtro]);

  useEffect(() => {
    const config = {
      duration: 1000,
      delay: 150,
      easing: "ease",
    };
    ScrollReveal().reveal(".show", config);
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <Badge name={`${tipo} ${modalidad}`} />
      <div className="w-100 d-flex justify-content-between">
        <div className="ms-auto pe-5">
          <Buscador placeholder={`Buscar ${tipo} ${modalidad}`} funcion={buscar} />
        </div>
      </div>
      <div className="mt-5" style={{ marginBottom: "4.5rem" }}>
        {cursos.map((curso) => {
          
          return <CursoItem key={curso.id_curso} curso={curso} />;
        })}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Programa;
