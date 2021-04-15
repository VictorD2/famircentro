import React from "react";
interface Props {
  img: string;
  subtitle: string;
  title: string;
}
const CarruselItem = (props: Props) => {
  return (
    <div className="carousel-item"
     >
      <img src={props.img} className="d-block w-100" alt="..." />
      <div className="carrousel-text row h-100 align-items-center">
        <div className="col-12">
          <h5 className="carrousel-title">{props.title}</h5>
          <p className="carrousel-subtitle">{props.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default CarruselItem;
