import React, { useEffect, useState } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useUsuario, UsuarioProvider } from "./../context-user/UsuarioProvider";

import AboutUs from "./../pages/AboutUs";
import NotFound from "./../pages/NotFound";
import Home from "./../pages/Home";
import Contact from "../pages/Contacto/Contactanos";
import Register from "./../pages/Register";
import Login from "./../pages/Login";
import Programa from "./../pages/Programa";
import PageLoading from "./Helpers/PageLoading";
import Perfil from "./../pages/Perfil";
import DashBoard from "../pages/DashBoard/DashBoard";
import Usuarios from "./EstudiantesDash/Estudiantes";
import CursoFullPage from "../pages/Curso/CursoFullPage";
import Profesores from "./ProfesoresDash/Profesores";
import FormProfesor from "./ProfesoresDash/FormProfesor";

import AdminRoute from "./ProtectedRoutes/AdminRoute";
import LogRoute from "./ProtectedRoutes/LogRoute";
import NoLogRoute from "./ProtectedRoutes/NoLogRoute";

import Cursos from "./CursosDash/Cursos";
import FormCurso from "./CursosDash/FormCurso";
import MaterialCurso from "./CursosDash/MaterialCurso";
import TemaFullPage from "../pages/TemaFullPage";

import EditPerfil from "./../pages/EditPerfil";
import VerTema from "./CursosDash/Temas/VerTema";
import ComprarCurso from "../pages/ComprarCurso";
import Comprobantes from "./Compobantes/Comprobantes";
import VerCurso from "./CursosDash/VerCurso";
import ContactoDash from "../pages/Contacto/ContactoDash";

function App() {
  const { loadUser } = useUsuario();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    window.onload = () => setLoading(false);
  }, []);

  return (
    <BrowserRouter>
      {loading && loadUser ? (
        <PageLoading />
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />

          {/* Dashboard */}
          <LogRoute exact path="/Perfil" component={Perfil} />
          <LogRoute exact path="/Perfil/Editar" component={EditPerfil} />
          <AdminRoute exact path="/DashBoard" component={DashBoard} />

          {/* Usuarios */}
          <AdminRoute exact path="/DashBoard/Usuarios" component={Usuarios} />

          {/* Profesores */}
          <AdminRoute exact path="/DashBoard/Profesores" component={Profesores} />
          <AdminRoute exact path="/DashBoard/Profesores/nuevo" component={FormProfesor} />
          <AdminRoute exact path="/DashBoard/Profesores/update/:id" component={FormProfesor} />

          {/* Comprobantes */}
          <AdminRoute exact path="/DashBoard/Comprobantes" component={Comprobantes} />

          {/* Contactos */}
          <AdminRoute exact path="/DashBoard/Contacto" component={ContactoDash} />

          {/* Cursos */}
          <AdminRoute exact path="/DashBoard/:tipo/:modalidad/material/:id" component={MaterialCurso} />
          <AdminRoute exact path="/DashBoard/:tipo/:modalidad/material/:id/:idTema" component={VerTema} />
          <AdminRoute exact path="/DashBoard/:tipo/:modalidad/nuevo" component={FormCurso} />
          <AdminRoute exact path="/DashBoard/:tipo/:modalidad/update/:id" component={FormCurso} />
          <AdminRoute exact path="/DashBoard/:tipo/:modalidad" component={Cursos} />
          <AdminRoute exact path="/DashBoard/:tipo/:modalidad/:idCurso" component={VerCurso} />

          {/* Vistas */}
          <NoLogRoute exact component={Login} path="/Iniciar" />
          <NoLogRoute exact component={Register} path="/Registrarse" />
          <Route exact path="/Nosotros" component={AboutUs} />
          <Route exact path="/Contactanos" component={Contact} />
          <Route exact path="/Clases/:tipo/:modalidad" component={Programa} />
          <Route exact path="/Clase/:idCurso" component={CursoFullPage} />
          <Route exact path="/Clase/:idCurso/:idTema" component={TemaFullPage} />
          <Route exact path="/Comprar/:idCurso" component={ComprarCurso} />
          <Route component={NotFound} />
        </Switch>
      )}
    </BrowserRouter>
  );
}

const prev = () => (
  <UsuarioProvider>
    <App></App>
  </UsuarioProvider>
);
export default prev;
