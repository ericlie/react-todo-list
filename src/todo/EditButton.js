import React, { Component } from 'react';
import { Button } from 'reactstrap';

class EditButton extends Component {
  constructor(props) {
    super(props)
    this.handleOnEdit = this.handleOnEdit.bind(this)
  }
  handleOnEdit(e) {
    this.props.onEdit(e, this.props.task)
  }
  render() {
    const {task} = this.props
    if (! task.isCompleted) {
      return (
        <Button color="warning" onClick={this.handleOnEdit} className="float-right mr-1">Edit</Button>
      )
    }
    return null;
  }
}
export default EditButton;
