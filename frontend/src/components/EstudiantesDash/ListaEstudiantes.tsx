import React, { useState, useEffect } from "react";

import * as estudianteServices from "./EstudianteService";
import { Estudiante } from "./Estudiante";
import EstudianteItem from "./EstudianteItem";
interface Props {
    funcion: (estudiante: Estudiante) => void;
    filtro: string;
}

const ListaEstudiantes = (props: Props) => {
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [loading, setLoading] = useState(false);
    //Traer datos de la bd
    const loadEstudiantes = async () => {
        const res = await estudianteServices.getAll();
        setEstudiantes(res.data);
        setLoading(true);
    };

    const limpieza = () => {
        setEstudiantes([]);
        setLoading(false);
    };
    //Cuando cargue
    useEffect(() => {
        loadEstudiantes();
        return () => {
            limpieza();
        };
    }, []);

    // Cargando
    if (!loading)
        return (
            <tr>
                <td>Cargando datos...</td>
            </tr>
        );
    // Sin Estudiantes
    if (estudiantes.length === 0)
        return (
            <tr>
                <td>No hay estudiantes registrados aún</td>
            </tr>
        );
    // Estudiantes
    return (
        <React.Fragment>
            {estudiantes.map((estudiante) => {
                if (props.filtro === "") return <EstudianteItem cargaDatos={loadEstudiantes} funcion={props.funcion} estudiante={estudiante} key={estudiante.id_usuario} />;
                if (props.filtro === estudiante.id_usuario?.toString()
                    || estudiante.nombre?.toLowerCase().search(props.filtro.toLowerCase()) !== -1
                    || estudiante.apellido?.toLowerCase().search(props.filtro.toLowerCase()) !== -1
                    || estudiante.correo?.toLowerCase().search(props.filtro.toLowerCase()) !== -1
                    || estudiante.nombre_pais?.toLowerCase().search(props.filtro.toLowerCase()) !== -1
                    || estudiante.profesion?.toLowerCase().search(props.filtro.toLowerCase()) !== -1
                    || estudiante.telefono?.toLowerCase().search(props.filtro.toLowerCase()) !== -1
                    || estudiante.rut?.toLowerCase().search(props.filtro.toLowerCase()) !== -1)
                    return <EstudianteItem cargaDatos={loadEstudiantes} funcion={props.funcion} estudiante={estudiante} key={estudiante.id_usuario} />;
                return <tr key={estudiante.id_usuario}></tr>
            })}
        </React.Fragment>
    )
};

export default ListaEstudiantes;
