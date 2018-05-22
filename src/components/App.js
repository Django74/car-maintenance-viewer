import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Tasks from "./Task";
import Inventory from "./Inventory";
import sampleCars from "../sample-cars";
import Car from "./Car";
import axios from "axios";

class App extends React.Component {
  state = {
    cars: {},
    task: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    axios.get('https://cartracker-django74.herokuapp.com/cars')
      .then(res => {
        const cars = res.data;
        console.log(cars);
        let carsObj = {};
        for (let i = 0; i < cars.length; i++) {
          carsObj[cars[i].id] = cars[i];
        }
        this.setState({cars: carsObj});
      })
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  addCar = car => {
    // 1. Take a copy of the existing state
    const cars = { ...this.state.cars };
    // 2. Add our new car to that cars variable
    cars[`car${Date.now()}`] = car;
    // 3. Set the new cars object to state
    this.setState({ cars });
  };

  updateCar = (key, updatedCar) => {
    // 1. Take a copy of the current state
    const cars = { ...this.state.cars };
    // 2. Update that state
    cars[key] = updatedCar;
    // 3. Set that to state
    this.setState({ cars });
  };

  deleteCar = key => {
    // 1. take a copy of state
    const cars = { ...this.state.cars };
    // 2. update the state
    cars[key] = null;
    // 3.  update state
    this.setState({ cars });
  };

  loadSampleCars = () => {
    this.setState({ cars: sampleCars });
  };

  addToTask = key => {
    // 1. take a copy of state
    const task = { ...this.state.task };
    // 2. Either add to the task, or update the number in our task
    task[key] = task[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ task });
  };

  removeFromTask = key => {
    // 1. take a copy of state
    const task = { ...this.state.task };
    // 2. remove that itemf from task
    delete task[key];
    // 3. Call setState to update our state object
    this.setState({ task });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="CarTracker.js" />
          <ul className="cars">
            {Object.keys(this.state.cars).map(key => (
              <Car
                key={key}
                index={key}
                details={this.state.cars[key]}
                addToTask={this.addToTask}
              />
            ))}
          </ul>
        </div>
        <Tasks
          cars={this.state.cars}
          task={this.state.task}
          removeFromTask={this.removeFromTask}
        />
        <Inventory
          addCar={this.addCar}
          updateCar={this.updateCar}
          deleteCar={this.deleteCar}
          loadSampleCars={this.loadSampleCars}
          cars={this.state.cars}
        />
      </div>
    );
  }
}

export default App;
