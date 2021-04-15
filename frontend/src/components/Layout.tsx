import React from 'react';
import Navbar from './NavBar';
import Footer from '../components/Footer';

function Layout(props: any) {
    return(
        <React.Fragment>
            <Navbar/>
            {props.children}
            <Footer />
        </React.Fragment>
    );
}

export default Layout;