import React from "react";
import PropTypes from "prop-types";

class Car extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      type: PropTypes.string,
      model: PropTypes.string,
      make: PropTypes.string,
      mileage: PropTypes.string,
      year: PropTypes.number
    }),
    addToTask: PropTypes.func
  };
  render() {
    const { type, model, year, make, mileage } = this.props.details;
    return (
      <li className="menu-car">
        {make}
        <h3 className="car-name">
          {model}
          <span className="price">{year}</span>
        </h3>
        <p>{type}</p>
        <div className="mileage">
          {mileage + " km"}
        </div>
        <button
          onClick={() => this.props.addToTask(this.props.index)}
        >Tire Rotation
        </button>
      </li>
    );
  }
}

export default Car;
