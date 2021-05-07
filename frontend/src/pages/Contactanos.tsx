import { faBehance, faDribbble, faFacebookF, faLinkedinIn, faPinterest, faTwitter, } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Badge from "../components/Helpers/Badge";
import { faEnvelopeOpenText, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import FormContact from "../components/Helpers/FormContact";
import NavBar from "../components/Helpers/NavBar";
import Footer from "../components/Helpers/Footer";

import ScrollReveal from "scrollreveal";
class Contactanos extends React.Component {
    componentDidMount() {
        //Para los efectos de aparicion
        const config = {
            duration: 1000,
            delay: 150,
            easing: 'ease',
        };
        ScrollReveal().reveal(".show", config);
    }
    render() {
        return (
            <React.Fragment>
                <NavBar />

                <Badge name="Contáctanos" />

                <div className="Main__container">
                    <div className="container text-center mt-5">
                        <div className="row mt-5 cts__content show" style={{ marginBottom: "5rem" }}>
                            <div className="col-md-6 text-start">
                                <span className="fw-light fs-6 text-secondary">HOLA</span>
                                <br />
                                <h3 className="fw-bold fs-1 mt-3">Contáctanos</h3>
                                <p className="mt-4 lh-lg" style={{ fontSize: "0.875rem" }}>
                                    Lacinia, lacinia la cus non, fermen tum nisi. Donec et
                                    sollicitudin. Morbi vel arcu gravida, iaculis lacus vel,
                                    posuere ipsum. Sed faucibus mauris vitae urna consectetur, sit
                                    amet maximus nisl sagittis. Ut in iaculis enim, et pulvinar
                                    mauris.
                                </p>
                                <div className="content__icons show">
                                    <a href="https://www.pinterest.ca/" target="blank" className="cts__icons" >
                                        <FontAwesomeIcon icon={faPinterest} />
                                    </a>
                                    <a href="https://www.facebook.com/" target="blank" className="cts__icons" >
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </a>
                                    <a href="https://twitter.com/?lang=es" target="blank" className="cts__icons" >
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                    <a href="https://dribbble.com/" target="blank" className="cts__icons" >
                                        <FontAwesomeIcon icon={faDribbble} />
                                    </a>
                                    <a href="https://www.behance.net/" target="blank" className="cts__icons" >
                                        <FontAwesomeIcon icon={faBehance} />
                                    </a>
                                    <a href="https://www.linkedin.com/feed/" target="blank" className="cts__icons" >
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </a>
                                </div>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="cts__icons-unique" />
                                <p className="cts__parrafo lh-lg" style={{ fontSize: "0.875rem" }}>
                                    4127/ 5B-C Mislane Road, <br />
                                    Gibraltar, UK
                                </p>
                                <br />
                                <FontAwesomeIcon icon={faPhoneAlt} className="cts__icons-unique" />
                                <p className="cts__parrafo lh-lg" style={{ fontSize: "0.875rem" }}>
                                    Main: 203-808-8613 <br />
                                    Office: 203-808-8648
                                </p>
                                <br />
                                <FontAwesomeIcon icon={faEnvelopeOpenText} className="cts__icons-unique" />
                                <p className="cts__parrafo lh-lg" style={{ fontSize: "0.875rem" }}>
                                    centrofamir@gmail.com
                                </p>
                            </div>
                            <div className="col-md-6 show">
                                <FormContact />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Contactanos;
