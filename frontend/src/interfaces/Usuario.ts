export default interface Usuario {
  id_usuario: string;
  id_pais_nacimiento?: string;
  id_pais_residencia?: string;
  nombre?: string;
  apellido?: string;
  profesion?: string;
  correo?: string;
  telefono?: string;
  habilitado_u?: number;
  rut?: string;
  id_rango?: number;
  url_foto_usuario?: string;
  url_foto_residencia?:string;
  url_foto_nacimiento?:string;
  authenticate?: boolean;
}
