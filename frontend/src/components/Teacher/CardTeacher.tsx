import React from "react";

// Interfaces
interface myProps {
  img: string;
  name: string;
  job: string;
}

class CardTeacher extends React.Component<myProps> {
  render() {
    return (
      <div className="card__teacher show">
        <img src={this.props.img} className="card-img-top" alt="Profesor" />
        <div className="card-body">
          <h5 className="fs-4">{this.props.name}</h5>
          <span style={{ color: "#3dad0e" }}>{this.props.job}</span>
        </div>
      </div>
    );
  }
}

export default CardTeacher;
