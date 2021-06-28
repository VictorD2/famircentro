import axios from "axios";
import { Contacto } from "./Contacto";
const api = "http://localhost:4000/api/contacto";

//OBTENER
export const getAllContactos = async (page:number) => {
    return await axios.get(`${api}/all/${page}`);
};
//OBTENER
export const getCount = async () => {
    return await axios.get(`${api}/count`);
};

//Por ID
export const getContactoById = async (id: string) => {
    return await axios.get(`${api}/${id}`);
};

export const deleteContacto = async (id: string) => {
    return await axios.delete(`${api}/${id}`);
};

//Por ID
export const createContacto = async (contacto: Contacto) => {
    return await axios.post(`${api}`, contacto);
};