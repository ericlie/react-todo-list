import React, { Component } from 'react';
import './Task.css';
import { Button } from 'reactstrap';
import EditButton from './EditButton';

class Task extends Component {
  constructor(props) {
    super(props)
    this.handleOnEdit = this.handleOnEdit.bind(this)
  }
  handleOnEdit(e, task) {
    this.props.onEdit(e, task)
  }
  render() {
    if (this.props.tasks.length <= 0) {
      return (<li> Empty list... </li>)
    }
    return (
      this.props.tasks.map(task => {
        return <li key={task.id} className={(task.isCompleted ? 'completed' : '')}>
          <label className="fake-radio">
            <input type="checkbox" checked={task.isCompleted} onChange={this.props.onTaskChange.bind(this, task)} />
            <span className="checkmark"></span>
            {task.description}
            <Button color="danger" onClick={this.props.onDelete.bind(this, task)} className="float-right">X</Button>
            <EditButton task={task} onEdit={this.handleOnEdit} />
          </label>
        </li>
      })
    );
  }
}

export default Task;
