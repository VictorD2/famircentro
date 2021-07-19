export interface Profesor {
  id_usuario?: number;
  nombre?: string;
  apellido?: string;
  correo?: string;
  profesion?: string;
  telefono?: string;
  rut?: string;
  url_foto_usuario?: string;
  habilitado_u?: number;
  id_pais_nacimiento?: string;
  id_pais_residencia?: string;
  nombre_pais_nacimiento?: string;
  nombre_pais_residencia?: string;
  url_foto_nacimiento?:string;
  url_foto_residencia?:string;
}
