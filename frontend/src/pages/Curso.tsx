import React from 'react';

import Footer from '../components/Helpers/Footer';
import NavBar from '../components/Helpers/NavBar';
import curso from '../images/bg-2.jpg';

class Curso extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="container__curso">
                    <div className="content__row">
                        <div className="column-detail">
                            <div className="row">
                                <h3 className="fw-bold">Javascript desde cero</h3>
                            </div>
                            <div className="row">
                                <span>Domina las bases del único lenguaje que te da la oportunidad de trabajar del lado del cliente y del lado del servidor.</span>
                            </div>
                            <div className="row mt-5">
                                <span>Docente: Rosa Abel Diaz Espinoza</span>
                                <span className="mt-2">Duración: +7 horas</span>
                                <span className="mt-2">Calificación: 4.8</span>
                            </div>
                            <div className="row mt-5">
                                <button type="button" className="btn btn-info btn-width btn-space">Añadir favorito</button>
                                <button type="button" className="btn btn-outline-primary btn-width">Comprar curso</button>
                            </div>
                        </div>
                        <div className="my-auto">
                            <img src={curso} className="img-fluid ancho-img" alt={`Curso`} />
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Curso;