import React from 'react';
import ListFavoritos from './ListFavoritos';

function Favoritos() {
    return(
        <ul className="container content__items-Perfil">
            <ListFavoritos />
            <ListFavoritos />
            <ListFavoritos />
        </ul>
    );
}

export default Favoritos;