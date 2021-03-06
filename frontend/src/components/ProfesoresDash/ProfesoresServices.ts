import axios from "axios";
import { Profesor } from "./Profesor";
import {API} from '../../config/config';
const api = `${API}/api/v0/profesores`;

export const getAll = async (page: number, keyword: string) => {
  if (page === 0) return await axios.get(`${api}`);
  if (keyword.trim() !== "") return await axios.get(`${api}?keyword=${keyword}&page=${page}`);
  return await axios.get(`${api}?page=${page}`);
};
export const getCount = async (keyword: string) => {
  if (keyword.trim() === "") return await axios.get(`${api}/count`);
  return await axios.get(`${api}/count?keyword=${keyword}`);
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
