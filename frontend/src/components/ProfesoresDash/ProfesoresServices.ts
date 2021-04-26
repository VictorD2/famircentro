import axios from "axios";
import { Profesor } from "./Profesor";

export const getAll = async () => {
  return await axios.get<Profesor[]>("http://localhost:4000/api/profesores");
};
export const getProfesorById = async (id:string) => {
  return await axios.get<Profesor>(`http://localhost:4000/api/profesores/${id}`);
};
export const crearProfesor = async (profesor: Profesor) => {
  return await axios.post("http://localhost:4000/api/profesores", profesor);
};
export const updateProfesor = async (id:string,profesor: Profesor) => {
  return await axios.put(`http://localhost:4000/api/profesores/${id}`, profesor);
};
export const eliminarProfesor = async(id:string) => {
    return await axios.delete(`http://localhost:4000/api/profesores/${id}`)
};
