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
import PageLoading from "./Helpers/PageLoading";
import Perfil from './../pages/Perfil';
import DashBoard from "../pages/DashBoard/DashBoard";
import Usuarios from "./UsuariosDash/Usuarios";
import Curso from './../pages/Curso';

function App() {
  const [loading, setLoading] = useState(false);

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
          <Route exact path="/Perfil" component={Perfil} />
          <Route exact path="/Curso" component={Curso}/>
          <Route exact path="/DashBoard" component={DashBoard} />
          <Route exact path="/DashBoard/Usuarios" component={Usuarios} />
          <Route exact path="/Programa" component={Programa} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
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
