export default interface Usuario{
    id_usuario?: string,
    nombre?: string,
    apellido?: string,
    profesion?: string,
    correo?: string,
    telefono?: string,
    habilitado?: number,
    rut?: string,
    id_rango?:number,
    url_foto_usuario?: string,
    authenticate?: boolean,
}
