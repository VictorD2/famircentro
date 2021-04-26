import React from 'react';
import ListMisCursos from './ListMisCursos';

function CardItemPerfil() {
    return(
        <ul className="container content__items-Perfil">
            <ListMisCursos />
            <ListMisCursos />
            <ListMisCursos />
        </ul>
    );
}

export default CardItemPerfil;