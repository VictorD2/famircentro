import React from 'react';

import Badge from '../components/Badge';
import CardTeacher from '../components/CardTeacher';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Slider from '../components/Slider';

//Import de img de ejemplo
import tea1 from '../images/tea1.jpg';
import tea2 from '../images/tea2.jpg';
import tea3 from '../images/tea3.jpg';
import tea4 from '../images/tea4.jpg';

import ScrollReveal from "scrollreveal";
class AboutUs extends React.Component {
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

                <Badge name="About Us" />

                <div className="Main__container">
                    <div className="container text-center mt-5" style={{marginBottom: "4.5rem"}}>
                        <div className="row">
                            <span className="fw-light fs-6 text-secondary show">THE BEST</span><br />
                            <h3 className="fw-bold fs-1 mt-3 show">We are the Academy</h3>
                        </div>
                        <div className="row text__container lh-lg text-start">
                            <div className="col-md-6 show">
                                <p>
                                    Cras vitae turpis lacinia, lacinia lacus non, fermentum nisi. Donec et sollicitudin est, in euismod. Morbi vel arcu gravida, iaculis lacus vel, posuere ipsum. Sed faucibus mauris vitae urna consectetur, sit amet maximus nisl sagittis. Ut in iaculis enim, et pulvinar mauris. Etiam tristique magna eget velit consectetur, a tincidunt velit dictum. Cras vulputate metus id felis ornare hendrerit. Maecenas sodales suscipit ipsum
                            </p>
                            </div>
                            <div className="col-md-6 show">
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
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default AboutUs;