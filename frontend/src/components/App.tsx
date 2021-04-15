import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import AboutUs from './../pages/AboutUs';
import NotFound from './../pages/NotFound';
import Layout from './Layout';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/Nosotros" component={AboutUs} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;