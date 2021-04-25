import React from 'react';
import MisCursos from './MisCursos';
import Favoritos from './Favoritos';

class CardPerfil extends React.Component {

    showInfoFirst() {
        document.getElementById('body-2')?.classList.add('d-none');
        document.getElementById('body-1')?.classList.remove('d-none');
        document.getElementById('btn-1')?.classList.add('active')
        document.getElementById('btn-2')?.classList.remove('active');
    }

    showInfoSecond() {
        document.getElementById('body-1')?.classList.add('d-none');
        document.getElementById('body-2')?.classList.remove('d-none');
        document.getElementById('btn-2')?.classList.add('active');
        document.getElementById('btn-1')?.classList.remove('active');
    }

    render() {
        return (
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-pills card-header-pills">
                        <li className="nav-item">
                            <button className="nav-link active" id="btn-1" onClick={this.showInfoFirst}>Mis Cursos</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" id="btn-2" onClick={this.showInfoSecond}>Cursos Favoritos</button>
                        </li>
                    </ul>
                </div>
                <div className="card-body" id="body-1">
                    <MisCursos />
                </div>
                <div className="card-body d-none" id="body-2">
                    <Favoritos />
                </div>
            </div>
        );
    }
}

export default CardPerfil;