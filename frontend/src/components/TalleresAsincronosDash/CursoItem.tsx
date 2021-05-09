import React from 'react'
import { Curso } from './Curso'
interface Props {
    curso: Curso;
    funcion: (curso: Curso) => void;
    cargaDatos: () => void;
}
const TallerAsincronoItem = (props: Props) => {
    return (
        <div>

        </div>
    )
}

export default TallerAsincronoItem
