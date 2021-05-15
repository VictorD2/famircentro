import axios from "axios";
import { Modulo } from "./Modulo";
const api = "http://localhost:4000/api/modulos";


export const crearModulo = async (modulo: Modulo, id: string) => {
    modulo.id_curso = id;
    return await axios.post(`${api}`, modulo);
}
export const actualizarModulo = async (modulo: Modulo) => {
    return await axios.put(`${api}`, modulo);
}

export const eliminarModulo = async (modulo: Modulo) => {
    return await axios.delete(`${api}/${modulo.id_modulo}`);
}