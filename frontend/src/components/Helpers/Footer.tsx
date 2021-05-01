import React from "react";

import {Link} from 'react-router-dom';
import logo from "../../images/logoFamir.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlinePhone } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer p-4 p-md-5 p-lg-5 row">
      {/* Primera Fila */}
      <div className="col-12 col-md-6 col-lg-3 my-4 my-md-2 my-lg-3 footer-section">
        <div className="img-logo mx-auhref mb-5">
          <a href="/" className="text-decoration-none">
            <img
              className="img-fluid sombra-blanca"
              src={logo}
              alt="Logo Famir Centro"
            />
          </a>
        </div>
        <p className="footer-text text-white-50 mt-5 mt-md-4 mt-lg-3 lh-lg pe-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, Lorem
          ipsum dolor sit amet consectetur adipisicing elit. A, Lorem ipsum
          dolor sit amet consectetur adipisicing elit. A, recusandae.
        </p>
        <ul className="footer-social-list d-flex">
          <li className="footer-social-list-item mx-2 fs-3">
            <a href="https://facebook.com" className="text-decoration-none">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
          <li className="footer-social-list-item mx-2 fs-3">
            <a href="https://instagram.com" className="text-decoration-none">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li className="footer-social-list-item mx-2 fs-3">
            <a href="https://whatsapp.com" className="text-decoration-none">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </li>
        </ul>
      </div>
      {/* Segunda Fila */}
      <div className="col-12 col-md-6 col-lg-3 my-4 my-md-2 my-lg-3 footer-section">
        <h6 className="footer-subtitle text-white fs-5 text-uppercase">
          ENLACES
        </h6>
        <ul className="footer-as-list ftr__list">
          <li className="footer-as-list-item my-3 my-md-2 my-lg-4">
            <Link className="text-white-50 text-decoration-none" to="/">
              Inicio
            </Link>
          </li>
          <li className="footer-as-list-item my-3 my-md-2 my-lg-4">
            <Link className="text-white-50 text-decoration-none" to="/Nosotros">
              Nosotros
            </Link>
          </li>
          <li className="footer-as-list-item my-3 my-md-2 my-lg-4">
            <Link
              className="text-white-50 text-decoration-none"
              to="/Contactanos"
            >
              Contáctanos
            </Link>
          </li>
          <li className="footer-as-list-item my-3 my-md-2 my-lg-4">
            <Link className="text-white-50 text-decoration-none" to="/Programa">
              Programa
            </Link>
          </li>
        </ul>
      </div>
      {/* Tercera Fila */}
      <div className="col-12 col-md-6 col-lg-3 my-4 my-md-2 my-lg-3 footer-section">
        <h6 className="footer-subtitle text-white text-uppercase">Cursos</h6>
        <div className="row px-2">
          <div className="col-4 col-sm-3 col-md-3 col-lg-3 my-3 my-md-2 my-lg-1">
            <img
              className="img-fluid img-thumbnail"
              src={logo}
              alt="Logo Famir Centro"
            />
          </div>
          <div className="col-4 col-sm-3 col-md-3 col-lg-3 my-3 my-md-2 my-lg-1">
            <img
              className="img-fluid img-thumbnail"
              src={logo}
              alt="Logo Famir Centro"
            />
          </div>
          <div className="col-4 col-sm-3 col-md-3 col-lg-3 my-3 my-md-2 my-lg-1">
            <img
              className="img-fluid img-thumbnail"
              src={logo}
              alt="Logo Famir Centro"
            />
          </div>
          <div className="col-4 col-sm-3 col-md-3 col-lg-3 my-3 my-md-2 my-lg-1">
            <img
              className="img-fluid img-thumbnail"
              src={logo}
              alt="Logo Famir Centro"
            />
          </div>
        </div>
      </div>
      {/* Cuarta Fila */}
      <div className="col-12 col-md-6 col-lg-3 my-4 my-lg-3 my-md-2 footer-section">
        <h6 className="footer-subtitle text-white text-uppercase">CONTACT</h6>
        <div className="footer-contact">
          <p className="text-white-50 d-flex justify-content-start align-items-center">
            <IoLocationOutline className="mx-2 fs-4" />
            4127/ 5B-C Mislane Road, Gibraltar, UK
          </p>
        </div>
        <div className="footer-contact">
          <p className="text-white-50 d-flex justify-content-start align-items-center">
            <AiOutlinePhone className="mx-2 fs-4" />
            Main: 203-808-8613
            <br />
            Office: 203-808-8648
          </p>
        </div>
        <div className="footer-contact">
          <p className="text-white-50 d-flex justify-content-start align-items-center">
            <FontAwesomeIcon className="mx-2 fs-5" icon={faEnvelopeOpenText} />
            office@yourbusiness.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
