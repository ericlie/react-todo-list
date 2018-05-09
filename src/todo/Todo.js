import React, { Component } from 'react';
import Task from './Task';
import Loading from '../Loading';
import { Col, Form, FormGroup, Input, Alert, Button } from 'reactstrap';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoading: false,
      isEditing: false,
      task: {
        id: null,
        description: '',
        isCompleted: false,
      }
    };
    this.endpoint = 'http://localhost:9999/tasks'
    this.addTask = this.addTask.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
  }

  componentDidMount() {
    this.getTasks()
  }

  getTasks = () => {
    this.setState({isLoading: true})
    fetch(this.endpoint)
      .then(data => data.json())
      .then(tasks => this.setState({ tasks, isLoading: false }))
      .catch(err => {
        this.setState({isLoading : false})
        console.error(err)
      })
  }

  updateTaskStatus = (task) => {
    task.isCompleted = !task.isCompleted
    this.setState({task}, () => {
      this.submit()
    })
  }

  deleteTask = (task) => {
    this.setState({ isLoading: true })
    fetch(`${this.endpoint}/${task.id}`, {method: 'DELETE'})
    .then(data => {
      let {tasks, task} = this.state
      const id = tasks.findIndex(oldTask => oldTask.id === task.id)
      tasks.splice(id, 1)
      task = {id: null, description: '', isCompleted: false}
      this.setState({tasks, task, isLoading: false})
    })
    .catch(err => {
      console.error(err)
      this.setState({ isLoading: false })
    })
  }

  addTask(event) {
    event.preventDefault()
    this.submit()
  }

  submit() {
    let payload = {
      headers: {
        'content-type': 'application/json'
      },
      method: (this.state.task.id !== null ? 'PUT' : 'POST'),
      body: JSON.stringify(this.state.task)
    }
    const {id} = this.state.task
    const endpoint = this.endpoint + (id !== null ? `/${id}` : '')
    this.setState({ isLoading: true, isEditing: false })
    fetch(endpoint, payload)
      .then(data => data.json())
      .then(task => {
        const { tasks } = this.state
        const taskId = tasks.findIndex(oldTask => oldTask.id === task.id)
        if (taskId < 0) {
          tasks.push(task)
        } else {
          tasks[taskId] = task;
        }
        task = { id: null, description: '', isCompleted: false }
        this.setState({ tasks, task, isLoading: false })
      })
      .catch(err => {
        console.error(err)
        this.setState({ isLoading: false })
      })
  }

  updateDescription(event) {
    const {task} = this.state
    task.description = event.currentTarget.value;
    this.setState({task})
  }

  editTask = (e, task) => {
    console.log(e);
    this.setState({task, isEditing: true})
  }

  cancelEdit = () => {
    this.setState({
      isEditing: false,
      task: {
        id: null,
        description: '',
        isCompleted: false
      }
    })
  }

  render() {
    const tasks = this.state.isLoading ? <Loading /> : (
      <ul className="pl-0">
        <Task tasks={this.state.tasks} onTaskChange={this.updateTaskStatus} onDelete={this.deleteTask} onEdit={this.editTask}/>
      </ul>
    )
    const editing = () => {
      return (
        <Alert color="warning">
            Editing in progress
            <Button color="danger" className="float-right" style={{ lineHeight: 1 }} onClick={this.cancelEdit} >Cancel</Button>
        </Alert>
      )
    }
    return (
      <Col lg={6} md={6} sm={12} className="mx-auto">
        <Form onSubmit={this.addTask}>
          <FormGroup row>
            <Col sm={12}>
              <Input type="text" name="task" id="task" value={this.state.task.description} onChange={this.updateDescription} placeholder="Enter Your Task" bsSize="lg" />
            </Col>
          </FormGroup>
        </Form>
        <br/>
        {this.state.isEditing ? editing() : tasks}
      </Col>
    );
  }
}

export default Todo;
