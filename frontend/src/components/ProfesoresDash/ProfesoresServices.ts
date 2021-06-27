import axios from "axios";
import { Profesor } from "./Profesor";
const api = "http://localhost:4000/api/profesores";

export const getAll = async (page:number) => {
  return await axios.get(`${api}/all/${page}`);
};
export const getCount = async () => {
  return await axios.get(`${api}/count`);
};
export const getProfesorById = async (id: string) => {
  return await axios.get(`${api}/${id}`);
};
export const crearProfesor = async (profesor: Profesor) => {
  return await axios.post(`${api}`, profesor);
};
export const updateProfesor = async (id: string, profesor: Profesor) => {
  return await axios.put(`${api}/${id}`, profesor);
};
export const eliminarProfesor = async (id: string | undefined) => {
  return await axios.delete(`${api}/${id}`);
};
