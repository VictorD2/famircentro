import { MaterialClase } from "../MaterialClase/MaterialClase";
import { Tema } from "../Temas/Tema";

export interface Modulo {
    id_modulo?: number;
    titulo?: string;
    id_curso?: string;
    temas?:Tema[];
}