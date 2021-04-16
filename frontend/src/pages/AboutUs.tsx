import React from 'react';

import Badge from '../components/Badge';
import Boton from '../components/Boton';
import CardTeacher from '../components/CardTeacher';
import Slider from '../components/Slider';

//Import de img de ejemplo
import tea1 from '../images/tea1.jpg';
import tea2 from '../images/tea2.jpg';
import tea3 from '../images/tea3.jpg';
import tea4 from '../images/tea4.jpg';

class AboutUs extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Badge name="About Us" />

                <div className="Main__container">
                    <div className="container text-center mt-5">
                        <div className="row">
                            <span className="fw-light fs-6 text-secondary">THE BEST</span><br />
                            <h3 className="fw-bold fs-1 mt-3">We are the Academy</h3>
                        </div>
                        <div className="row text__container lh-lg text-start">
                            <div className="col-md-6">
                                <p>
                                    Cras vitae turpis lacinia, lacinia lacus non, fermentum nisi. Donec et sollicitudin est, in euismod. Morbi vel arcu gravida, iaculis lacus vel, posuere ipsum. Sed faucibus mauris vitae urna consectetur, sit amet maximus nisl sagittis. Ut in iaculis enim, et pulvinar mauris. Etiam tristique magna eget velit consectetur, a tincidunt velit dictum. Cras vulputate metus id felis ornare hendrerit. Maecenas sodales suscipit ipsum
                            </p>
                            </div>
                            <div className="col-md-6">
                                <p>
                                    Vitae turpis lacinia, lacinia lacus non, fermentum nisi. Donec et sollicitudin est, in euismod. Morbi vel arcu gravida, iaculis lacus vel, posuere ipsum. Sed faucibus mauris vitae urna consectetur, sit amet maximus nisl sagittis. Ut in iaculis enim, et pulvinar mauris. Etiam tristique magna eget velit consectetur, a tincidunt velit dictum. Cras vulputate metus id felis ornare hendrerit. Maecenas sodales suscipit ipsum.
                            </p>
                            </div>
                        </div>
                        <Slider />
                        <div className="row mt-5">
                            <span className="fw-light fs-6 text-secondary">THE BEST</span>
                            <br />
                            <h3 className="fw-bold fs-1 mt-3">Meet the Teachers</h3>
                        </div>
                        <div className="row" style={{ marginTop: "4.5rem" }}>
                            <CardTeacher
                                img={tea1}
                                name="Maria teresa"
                                job="Ingeniera"
                            />
                            <CardTeacher
                                img={tea2}
                                name="Simon Duval"
                                job="Digital Proffesor"
                            />
                            <CardTeacher
                                img={tea3}
                                name="James Hogan"
                                job="HTML Proffesor"
                            />
                            <CardTeacher
                                img={tea4}
                                name="Claudia Williams"
                                job="Marketing Proffesor"
                            />
                        </div>
                        <Boton name="All Teachers"/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AboutUs;