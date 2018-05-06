import React, { Component } from 'react';
import './Task.css';
import { Button } from 'reactstrap';

class Task extends Component {
  render() {
    if (this.props.tasks.length <= 0) {
      return (<li> Empty list... </li>)
    }
    const edit = (task) => {
      if (! task.isCompleted) {
        return <Button color="warning" onClick={this.props.onEdit.bind(this, task)} className="float-right mr-1">Edit</Button>
      }
    }
    return (
      this.props.tasks.map(task => {
        return <li key={task.id} className={(task.isCompleted ? 'completed' : '')}>
          <label className="fake-radio">
            <input type="checkbox" checked={task.isCompleted} data-task={task} onChange={this.props.onTaskChange.bind(this, task)} />
            <span className="checkmark"></span>
            {task.description}
            <Button color="danger" onClick={this.props.onDelete.bind(this, task)} className="float-right">X</Button>
            {edit(task)}
          </label>
        </li>
      })
    );
  }
}

export default Task;
