import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import AboutUs from './../pages/AboutUs';
import NotFound from './../pages/NotFound';
import Layout from './Layout';
import Home from './../pages/Home';
import Contact from './../pages/Contactanos';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/Nosotros" component={AboutUs} />
                    <Route exact path="/Contactanos" component={Contact} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;