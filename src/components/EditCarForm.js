import React from "react";
import PropTypes from "prop-types";

class EditCarForm extends React.Component {
  static propTypes = {
    car: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
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
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateCar(this.props.index, updatedCar);
  };
  render() {
    return (
      <div className="car-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.car.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.car.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.car.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.car.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.car.image}
        />
        <button onClick={() => this.props.deleteCar(this.props.index)}>
          Remove Car
        </button>
      </div>
    );
  }
}

export default EditCarForm;
