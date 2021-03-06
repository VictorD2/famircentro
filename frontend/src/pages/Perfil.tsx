/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
//Componentes
import NavBar from "../components/Helpers/NavBar";
import Footer from "../components/Helpers/Footer";
import Badge from "../components/Helpers/Badge";
import CardCursosPerfil from "./../components/Perfil/CardCursosPerfil";
import BotonPerfil from "../components/Perfil/BotonPerfil";

import { useUsuario } from "../context-user/UsuarioProvider";

const Perfil = () => {
  const { usuario } = useUsuario();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <NavBar />

      <Badge name="Perfil" />

      <div className="Main__container">
        <div className="container bg-light mt-5" style={{ marginBottom: "4.5rem" }}>
          <div className="row p-5 justify-content-center">
            <div className="col-lg-2 col-md-3">
              <img src={usuario.url_foto_usuario} alt="foto" className="BadgesListItem__avatar me-5" />
            </div>
            <div className="col-md-5">
              <div className="row">
                <div className="col-12 d-flex">
                  <span className="fs-2">{`${usuario.nombre}  ${usuario.apellido}`}</span>
                  <figure>
                    <img src={usuario.url_foto_nacimiento} alt="pais" className="img__pais" />
                  </figure>
                </div>
              </div>
              <div className="row mt-4">
                <BotonPerfil className="btn btn-editPerfil" name="Editar perfil" />
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
  );
};

export default Perfil;
