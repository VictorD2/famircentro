import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AboutUs from "./../pages/AboutUs";
import NotFound from "./../pages/NotFound";
import Home from "./../pages/Home";
import Contact from "./../pages/Contactanos";
import Register from "./../pages/Register";
import Login from "./../pages/Login";

import { UsuarioProvider } from "../context-user/UsuarioProvider";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Nosotros" component={AboutUs} />
          <Route exact path="/Contactanos" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default () => (
  <UsuarioProvider>
    <App></App>
  </UsuarioProvider>
);
