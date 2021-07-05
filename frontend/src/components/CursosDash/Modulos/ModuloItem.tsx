/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Icon
import { VscRefresh } from "react-icons/vsc";
import { FaEdit, FaPlus, FaTimes } from "react-icons/fa";
import { GoKebabVertical } from "react-icons/go";

//Toastify
import { toast } from "react-toastify";

//Services
import * as moduloServices from "./ModuloService";

// Components
import TemaItem from "../Temas/TemaItem";

// Interfaces
import { Modulo } from "./Modulo";
import { Tema } from "../Temas/Tema";

interface Params {
  id: string;
}

interface Props {
  //tema
  setcount: (count: number) => void;
  count: number;
  //material
  setCountChange: (count: number) => void;
  countChange: number;
  setModuloModal: (modulo: Modulo) => void;
  modulo: Modulo;
  setTemaModal: (tema: Tema) => void;
  temaModal: Tema;
  load: (id: string) => void;
}

const ModuloItem = (props: Props) => {
  const params = useParams<Params>();

  const [temas, setTemas] = useState<Tema[]>([]); //Temas
  const [loadTemas, setLoadTemas] = useState(false); //Están los temas cargados?

  useEffect(() => {
    if (loadTemas) getTemas(); //Solo se hará cuando el estado loadTemas sea true, el cual solo cambia 1 vez
    return () => limpieza();
  }, [loadTemas, props.count]);

  //Funciones

  const eliminarModulo = async () => {
    if (!window.confirm("¿Está seguro que desea eliminar el módulo?")) return;

    const res = await moduloServices.eliminarModulo(props.modulo);
    if (res.data.success) {
      toast.success(res.data.success);
      props.load(params.id);
      return;
    }
    if (res.data.error) return toast.error(res.data.error);
  };

  // Cambiando de estado al loadTemas para traer los datos de la bd cuando hacen click al ModuloItem
  const handleLoadChange = () => {
    if (!loadTemas) return setLoadTemas(true);
  };

  // trayendo los temas de la bd
  const getTemas = async () => {
    const rows = await moduloServices.getTemasByModuloId(props.modulo.id_modulo + "");
    setTemas(rows.data);
  };

  //Limpieza cuando se desrenderice
  const limpieza = () => setTemas([]);

  const limpiandoEstados = () => {
    props.setTemaModal({ titulo: "", descripcion: "", url_video: "", video: [new File([""], "filename")] });
    props.setModuloModal(props.modulo);
  };

  return (
    <div className="accordion-item my-4">
      {/* Options */}
      <div className="w-100 d-flex justify-content-end bg-light">
        <div className="btn-group">
          <button type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
            <GoKebabVertical className="mb-1" />
          </button>
          <ul className="dropdown-menu">
            {/* Actualizar */}
            <li>
              <button onClick={() => getTemas()} className="dropdown-item">
                <VscRefresh /> Actualizar Modulo
              </button>
            </li>

            {/* Creando un tema */}
            <li>
              <button onClick={() => limpiandoEstados()} data-bs-toggle="modal" data-bs-target="#crearTema" className="dropdown-item">
                <FaPlus className="mb-1" /> Agregar Tema
              </button>
            </li>

            {/* Editar modulo */}
            <li>
              <button onClick={() => props.setModuloModal(props.modulo)} data-bs-toggle="modal" data-bs-target="#crearModulo" className="dropdown-item">
                <FaEdit className="mb-1" /> Editar Modulo
              </button>
            </li>

            {/* Eliminar modulo */}
            <li>
              <button onClick={eliminarModulo} className="dropdown-item">
                <FaTimes className="mb-1" /> Eliminar Modulo
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Content */}
      <h2 className="accordion-header" id="panelsStayOpen-headingThree">
        <button onClick={handleLoadChange} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#r${props.modulo.id_modulo}`} aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
          {props.modulo.titulo}
        </button>
      </h2>
      <div id={`r${props.modulo.id_modulo}`} className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
        <div className="p-4">
          <ol className="list-group list-group-numbered">
            {temas.map((tema) => {
              return <TemaItem countChange={props.countChange} setCountChange={props.setCountChange} setcount={props.setcount} count={props.count} modulo={props.modulo} setModuloModal={props.setModuloModal} setTemaModal={props.setTemaModal} key={tema.id_tema} tema={tema} />;
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ModuloItem;
