import { MaterialClase } from "./MaterialClase";

export interface Modulo {
    id_modulo?: number;
    titulo?: string;
    id_curso?: number;
    material_clase:MaterialClase[];
}