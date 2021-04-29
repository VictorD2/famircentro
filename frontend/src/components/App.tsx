import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UsuarioProvider } from "./../context-user/UsuarioProvider";

import AboutUs from "./../pages/AboutUs";
import NotFound from "./../pages/NotFound";
import Home from "./../pages/Home";
import Contact from "./../pages/Contactanos";
import Register from "./../pages/Register";
import Login from "./../pages/Login";
import Programa from "./../pages/Programa";
import PageLoading from "./PageLoading";
import Perfil from './../pages/Perfil';
import DashBoard from "../pages/DashBoard/DashBoard";
import Usuarios from "./UsuariosDash/Usuarios";
import Profesores from "./ProfesoresDash/Profesores";
import FormProfesor from "./ProfesoresDash/FormProfesor";
import LogRoute from './ProtectedRoutes/LogRoute';
import NoLogRoute from './ProtectedRoutes/NoLogRoute';
import AdminRoute from './ProtectedRoutes/AdminRoute';

import { useUsuario } from "../context-user/UsuarioProvider";
function App() {
  const [loading, setLoading] = useState(false);
  const {usuario} = useUsuario();
  useEffect(() => {
    setLoading(true);
    window.onload = () => {
      setLoading(false);
    };
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <PageLoading />
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          {/* Dashboard */}
          <LogRoute isSignedIn={usuario.authenticate} component={Perfil} exact path="/perfil" />
          <AdminRoute isSignedIn={usuario.authenticate} rango={usuario.Rango} exact path="/DashBoard" component={DashBoard} />
          {/* Usuarios */}
          <AdminRoute isSignedIn={usuario.authenticate} rango={usuario.Rango} exact path="/DashBoard/Usuarios" component={Usuarios} />
          {/* Profesores */}
          <AdminRoute isSignedIn={usuario.authenticate} rango={usuario.Rango} exact path="/DashBoard/Profesores" component={Profesores} />
          <AdminRoute isSignedIn={usuario.authenticate} rango={usuario.Rango} exact path="/DashBoard/Profesores/nuevo" component={FormProfesor} />
          <AdminRoute isSignedIn={usuario.authenticate} rango={usuario.Rango} exact path="/DashBoard/Profesores/update/:id" component={FormProfesor} />

          {/* Vistas */}
          <NoLogRoute isSignedIn={usuario.authenticate} component={Login} exact path="/Login"  />
          <NoLogRoute isSignedIn={usuario.authenticate} component={Register} exact path="/Register"  />
          <Route exact path="/Programa" component={Programa} />
          <Route exact path="/Nosotros" component={AboutUs} />
          <Route exact path="/Contactanos" component={Contact} />
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
