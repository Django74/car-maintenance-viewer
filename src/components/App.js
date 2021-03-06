import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Tasks from "./Task";
import Inventory from "./Inventory";
import Car from "./Car";
import axios from "axios";

class App extends React.Component {
  state = {
    cars: {},
    task: [],
    isChanged: false,
    availableTasks: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    this.getCars();
  }


  componentDidUpdate(prevProps, prevState) {
    if (Object.keys(this.state.cars).length > Object.keys(prevState.cars).length) {
      this.getTasksAvailable(this.state.cars);
    }
  }

  getCars() {
    axios.get('https://cartracker-django74.herokuapp.com/cars')
          .then(res => {
      const cars = res.data;
      let carsObj = {};
      for (let i = 0; i < cars.length; i++) {
        carsObj[cars[i].id] = cars[i];
      }
      this.setState({cars: carsObj});
      this.getTasksAvailable(carsObj);
    });
  }

  getTasksAvailable = cars => {
    for (let car in cars) {
      axios.get('https://cartracker-django74.herokuapp.com/tasks/' + cars[car].type)
            .then(res => {
        this.setState({
          availableTasks: {
            ...this.state.availableTasks,
            [car]: res.data,
          }
        })
      });
    }
  };

  addCar = car => {
    // 1. Take a copy of the existing state
    const cars = { ...this.state.cars };
    // 2. Add our new car to that cars variable
    cars[`car${Date.now()}`] = car;
    // 3. Set the new cars object to state
    this.setState({ cars });
    // ADD request to add to database
    axios.post('https://cartracker-django74.herokuapp.com/cars', car)
         .then(res => {
           console.log(res);
         });
  };

  updateCar = (key, updatedCar) => {
    // 1. Take a copy of the current state
    const cars = { ...this.state.cars };
    // 2. Update that state
    cars[key] = updatedCar;
    // 3. Set that to state
    this.setState({
      cars,
      isChanged: true,
      carsToPut: {
        ...this.state.carsToPut,
        [key]: updatedCar
      }
    });
  };

  deleteCar = key => {
    // 1. take a copy of state
    const cars = { ...this.state.cars };
    // 2. update the state
    delete cars[key];
    // 3.  update state
    this.setState({ cars });
    // DELETE request to update database
    axios.delete('https://cartracker-django74.herokuapp.com/cars/' + key)
         .then(res => {
           console.log(res);
         });
  };

  saveEdits = () => {
    const cars = this.state.carsToPut;
    // PUT all updated car info
    for(let car in cars) {
      axios.put('https://cartracker-django74.herokuapp.com/cars/' + car, cars[car])
           .then(res => {
             console.log(res);
           });
    }
    this.setState({ isChanged: false, carsToPut: {}});
  };

  addToTask = (key, taskName) => {
    this.setState({
      task: [...this.state.task, `CAR-#${key} ${taskName}`]
    });
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
                availableTasks={this.state.availableTasks}
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
          saveEdits={this.saveEdits}
          cars={this.state.cars}
          isChanged={this.state.isChanged}
        />
      </div>
    );
  }
}

export default App;
