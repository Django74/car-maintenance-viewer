import React from 'react';
import PropTypes from 'prop-types';

class Car extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      type: PropTypes.string,
      model: PropTypes.string,
      make: PropTypes.string,
      mileage: PropTypes.string,
      year: PropTypes.number,
    }),
    addToTask: PropTypes.func,
  };

  render() {
    const {type, model, year, make, mileage} = this.props.details;
    let maintenanceTasks;
    const tasksArray = this.props.availableTasks[this.props.index];
    if (Object.keys(this.props.availableTasks).length > 0 && tasksArray) {
      maintenanceTasks = tasksArray.map(
          elem =>
              <button
                  onClick={() => this.props.addToTask(this.props.index)}
              >
                {elem.Name}
              </button>,
      );
    } else {
      maintenanceTasks = null;
    }

    return (
        <li className="menu-car">
          {make}
          <h3 className="car-name">
            {model}
            <span className="price">{year}</span>
          </h3>
          <p>{type}</p>
          <div className="mileage">
            {mileage + ' km'}
          </div>
          {maintenanceTasks}
        </li>
    );
  }
}

export default Car;
