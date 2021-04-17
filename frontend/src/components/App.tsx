import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AboutUs from './../pages/AboutUs';
import NotFound from './../pages/NotFound';
import Home from './../pages/Home';
import Contact from './../pages/Contactanos';
import Register from './../pages/Register';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/Register" component={Register} />
                <Route exact path="/" component={Home} />
                <Route exact path="/Nosotros" component={AboutUs} />
                <Route exact path="/Contactanos" component={Contact} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;