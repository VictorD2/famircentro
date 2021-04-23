import {
    faBehance,
    faDribbble,
    faFacebookF,
    faLinkedinIn,
    faPinterest,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Badge from "../components/Badge";
import { faEnvelopeOpenText, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import FormContact from "../components/FormContact";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import ScrollReveal from "scrollreveal";
class Contactanos extends React.Component {
    componentDidMount(){
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

                <Badge name="Contact" />

                <div className="Main__container">
                    <div className="container text-center mt-5">
                        <div className="row">
                            <div className="col-md-12 show">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15798.994774179579!2d-79.04023037587308!3d-8.127048606393345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d6fc22bad99%3A0x9c81b5d832c8370!2sUniversidad%20Privada%20Antenor%20Orrego%20(UPAO)!5e0!3m2!1ses!2spe!4v1618519244878!5m2!1ses!2spe"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    className="w-100 map__contact"
                                    title="Ubicacion"
                                ></iframe>
                            </div>
                        </div>
                        <div className="row mt-5 cts__content" style={{marginBottom: "5rem"}}>
                            <div className="col-md-6 text-start show">
                                <span className="fw-light fs-6 text-secondary show">THE BEST</span>
                                <br />
                                <h3 className="fw-bold fs-1 mt-3 show">Contact Us</h3>
                                <p className="mt-4 lh-lg show" style={{ fontSize: "0.875rem" }}>
                                    Lacinia, lacinia la cus non, fermen tum nisi. Donec et
                                    sollicitudin. Morbi vel arcu gravida, iaculis lacus vel,
                                    posuere ipsum. Sed faucibus mauris vitae urna consectetur, sit
                                    amet maximus nisl sagittis. Ut in iaculis enim, et pulvinar
                                    mauris.
                                </p>
                                <div className="content__icons show">
                                    <a
                                        href="https://www.pinterest.ca/"
                                        target="blank"
                                        className="cts__icons"
                                    >
                                        <FontAwesomeIcon icon={faPinterest} />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/"
                                        target="blank"
                                        className="cts__icons"
                                    >
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </a>
                                    <a
                                        href="https://twitter.com/?lang=es"
                                        target="blank"
                                        className="cts__icons"
                                    >
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                    <a
                                        href="https://dribbble.com/"
                                        target="blank"
                                        className="cts__icons"
                                    >
                                        <FontAwesomeIcon icon={faDribbble} />
                                    </a>
                                    <a
                                        href="https://www.behance.net/"
                                        target="blank"
                                        className="cts__icons"
                                    >
                                        <FontAwesomeIcon icon={faBehance} />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/feed/"
                                        target="blank"
                                        className="cts__icons"
                                    >
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </a>
                                </div>
                                <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    className="cts__icons-unique"
                                />
                                <p className="cts__parrafo lh-lg" style={{ fontSize: "0.875rem" }}>
                                    4127/ 5B-C Mislane Road, <br />
                                    Gibraltar, UK
                                </p>
                                <br />
                                <FontAwesomeIcon
                                    icon={faPhoneAlt}
                                    className="cts__icons-unique"
                                />
                                <p className="cts__parrafo lh-lg" style={{ fontSize: "0.875rem" }}>
                                    Main: 203-808-8613 <br />
                                    Office: 203-808-8648
                                </p>
                                <br />
                                <FontAwesomeIcon
                                    icon={faEnvelopeOpenText}
                                    className="cts__icons-unique"
                                />
                                <p className="cts__parrafo lh-lg" style={{ fontSize: "0.875rem" }}>
                                    office@yourbusiness.com
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
