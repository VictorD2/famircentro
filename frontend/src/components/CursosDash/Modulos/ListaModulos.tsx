import React from 'react'
import { Tema } from '../Temas/Tema'
import { Modulo } from './Modulo'
import ModuloItem from './ModuloItem'
interface Props {
    modulos: Modulo[]
    load: (id: string) => void;
    setModulo: (modulo: Modulo) => void;
    setTema: (tema: Tema) => void;
    tema:Tema;
}
const ListaModulos = (props: Props) => {
    return (
        <React.Fragment>
            <div className="accordion" id="accordionPanelsStayOpenExample">
                {props.modulos.map(modulo => {
                    return <ModuloItem setModulo={props.setModulo} setTema={props.setTema} load={props.load} key={modulo.id_modulo} modulo={modulo} tema={props.tema} />
                })}
            </div>
        </React.Fragment>
    )
}

export default ListaModulos
