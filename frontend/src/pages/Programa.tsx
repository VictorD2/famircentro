import React from 'react';

import NavBar from '../components/Helpers/NavBar';
import CardCursos from '../components/Cursos/CardCursos';
import Badge from '../components/Helpers/Badge';

import tea1 from '../images/tea1.jpg';
import tea2 from '../images/tea2.jpg';
import tea3 from '../images/tea3.jpg';
import tea4 from '../images/tea4.jpg';
import Footer from '../components/Helpers/Footer';

import ScrollReveal from "scrollreveal";
class Programa extends React.Component {
    componentDidMount() {
        //Para los efectos de aparicion
        const config = {
            duration: 1000,
            delay: 150,
            easing: 'ease',
        };
        ScrollReveal().reveal(".show", config);
    }
    render() {
        return (
            <React.Fragment>
                <NavBar />

                <Badge name="Programa" />

                <div className="Main__container">
                    <div className="container text-center mt-5" style={{ marginBottom: "4.5rem" }}>
                        <div className="row">
                            <span className="fw-light fs-6 text-secondary show">CURSOS</span><br />
                            <h3 className="fw-bold fs-1 mt-3 show">Asincronos</h3>
                        </div>
                        <div className="row mt-5" style={{ marginTop: "4.5rem" }}>
                            <CardCursos img={tea1} curso="Modelado de Procesos de Negocios" />
                            <CardCursos img={tea2} curso="Sistemas de Información" />
                            <CardCursos img={tea3} curso="Redes de Computadoras" />
                            <CardCursos img={tea4} curso="Machine Learning" />
                        </div>
                        <div className="row mt-5">
                            <span className="fw-light fs-6 text-secondary show">CURSOS</span><br />
                            <h3 className="fw-bold fs-1 mt-3 show">Sincronos</h3>
                        </div>
                        <div className="row mt-5" style={{ marginTop: "4.5rem" }}>
                            <CardCursos img={tea1} curso="Seguridad Informatica" />
                            <CardCursos img={tea2} curso="Fundamentos de Programación" />
                            <CardCursos img={tea3} curso="Arquitectura de Redes" />
                            <CardCursos img={tea4} curso="Sistemas Operativos" />
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Programa;