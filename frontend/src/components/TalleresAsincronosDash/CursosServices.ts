import axios from "axios";
import { Curso } from "./Curso";
const api = "http://localhost:4000/api/cursos";

//OBTENER
export const getAllCursos = async (tipo: string, modalidad: string) => {
  return await axios.get(`${api}/all/${tipo}/${modalidad}`);
};

//Por ID
export const getCursoById = async (id: string) => {
  return await axios.get(`${api}/${id}`);
};

// CREAR
export const crearCurso = async (curso: Curso, tipo: string, modalidad: string) => {
  curso.tipo = tipo;
  curso.modalidad = modalidad;
  return await axios.post(`${api}`, curso);
};

export const updateCurso = async (id: string | undefined, curso: Curso) => {
  return await axios.put(`${api}/${id}`, curso);
};
export const eliminarCurso = async (id: string | undefined) => {
  return await axios.delete(`${api}/${id}`);
};
