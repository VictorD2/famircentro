import axios from "axios";
const api = "http://localhost:4000/api/estudiantes";

export const getAll = async () => {
  return await axios.get(`${api}`);
};
export const getEstudianteById = async (id: string) => {
  return await axios.get(`${api}/${id}`);
};
export const eliminarEstudiante = async (id: string | undefined) => {
  return await axios.delete(`${api}/${id}`);
};
