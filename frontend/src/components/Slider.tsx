import React from 'react';

import img1 from '../images/bg-1.jpg';
import img2 from '../images/bg-2.jpg';
import img3 from '../images/bg-3.jpg';

function Slider() {
    return (
        <div id="carouselExampleInterval" className="carousel slide mt-5 py-5" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                    <img src={img1} className="d-block w-100" alt="br-1" />
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <img src={img2} className="d-block w-100" alt="br-2" />
                </div>
                <div className="carousel-item">
                    <img src={img3} className="d-block w-100" alt="br-3" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Slider;