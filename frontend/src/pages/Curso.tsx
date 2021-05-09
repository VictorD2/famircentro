import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Helpers/Footer';
import NavBar from '../components/Helpers/NavBar';
import { GiTeacher } from "react-icons/gi";
import { FiClock } from "react-icons/fi";
import { BsStar } from "react-icons/bs";
import { GrShop, GrFavorite } from "react-icons/gr";
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
                                <div className="d-flex align-items-center">
                                    <GiTeacher className="me-2" /><span>Docente: Rosa Abel Diaz Espinoza</span>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <FiClock className="me-2" /><span className="me-1">Duración: +7 horas</span><Link className="text-decoration-none" to="#temario">(Ver temario)</Link>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <BsStar className="me-2" /><span className="me-1">Calificación: 4.8</span><Link className="text-decoration-none" to="#temario">(Ver 439 opiniones)</Link>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <Link to="/Perfil" className="btn btn__curso btn-width btn-space d-flex justify-content-center align-items-center">
                                    <GrFavorite className="me-2" />Añadir favorito
                                </Link>
                                <Link to="/comprar" className="btn btn-outline-warning btn-width d-flex justify-content-center align-items-center">
                                    <GrShop className="me-2 text-danger" />Comprar curso
                                </Link>
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