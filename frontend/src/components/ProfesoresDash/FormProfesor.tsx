import React, { useState, useEffect, FormEvent } from "react";

import { Profesor } from "./Profesor";

import { useParams } from "react-router-dom";

import Navigation from "../../pages/DashBoard/Navigation";

import * as profesorServices from "./ProfesoresServices";

//Icons
import { FaRegEdit, FaPlus } from 'react-icons/fa';

//Toast
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css/animate.min.css';

interface Params {
  id?: string;
}

const FormProfesor = () => {
  const initialState = {
    nombre: "",
    apellido: "",
    correo: "",
    profesion: "",
    id_pais: "1",
    rut: "",
    telefono: ""
  };
  const [profesor, setProfesor] = useState<Profesor>(initialState);

  const params = useParams<Params>();

  //Traer los datos del profesor si estça en update
  const getProfesor = async (id: string) => {
    const res = await profesorServices.getProfesorById(id);
    if (res.data.message === "failed") window.location.href = '/Dashboard/Profesores';
    setProfesor(res.data);
  };

  const limpieza = () => {
    setProfesor({});
  }

  useEffect(() => {
    if (params.id) {//Por si estoy en update
      getProfesor(params.id);
    }
    return () => {
      limpieza();
    }
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfesor({ ...profesor, [e.target.name]: e.target.value });
  };

  //Evento submit
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      const res = await profesorServices.crearProfesor(profesor);
      if (res.data.message === 'already exists') toast.error("Ya existe un usuario con ese correo");
      if (res.data.message === "success") toast.success("Profesor creado");
      if (res.data.message === "failed") toast.error("Ocurrió un error");
      return;
    }
    const res = await profesorServices.updateProfesor(params.id, profesor);
    if (res.data.message === 'already exists') toast.error("Ya existe un usuario con ese correo");
    if (res.data.message === "success") toast.success("Profesor actualizado");
    if (res.data.message === "failed") toast.error("Ocurrió un error");
  };


  return (
    <React.Fragment>
      <Navigation />
      <ToastContainer />
      <div className="contenido-principal p-4">
        <div className="d-flex flex-row bg-white mb-5">
          {params.id ? (
            <h4 className="m-0 text-uppercase fs-3"><FaPlus className="fs-3 mb-1 " /> Actualizar Profesor</h4>
          ) : (
            <h4 className="m-0 text-uppercase fs-3"><FaPlus className="fs-3 mb-1 " /> Crear Profesor</h4>
          )}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <input onChange={handleInputChange} className="form-control" type="text" placeholder="Nombre" name="nombre" required value={profesor.nombre} />
                </div>
                <div className="mb-3">
                  <input onChange={handleInputChange} className="form-control" type="text" placeholder="Apellidos" name="apellido" required value={profesor.apellido} />
                </div>
                <div className="mb-3">
                  <input onChange={handleInputChange} className="form-control" type="email" placeholder="Email" name="correo" required value={profesor.correo} />
                </div>
                <div className="mb-3">
                  <select value={profesor.id_pais} onChange={handleInputChange} className="form-control" name="id_pais" >
                    <option value="1">Peru</option>
                    <option value="2">Chile</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input onChange={handleInputChange} className="form-control" type="text" placeholder="Profesión" name="profesion" required value={profesor.profesion} />
                </div>
                <div className="mb-3">
                  <input onChange={handleInputChange} className="form-control" type="text" placeholder="Telefono" name="telefono" required value={profesor.telefono} />
                </div>
                <div className="mb-3">
                  <input onChange={handleInputChange} className="form-control" type="text" placeholder="RUT" name="rut" required value={profesor.rut} />
                </div>
                <div className="mb-3">
                  {params.id ? (
                    <button className="btn btn__blue"> <FaRegEdit className="fs-5 mb-1" /> Actualizar </button>
                  ) : (
                    <button className="btn btn__blue"> <FaPlus className="fs-5 mb-1" /> Crear </button>
                  )}
                </div>
              </form>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </div>

    </React.Fragment>
  );
};

export default FormProfesor;
