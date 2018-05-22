import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Tasks extends React.Component {
  static propTypes = {
    cars: PropTypes.object,
    task: PropTypes.object,
    removeFromTask: PropTypes.func
  };
  renderTask = elem => {
    // const car = this.props.cars[key];
    // const count = this.props.task[key];
    const transitionOptions = {
      classNames: "task",
      timeout: { enter: 500, exit: 500 }
    };
    return (
      <CSSTransition {...transitionOptions}>
        <li >
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{elem}</span>
              </CSSTransition>
            </TransitionGroup>
          </span>
        </li>
      </CSSTransition>
    );
  };
  render() {
    const taskIds = this.props.task;
    return (
      <div className="task-wrap">
        <h2>Maintenance Done</h2>
        <TransitionGroup component="ul" className="task">
          {taskIds.map(this.renderTask)}
        </TransitionGroup>
      </div>
    );
  }
}

export default Tasks;
