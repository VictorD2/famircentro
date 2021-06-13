/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

//Iconos
import { FaTimes } from 'react-icons/fa'

//Services
import * as materialServices from './MaterialServices'

//Interfaces
import { MaterialClase } from './MaterialClase'

interface Props {
    material_clase: MaterialClase;
    setCountMaterial: (countMaterial: number) => void;
    countMaterial: number;
}
const MaterialClaseItem = (props: Props) => {

    const [material, setMaterial] = useState<MaterialClase>();

    useEffect(() => {
        setNombre(props.material_clase);
        return () => {
        }
    }, []);


    const setNombre = (material: MaterialClase) => {
        setMaterial(material);
        const nombre = material.url_material?.slice(18, material.url_material.length);
        setMaterial({ ...material, nombre: nombre })
    }

    const eliminarMaterial = async () => {
        const res = await materialServices.eliminarMaterial(props.material_clase.id_material_clase + "");
        if (res.data.success) props.setCountMaterial(props.countMaterial + 1);
    }


    return (
        <>
            <div className="d-flex my-1">
                <a download className="list-group-item list-group-item-action list-group-item-primary text-nowrap text-truncate" target="__blank" href={props.material_clase.url_material}>{material?.nombre}</a>
                <button onClick={() => eliminarMaterial()} className="btn btn-danger bg-gradient ms-1"><FaTimes className="fs-4" /></button>
            </div>
        </>
    )
}

export default MaterialClaseItem
