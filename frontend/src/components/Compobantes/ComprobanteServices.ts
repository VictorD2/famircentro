import axios from "axios";
import { Comprobante } from "./Comprobante";
const api = "http://localhost:4000/api/comprobante";
const api2 = "http://localhost:4000/api/usuariocurso";


export const getComprobantes = async () => {
    return await axios.get(`${api}`);
};

export const getComprobanteById = async (id?: number) => {
    return await axios.get(`${api}/${id}`);
};
// CREAR
export const crearComprobante = async (form: FormData, idCurso: string, idUsuario?: string) => {
    form.append('id_curso', idCurso);
    form.append('id_usuario', idUsuario + "");
    return await axios.post(`${api}`, form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
};
export const getUsuarioCursoByIdCurso = async (idCurso: string) => {
    return await axios.get(`${api2}/curso/${idCurso}`);
}
export const getUsuarioCursoByIdEstudiante = async (idEstudiante: string) => {
    return await axios.get(`${api2}/estudiante/${idEstudiante}`);
}
export const setFavorito = async (idCurso: string, idUsuario: string) => {
    return await axios.put(`${api2}/${idCurso}/${idUsuario}`);
}
export const eliminarComprobante = async (id: string) => {
    return await axios.delete(`${api}/${id}`);
};

export const crearInscripcion = async (inscripcion?: Comprobante) => {
    return await axios.post(`${api2}`, inscripcion);
};
