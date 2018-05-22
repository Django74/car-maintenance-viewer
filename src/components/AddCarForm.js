import React from "react";
import PropTypes from "prop-types";

class AddCarForm extends React.Component {
  modelRef = React.createRef();
  yearRef = React.createRef();
  mileageRef = React.createRef();
  makeRef = React.createRef();
  typeRef = React.createRef();

  static propTypes = {
    addCar: PropTypes.func
  };

  createCar = event => {
    // 1.  stop the form from submitting
    event.preventDefault();
    const car = {
      name: this.modelRef.value.value,
      year: this.yearRef.value.value,
      mileage: this.mileageRef.value.value,
      make: this.makeRef.value.value,
      type: this.typeRef.value.value
    };
    this.props.addCar(car);
    // refresh the form
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="car-edit" onSubmit={this.createCar}>
        <input
          name="model"
          ref={this.modelRef}
          type="text"
          placeholder="Model"
        />
        <input
          name="year"
          ref={this.yearRef}
          type="number"
          placeholder="Year"
        />
        <select name="type" ref={this.typeRef}>
          <option selected="selected">Choose Car Type</option>
          <option value="Gas">Gas</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>

        <input
          name="make"
          ref={this.makeRef}
          type="text"
          placeholder="Make"
        />
        <input
          name="mileage"
          ref={this.mileageRef}
          type="number"
          placeholder="Mileage"
        />
        <button type="submit">+ Add Car</button>
      </form>
    );
  }
}

export default AddCarForm;
