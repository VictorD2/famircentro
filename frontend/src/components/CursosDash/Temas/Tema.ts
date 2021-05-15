import { MaterialClase } from "../MaterialClase/MaterialClase";

export interface Tema {
    id_tema?: number;
    titulo: string;
    descripcion: string;
    url_video?: string;
    video:File[];
    material:File[];
    material_clase?: MaterialClase[];
}