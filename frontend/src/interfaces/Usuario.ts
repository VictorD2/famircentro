export default interface Usuario{
    id_usuario?: string,
    id_pais?: string,
    nombre?: string,
    apellido?: string,
    profesion?: string,
    correo?: string,
    telefono?: string,
    habilitado_u?: number,
    rut?: string,
    id_rango?:number,
    url_foto_usuario?: string,
    authenticate?: boolean,
}
