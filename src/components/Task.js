import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Tasks extends React.Component {
  static propTypes = {
    cars: PropTypes.object,
    task: PropTypes.object,
    removeFromTask: PropTypes.func
  };
  renderTask = key => {
    const car = this.props.cars[key];
    const count = this.props.task[key];
    const isAvailable = car && car.status === "available";
    const transitionOptions = {
      classNames: "task",
      key,
      timeout: { enter: 500, exit: 500 }
    };
    // Make sure the car is loaded before we continue!
    if (!car) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {car ? car.name : "car"} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {car.name}
            {formatPrice(count * car.price)}
            <button onClick={() => this.props.removeFromTask(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };
  render() {
    const taskIds = Object.keys(this.props.task);
    const total = taskIds.reduce((prevTotal, key) => {
      const car = this.props.cars[key];
      const count = this.props.task[key];
      const isAvailable = car && car.status === "available";
      if (isAvailable) {
        return prevTotal + count * car.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="task-wrap">
        <h2>Task</h2>
        <TransitionGroup component="ul" className="task">
          {taskIds.map(this.renderTask)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Tasks;
