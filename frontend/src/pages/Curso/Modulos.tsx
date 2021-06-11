/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FaLock, FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Modulo } from '../../components/CursosDash/Modulos/Modulo'
import * as moduloServices from '../../components/CursosDash/Modulos/ModuloService';
import { Tema } from '../../components/CursosDash/Temas/Tema';
interface Props {
    modulo: Modulo;
    verificacion: boolean;
}
const Modulos = (props: Props) => {
    const [temas, setTemas] = useState<Tema[]>([]);

    const getTemas = async () => {
        const res = await moduloServices.getTemasByModuloId(props.modulo.id_modulo + "");
        setTemas(res.data);
    }
    useEffect(() => {
        getTemas();
        return () => setTemas([]);
    }, [props.modulo])

    if (!props.verificacion) {//Quitar ! en produccion
        return (
            <div className="mt-5">
                <div className="fw-bold text-uppercase fs-5">
                    {props.modulo.titulo}
                </div>
                {temas.map(tema => {
                    return (
                        <Link key={tema.id_tema} className="text-decoration-none" to={`/Clase/${props.modulo.id_curso}/${tema.id_tema}`}>
                            <div className="btn__blue p-2 ps-3 mt-2 border rounded-pill" key={tema.id_tema}>
                                <FaPlay className="me-2 mb-1" /> {tema.titulo}
                            </div>
                        </Link>
                    )
                })}
            </div>
        )
    }
    return (
        <div className="mt-5">
            <div className="fw-bold text-uppercase fs-5">
                {props.modulo.titulo}
            </div>
            {temas.map(tema => {
                return (
                    <div key={tema.id_tema} className="btn__blue p-2 ps-3 mt-2 border rounded-pill" >
                        <FaLock className="me-2 mb-1" /> {tema.titulo}
                    </div>
                )
            })}
        </div>
    )

}

export default Modulos
