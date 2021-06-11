import axios from "axios";
import { Comentario } from "./Comentario";
const api = "http://localhost:4000/api/comentarios";


export const getAll = async (idCurso: string, idTema?: string) => {
    return await axios.get(`${api}/${idCurso}/${idTema}`);
};
export const crearComentario = async (comentario: Comentario, idCurso: string, idTema: string) => {
    comentario.id_tema = parseInt(idTema);
    comentario.id_curso = parseInt(idCurso);
    return await axios.post(`${api}/${idCurso}/${idTema}`, comentario);
};
export const eliminarProfesor = async (id: string | undefined) => {
    return await axios.delete(`${api}/${id}`);
};
