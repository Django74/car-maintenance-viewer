import React from "react";
import PropTypes from "prop-types";

class AddCarForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  static propTypes = {
    addCar: PropTypes.func
  };

  createCar = event => {
    // 1.  stop the form from submitting
    event.preventDefault();
    const car = {
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value
    };
    this.props.addCar(car);
    // refresh the form
    event.currentTarget.reset();
  };
  render() {
    return (
      <form className="car-edit" onSubmit={this.createCar}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input
          name="price"
          ref={this.priceRef}
          type="text"
          placeholder="Price"
        />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input
          name="image"
          ref={this.imageRef}
          type="text"
          placeholder="Image"
        />
        <button type="submit">+ Add Car</button>
      </form>
    );
  }
}

export default AddCarForm;
