import React from "react";
import PropTypes from "prop-types";

class EditCarForm extends React.Component {
  static propTypes = {
    car: PropTypes.shape({
      type: PropTypes.string,
      model: PropTypes.string,
      make: PropTypes.string,
      mileage: PropTypes.string,
      year: PropTypes.number
    }),
    index: PropTypes.string,
    updateCar: PropTypes.func
  };
  handleChange = event => {
    console.log(event.currentTarget.value);
    // update that car
    // 1. Take a copy of the curernt car
    const updatedCar = {
      ...this.props.car,
      [event.currentTarget.model]: event.currentTarget.value
    };
    this.props.updateCar(this.props.index, updatedCar);
  };
  render() {
    return (
      <div className="car-edit">
        <input
          type="text"
          name="model"
          onChange={this.handleChange}
          value={this.props.car.model}
        />
        <input
          type="number"
          name="year"
          onChange={this.handleChange}
          value={this.props.car.year}
        />
        <select
          type="text"
          name="type"
          onChange={this.handleChange}
          value={this.props.car.type}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <input
          type="text"
          name="make"
          onChange={this.handleChange}
          value={this.props.car.make}
        />
        <input
          type="number"
          name="mileage"
          onChange={this.handleChange}
          value={this.props.car.mileage}
        />
        <button onClick={() => this.props.deleteCar(this.props.index)}>
          Remove Car
        </button>
      </div>
    );
  }
}

export default EditCarForm;
