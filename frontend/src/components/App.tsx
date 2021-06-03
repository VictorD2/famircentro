import React, { useEffect, useState } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useUsuario, UsuarioProvider } from "./../context-user/UsuarioProvider";

import AboutUs from "./../pages/AboutUs";
import NotFound from "./../pages/NotFound";
import Home from "./../pages/Home";
import Contact from "./../pages/Contactanos";
import Register from "./../pages/Register";
import Login from "./../pages/Login";
import Programa from "./../pages/Programa";
import PageLoading from "./Helpers/PageLoading";
import Perfil from './../pages/Perfil';
import DashBoard from "../pages/DashBoard/DashBoard";
import Usuarios from "./EstudiantesDash/Estudiantes";
import Curso from './../pages/Curso';
import Profesores from "./ProfesoresDash/Profesores";
import FormProfesor from "./ProfesoresDash/FormProfesor";

import AdminRoute from './ProtectedRoutes/AdminRoute';
import LogRoute from './ProtectedRoutes/LogRoute';
import NoLogRoute from './ProtectedRoutes/NoLogRoute';

import FormEstudiante from "./EstudiantesDash/FormEstudiante";
import Cursos from "./CursosDash/Cursos";
import FormCurso from "./CursosDash/FormCurso";
import MaterialCurso from "./CursosDash/MaterialCurso";

import EditPerfil from './../pages/EditPerfil';
import VerTema from "./CursosDash/Temas/VerTema";
function App() {
  const { loadUser } = useUsuario();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    window.onload = () => setLoading(false);
  }, []);

  return (
    <BrowserRouter>
      {(loading && loadUser) ? (
        <PageLoading />
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />

          {/* Dashboard */}
          <LogRoute exact path="/perfil" component={Perfil} />
          <AdminRoute exact path="/DashBoard" component={DashBoard} />

          {/* Usuarios */}
          <AdminRoute exact path="/DashBoard/Usuarios" component={Usuarios} />

          {/* Profesores */}
          <AdminRoute exact path="/DashBoard/Profesores" component={Profesores} />
          <AdminRoute exact path="/DashBoard/Profesores/nuevo" component={FormProfesor} />
          <AdminRoute exact path="/DashBoard/Profesores/update/:id" component={FormProfesor} />
          <AdminRoute exact path="/DashBoard/Estudiantes/update/:id" component={FormEstudiante} />

          {/* Cursos */}
          <AdminRoute exact path="/DashBoard/:tipo/:modalidad" component={Cursos} />
          <AdminRoute exact path="/DashBoard/:tipo/:modalidad/material/:id" component={MaterialCurso} />
          <AdminRoute exact path="/DashBoard/:tipo/:modalidad/material/:id/:idTema" component={VerTema} />
          <AdminRoute exact path="/DashBoard/:tipo/:modalidad/nuevo" component={FormCurso} />
          <AdminRoute exact path="/DashBoard/:tipo/:modalidad/update/:id" component={FormCurso} />

          {/* Vistas */}
          <NoLogRoute exact component={Login} path="/Login" />
          <NoLogRoute exact component={Register} path="/Register" />
          <Route exact path="/edit" component={EditPerfil} />
          <Route exact path="/curso" component={Curso} />
          <Route exact path="/programa" component={Programa} />
          <Route exact path="/nosotros" component={AboutUs} />
          <Route exact path="/contactanos" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      )}
    </BrowserRouter>
  );
}

const prev = () => <UsuarioProvider><App></App></UsuarioProvider>
export default prev;

