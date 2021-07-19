/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

//components
import Navigation from "../../pages/DashBoard/Navigation";

//Services
import * as cursoServices from "./CursosServices";
import * as profesoresServices from "../../components/ProfesoresDash/ProfesoresServices";
import * as comprobanteServices from "../../components/Compobantes/ComprobanteServices";

//Imagenes
// import fotoSinCurso from '../../images/sinCurso.png';

//Interfaces
import { Curso } from "./Curso";
import { Profesor } from "../ProfesoresDash/Profesor";
import { Estudiante } from "../EstudiantesDash/Estudiante";

//Icons
import { GiTeacher } from "react-icons/gi";
import { CgMail } from "react-icons/cg";
import { FaDollarSign, FaCalendarAlt, FaCheck, FaTimes, FaRegImage, FaPhoneAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FiClock } from "react-icons/fi";

const initialState: Curso = {
  nombre_curso: "",
  descripcion: "",
  precio: 0,
  duracion: 0,
  horario: "",
  enlace: "",
  id_usuario: 0,
  url_foto_curso: "",
};
const initialStateProfesor: Profesor = {
  nombre: "",
  apellido: "",
  correo: "",
  profesion: "",
  id_pais_nacimiento: "AF",
  id_pais_residencia: "AF",
  rut: "",
  telefono: "",
};
interface Params {
  idCurso: string;
  modalidad: string;
  tipo: string;
}
const VerCurso = () => {
  const params = useParams<Params>();

  const history = useHistory();

  const modalidades = ["Sincronicos", "Asincronicos", "Talleres", "Cursos"];

  const [tipo, setTipo] = useState<string>("");
  const [modalidad, setModalidad] = useState<string>("");

  const [curso, setCurso] = useState<Curso>(initialState);
  const [profesor, setProfesor] = useState<Profesor>(initialStateProfesor);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [inscritos, setInscritos] = useState<number>(0);

  const refDescripcion = useRef<HTMLParagraphElement | null>();

  useEffect(() => {
    if (!modalidades.includes(params.modalidad) || !modalidades.includes(params.tipo)) return history.push("/Dashboard"); //Validando ruta
    params.modalidad === "Asincronicos" ? setModalidad("Asincrónico") : setModalidad("Sincrónico");
    params.tipo === "Talleres" ? setTipo("Taller") : setTipo("Curso");
    cargarCurso();
    return () => {
      setCurso(initialState);
      setProfesor(initialStateProfesor);
      setEstudiantes([]);
    };
  }, []);

  const cargarCurso = async () => {
    const res = await cursoServices.getCursoById(params.idCurso);
    // if (params.modalidad === "Sincronicos") {
    const resCount = await comprobanteServices.getCountUsuarioCursoByCursoId(params.idCurso);
    setInscritos(resCount.data);
    // }
    if (res.data.error) return history.push("/Dashboard");

    const newDescripcion = res.data.descripcion.replace(/\n/g, "<br/>");
    res.data.descripcion = newDescripcion;

    if (refDescripcion.current) refDescripcion.current.innerHTML = res.data.descripcion;

    setCurso(res.data);

    const resProfesor = await profesoresServices.getProfesorById(res.data.id_usuario);
    setProfesor(resProfesor.data);

    const resEstudiante = await comprobanteServices.getUsuarioCursoByIdCurso(res.data.id_curso);
    setEstudiantes(resEstudiante.data);
  };

  return (
    <React.Fragment>
      <Navigation />
      <div className="contenido-principal p-4">
        <div className="d-flex efecto_titulo">
          <FontAwesomeIcon className="me-3 fs-3" icon={faBars} />
          <h4 className="text-uppercase">
            {tipo} {modalidad} {curso.nombre_curso}
          </h4>
        </div>
        <div className="row mt-4">
          <div className="col-12 col-sm-6 text-center">
            <img src={curso.url_foto_curso} className="img-fluid" alt="" />
          </div>
          <div className="col-12 col-sm-6">
            <div className="d-flex align-items-center mb-3">
              <p className="m-0 card-text fw-bold">
                <GiTeacher className="mb-1" /> Docente:{" "}
              </p>
              <p className="m-0 ms-2 fw-normal">
                {profesor.nombre} {profesor.apellido}
              </p>
            </div>
            <div className="d-flex align-items-center mb-3">
              <p className="m-0 card-text fw-bold">
                <FaDollarSign className="mb-1" /> Precio:{" "}
              </p>
              <p className="m-0 ms-2 fw-normal">{curso.precio}</p>
            </div>
            {params.modalidad === "Sincronicos" ? (
              <>
                <div className="d-flex align-items-center mb-3">
                  <p className="m-0 card-text fw-bold">Enlace: </p>
                  <a href={curso.enlace} className="m-0 ms-2 fw-normal text-decoration-none" target="_BLANK" rel="noreferrer">
                    {curso.enlace}
                  </a>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <p className="m-0 card-text fw-bold">Capacidad: </p>
                  <p className="m-0 ms-2 fw-normal">{curso.capacidad} estudiantes</p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <p className="m-0 card-text fw-bold">Cantidad de estudiantes inscritos: </p>
                  <p className="m-0 ms-2 fw-normal">{inscritos} estudiantes</p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <p className="m-0 card-text fw-bold">
                    <FiClock className="mb-1" /> Duración:{" "}
                  </p>
                  <p className="m-0 ms-2 fw-normal">{curso.duracion} horas</p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <p className="m-0 card-text fw-bold">
                    <FaCalendarAlt className="mb-1" /> Horario:{" "}
                  </p>
                  <p className="m-0 ms-2 fw-normal">{curso.horario}</p>
                </div>
              </>
            ) : (
              <></>
            )}
            <p className="card-text">Habilitado : {curso.habilitado === 1 ? <FaCheck className="text-success mb-1 ms-1" /> : <FaTimes className="text-danger mb-1 ms-1" />}</p>
          </div>
          <div className="col-12 col-sm-12 mt-3">
            <p className="m-0 card-text fw-bold text-uppercase">Descripción: </p>
            <p ref={(node) => (refDescripcion.current = node)} style={{ textAlign: "justify" }}></p>
          </div>

          <div className="col-12 col-sm-12 mt-3">
            <p className="m-0 card-text fw-bold text-uppercase">Lista de Estudiantes Inscritos: </p>
            <table className="table table-light-gray table-bordered table-hover table-responsive mt-3">
              <thead>
                <tr>
                  <th>
                    <FaRegImage /> Foto
                  </th>
                  <th>Nombre del Estudiante</th>
                  <th>
                    <CgMail /> Correo Electrónico
                  </th>
                  <th>
                    <FaPhoneAlt /> Número de Teléfono
                  </th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.length === 0 ? (
                  <>
                    <tr>
                      <td>No hay estudiantes inscritos aún</td>
                    </tr>
                  </>
                ) : (
                  <>
                    {estudiantes.map((estudiante) => {
                      return (
                        <tr>
                          <td style={{ width: "100px", height: "100%" }}>
                            <img alt="Foto Perfil" className="img-fluid" src={estudiante.url_foto_usuario} />
                          </td>
                          <td className="py-auto">
                            {estudiante.nombre} {estudiante.apellido}
                          </td>
                          <td className="py-auto">{estudiante.correo}</td>
                          <td className="py-auto">{estudiante.telefono}</td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VerCurso;
