import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUser, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import Carrusel from "../components/Carrusel";

const Home = () => {
  return (
    <React.Fragment>
      <Carrusel />
      <div className="d-flex justify-content-center align-content-center">
        <div className="caracteristicas">
          <div className="d-flex justify-content-around align-items-center w-100 h-100">
            <div className="caracteristicas-item">
              <FontAwesomeIcon className="fs-3" icon={faBook} />
              <h5 className="caracteristicas-text">Online Courses</h5>
            </div>
            <div className="caracteristicas-item">
              <FontAwesomeIcon className="fs-3" icon={faUser} />
              <h5 className="caracteristicas-text">Amazing Teachers</h5>
            </div>
            <div className="caracteristicas-item">
              <FontAwesomeIcon className="fs-3" icon={faPhoneAlt} />
              <h5 className="caracteristicas-text">Amazing Teachers</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark text-danger">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
        expedita modi est voluptate aliquid minus rerum eveniet sapiente et
        laudantium laboriosam, aspernatur placeat aperiam quidem unde eius
        tempore culpa. Adipisci ab suscipit minus facere ex aliquam neque
        architecto odio nihil distinctio quidem fugiat laudantium, deserunt
        porro iure voluptas sint vero repudiandae cupiditate. Illum blanditiis,
        beatae omnis cupiditate aspernatur tempore numquam reiciendis sit itaque
        molestiae praesentium consectetur nostrum eligendi cumque magnam non,
        eius accusantium? Voluptate corrupti eius vitae dolorum. A non eaque
        reprehenderit, necessitatibus excepturi rem dolorem perferendis, culpa
        odit harum, laborum voluptas accusamus ipsum. A tenetur placeat harum
        corrupti nihil?
      </div>
    </React.Fragment>
  );
};

export default Home;
