import React from "react";
import PropTypes from "prop-types";
import AddCarForm from "./AddCarForm";
import EditCarForm from "./EditCarForm";

class Inventory extends React.Component {
  static propTypes = {
    cars: PropTypes.object,
    updateCar: PropTypes.func,
    deleteCar: PropTypes.func,
    loadSampleCars: PropTypes.func
  };

  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(this.props.cars).map(key => (
          <EditCarForm
            key={key}
            index={key}
            car={this.props.cars[key]}
            updateCar={this.props.updateCar}
            deleteCar={this.props.deleteCar}
          />
        ))}
        <AddCarForm addCar={this.props.addCar} />
        <button
          onClick={this.props.saveEdits}
          disabled={!this.props.isChanged}
        >
          Save Edits
        </button>
      </div>
    );
  }
}

export default Inventory;
