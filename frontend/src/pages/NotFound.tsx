import React from 'react';
import Footer from '../components/Helpers/Footer';
import NavBar from '../components/Helpers/NavBar';

class NotFound extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <h1>404: Not Found</h1>
                <Footer />
            </React.Fragment>
        );
    }
}

export default NotFound;