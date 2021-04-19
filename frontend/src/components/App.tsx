import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

<<<<<<< HEAD
import AboutUs from './../pages/AboutUs';
import NotFound from './../pages/NotFound';
import Home from './../pages/Home';
import Contact from './../pages/Contactanos';
import Register from './../pages/Register';
import Login from './../pages/Login';

function App() {
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
=======
import AboutUs from "./../pages/AboutUs";
import NotFound from "./../pages/NotFound";
import Home from "./../pages/Home";
import Contact from "./../pages/Contactanos";
import Register from "./../pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/Register" component={Register} />
        <Route exact path="/" component={Home} />
        <Route exact path="/Nosotros" component={AboutUs} />
        <Route exact path="/Contactanos" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
>>>>>>> 697552f377e35ad03e4100351b1d6a936a5ef99b
}

export default App;
