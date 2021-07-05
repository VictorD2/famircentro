/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from "react";
import Navigation from "../../../pages/DashBoard/Navigation";
import { toast, ToastContainer } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { RiFileForbidLine } from "react-icons/ri";
import { FiFileText } from "react-icons/fi";
import { AiOutlineDownload } from "react-icons/ai";
import { Tarea } from "./Tarea";
import { useHistory, useParams } from "react-router-dom";
import * as tareaServices from "./TareaServices";
import { MaterialTarea } from "./MaterialTarea";
interface Params {
  idTarea: string;
  modalidad: string;
  tipo: string;
  id: string;
}

const initialStateTarea: Tarea = {
  titulo_tarea: "",
  descripcion_tarea: "",
  id_modulo: 0,
};

const Tareas = () => {
  const modalidades = ["Sincronicos", "Asincronicos", "Talleres", "Cursos"];
  const params = useParams<Params>();
  const history = useHistory();
  const textRef = useRef<HTMLDivElement | null>();
  const [tarea, setTarea] = useState<Tarea>(initialStateTarea);
  const [materialTarea, setMaterialTarea] = useState<MaterialTarea[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!modalidades.includes(params.modalidad) || !modalidades.includes(params.tipo)) return history.push("/");
    getTarea();
    return () => {
      setTarea(initialStateTarea);
      setMaterialTarea([]);
      setCount(0);
    };
  }, [params.tipo, params.modalidad, params.idTarea, count]);

  const getTarea = async () => {
    const res = await tareaServices.getTareasById(params.idTarea);
    if (res.data.error) return history.push(`/DashBoard/${params.tipo}/${params.modalidad}/Material/${params.id}`);
    const resMaterial = await tareaServices.getMaterialTareasById(res.data[0].id_tarea);
    setMaterialTarea(resMaterial.data);
    const newDescripcion = res.data[0].descripcion_tarea.replace(/\n/g, "<br/>");
    if (textRef.current) textRef.current.innerHTML = newDescripcion;
    res.data[0].descripcion_tarea = newDescripcion;
    setTarea(res.data[0]);
  };

  const eliminarMaterial = async (id: string) => {
    if (!window.confirm("¿Está seguro que desea eliminar la tarea?")) return;

    const res = await tareaServices.borrarMaterialTareasById(id);
    if (res.data.success) {
      setCount(count + 1);
      toast.success(res.data.success);
      return;
    }
    if (res.data.error) return toast.error(res.data.error);
  };

  return (
    <React.Fragment>
      <Navigation />
      <ToastContainer />
      <div className="contenido-principal p-4">
        {/* Title */}
        <div className="d-flex flex-row bg-white">
          <FiFileText className="fs-2 me-2" />
          <h6 className="m-0 text-uppercase fs-3"> {tarea.titulo_tarea} </h6>
        </div>
        {/* Options */}
        {/* <div className="d-flex flex-row p-2 mt-4 flex-wrap justify-content-between"></div> */}

        {/* Content */}
        <div className="py-4 mt-4">
          <div ref={(node) => (textRef.current = node)} className="lh-base" style={{ textAlign: "justify" }}></div>
          {materialTarea.length === 0 ? (
            <>
              <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "74vh" }}>
                <RiFileForbidLine className="fs-1 mb-2" />
                <p className="fs-4">No hay material subido aún</p>
              </div>
            </>
          ) : (
            <>
              <ol className="list-group list-group-numbered mt-5">
                {materialTarea.map((material) => {
                  return (
                    <li className="list-group-item d-flex align-items-center">
                      <div className="">
                        <p className="m-0 ms-5">
                          {material.apellido}, {material.nombre}
                        </p>
                      </div>
                      <div className="ms-auto">Fecha de entrega: {material.fecha_entrega}</div>
                      <div className="ms-auto w-25 d-flex justify-content-around">
                        <a download href={material.url_material} target="__blank" rel="noreferrer" type="button" className="btn btn__blue">
                          <AiOutlineDownload className="mb-1 fs-4" />
                        </a>
                        <button onClick={() => eliminarMaterial(material.id_material_tarea + "")} className="btn btn-danger">
                          <FaTimes className="mb-1 fs-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tareas;
