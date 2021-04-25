import React from 'react';
import NavBar from '../components/NavBar';
import Footer from './../components/Footer';

import foto from '../images/t1.jpg';
import Badge from '../components/Badge';
import CardPerfil from '../components/CardCursosPerfil';

class Perfil extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />

                <Badge name="Perfil" />

                <div className="Main__container">
                    <div className="container bg-light mt-5" style={{ marginBottom: "4.5rem" }}>
                        <div className="row p-5 justify-content-center">
                            <div className="col-lg-2 col-md-3">
                                <img src={foto} alt="foto" className="BadgesListItem__avatar me-5" />
                            </div>
                            <div className="col-md-5">
                                <div className="row">
                                    <div className="col-12 d-flex">
                                        <span className="fs-2">Juliana Amel Ruiz Paz</span>
                                        <figure>
                                            <img src="https://static.platzi.com/media/flags/PE.png" alt="pais" height="18" className="img__pais" />
                                        </figure>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <a href="/Perfil/user/edir" className="btn btn__more" style={{padding: "0.5rem 1rem"}}>Editar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content__Card-Perfil">
                            <div className="row pb-5">
                                <div className="col-12">
                                    <CardPerfil />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Perfil;