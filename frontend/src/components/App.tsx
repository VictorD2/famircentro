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
import LogRoute from './ProtectedRoutes/LogRoute';
import NoLogRoute from './ProtectedRoutes/NoLogRoute';
import AdminRoute from './ProtectedRoutes/AdminRoute';

import FormEstudiante from "./EstudiantesDash/FormEstudiante";
function App() {
  const { usuario, loadUser } = useUsuario();
  console.log(usuario);
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
          <LogRoute authenticate={usuario.authenticate} component={Perfil} exact path="/perfil" />
          <AdminRoute rango={usuario.id_rango} authenticate={usuario.authenticate} exact path="/DashBoard" component={DashBoard} />

          {/* Usuarios */}
          <AdminRoute rango={usuario.id_rango} authenticate={usuario.authenticate} exact path="/DashBoard/Usuarios" component={Usuarios} />

          {/* Profesores */}
          <AdminRoute rango={usuario.id_rango} authenticate={usuario.authenticate} exact path="/DashBoard/Profesores" component={Profesores} />
          <AdminRoute rango={usuario.id_rango} authenticate={usuario.authenticate} exact path="/DashBoard/Profesores/nuevo" component={FormProfesor} />
          <AdminRoute rango={usuario.id_rango} authenticate={usuario.authenticate} exact path="/DashBoard/Profesores/update/:id" component={FormProfesor} />
          <AdminRoute rango={usuario.id_rango} authenticate={usuario.authenticate} exact path="/DashBoard/Estudiantes/update/:id" component={FormEstudiante} />

          {/* Vistas */}
          <NoLogRoute authenticate={usuario.authenticate} component={Login} exact path="/Login" />
          <NoLogRoute authenticate={usuario.authenticate} component={Register} exact path="/Register" />
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

export default function userPrev() {
  return (
    <UsuarioProvider>
      <App></App>
    </UsuarioProvider>
  );
}
