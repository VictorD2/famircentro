import axios from "axios";
import { Tema } from "./Tema";
const api = "http://localhost:4000/api/tema";


// CREAR
export const crearTema = async (tema: Tema) => {
  return await axios.post(`${api}`, tema);
};

export const eliminarCurso = async (id: string | undefined) => {
  return await axios.delete(`${api}/${id}`);
};
