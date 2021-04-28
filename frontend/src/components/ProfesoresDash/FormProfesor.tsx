import React, { useState, useEffect, FormEvent } from "react";
import Navigation from "../../pages/DashBoard/Navigation";
import { Profesor } from "./Profesor";
import { useParams, useHistory } from "react-router-dom";
import * as profesorServices from "./ProfesoresServices";
import { toast } from "react-toastify";
interface Params {
  id?: string;
}
const FormProfesor = () => {
  const history = useHistory();
  const params = useParams<Params>();
  const initialState = {
    nombre: "",
    apellido: "",
    email: "",
    profesion: "",
    pais: "",
  };

  const [profesor, setProfesor] = useState<Profesor>(initialState);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfesor({ ...profesor, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      await profesorServices.crearProfesor(profesor);
      setProfesor(initialState);
      toast.success("Profesor creado");
    } else {
      const res = await profesorServices.updateProfesor(params.id, profesor);
      console.log(res);
      toast.success("Profesor modificado");
    }
    history.push("/Dashboard/Profesores");
  };

  const getProfesor = async (id: string) => {
    const res = await profesorServices.getProfesorById(id);
    const { nombre, apellido, email, profesion, pais } = res.data;
    setProfesor({ nombre, apellido, email, profesion, pais });
  };

  useEffect(() => {
    if (params.id) getProfesor(params.id);
  }, [params.id]);

  return (
    <React.Fragment>
      <Navigation />
      <div className="contenido-principal p-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <input
                    onChange={handleInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    required
                    value={profesor.nombre}
                  />
                </div>
                <div className="mb-3">
                  <input
                    onChange={handleInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Apellidos"
                    name="apellido"
                    required
                    value={profesor.apellido}
                  />
                </div>
                <div className="mb-3">
                  <input
                    onChange={handleInputChange}
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={profesor.email}
                  />
                </div>
                <div className="mb-3">
                  <input
                    onChange={handleInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Pais"
                    name="pais"
                    required
                    value={profesor.pais}
                  />
                </div>
                <div className="mb-3">
                  <input
                    onChange={handleInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Profesión"
                    name="profesion"
                    required
                    value={profesor.profesion}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    required
                  />
                </div>
                <div className="mb-3">
                  {params.id ? (
                    <button className="btn btn-info">Actualizar</button>
                  ) : (
                    <button className="btn btn-primary">Crear</button>
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
