import React from 'react';
import Badge from '../components/Badge';

class Contactanos extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Badge name="Contact" />

                <div className="Main__container">
                    <div className="container text-center mt-5">
                        <div className="row">
                            <div className="col-md-12">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15798.994774179579!2d-79.04023037587308!3d-8.127048606393345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d6fc22bad99%3A0x9c81b5d832c8370!2sUniversidad%20Privada%20Antenor%20Orrego%20(UPAO)!5e0!3m2!1ses!2spe!4v1618519244878!5m2!1ses!2spe" width="600" height="450" style={{ border: 0 }} loading="lazy" title="Ubicacion" >
                                </iframe>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="container px-5">
                                    <span className="fw-light fs-6 text-secondary">THE BEST</span><br />
                                    <h3 className="fw-bold fs-1">Contact Us</h3>
                                    <p className="text-start mt-4">
                                        Lacinia, lacinia la cus non, fermen tum nisi. Donec et sollicitudin. Morbi vel arcu gravida, iaculis lacus vel, posuere ipsum. Sed faucibus mauris vitae urna consectetur, sit amet maximus nisl sagittis. Ut in iaculis enim, et pulvinar mauris.
                                            </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Contactanos;