import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Helpers/NavBar';
import Footer from '../components/Helpers/Footer';

import Badge from '../components/Helpers/Badge';

import { useUsuario } from "../context-user/UsuarioProvider";
import CardCursosPerfil from './../components/Perfil/CardCursosPerfil';
import { toast } from 'react-toastify';
const Perfil = () => {
    const { usuario } = useUsuario();
    return (
        <React.Fragment>
            <NavBar />

            <Badge name="Perfil" />

            <div className="Main__container">
                <div className="container bg-light mt-5" style={{ marginBottom: "4.5rem" }}>
                    <div className="row p-5 justify-content-center">
                        <div className="col-lg-2 col-md-3">
                            {/* <img src={usuario.url_foto_usuario} alt="foto" className="BadgesListItem__avatar me-5" /> */}
                            <img src="https://picsum.photos/200/300" alt="foto" className="BadgesListItem__avatar me-5" />
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-12 d-flex">
                                    {/* <span className="fs-2">{`${usuario.nombre}  ${usuario.apellido}`}</span> */}
                                    <span className="fs-2">Joseph Francisco De La Cruz Rivas</span>
                                    <figure>
                                        <img src="https://static.platzi.com/media/flags/PE.png" alt="pais" height="18" className="img__pais" />
                                    </figure>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <Link className="btn btn-editPerfil" to="/edit">Editar perfil</Link>
                            </div>
                        </div>
                    </div>
                    <div className="content__Card-Perfil">
                        <div className="row pb-5">
                            <div className="col-12">
                                <CardCursosPerfil />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Perfil;