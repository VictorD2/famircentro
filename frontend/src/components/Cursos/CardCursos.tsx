import React from "react";

// Interfaces
interface myProps {
  img: string;
  curso: string;
}

class CardCursos extends React.Component<myProps> {
  render() {
    return (
      <div className="card__teacher show">
        <a href={`Programa/${this.props.curso}`} className="text-decoration-none link-dark">
          <img src={this.props.img} className="card-img-top" alt={`Curso ${this.props.curso}`} />
          <div className="card-body">
            <h5 className="fs-5">{this.props.curso}</h5>
          </div>
        </a>
      </div>
    );
  }
}

export default CardCursos;
