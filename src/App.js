import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import _ from 'lodash'; 
import Undo from './undo';

const todos = [
  {
    task: 'feed the cat',
    isCompleted: false,
    isDeleted: false
  },
  {
    task: 'make my bed',
    isCompleted: true,
    isDeleted: false

  },
  {
    task: 'water the garden',
    isCompleted: true,
    isDeleted: false
  },
  {
    task: 'I am Deleted and should be hidden!',
    isCompleted: false,
    isDeleted: true
  }
]

const prevTodo = []

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos, 
      prevTodo
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Todo List</h1>
        </header>
        <Undo prevTodo={this.state.prevTodo} onClick={this.createTask.bind(prevTodo.task)} />
        <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} suggestions={this.state.suggestions} />
        <TodosList 
            todos={this.state.todos} 
            toggleTask={this.toggleTask.bind(this)} 
            saveTask={this.saveTask.bind(this)} 
            deleteTask={this.deleteTask.bind(this)} />
      </div>
    );
  }

  toggleTask(task) {
      const foundTodo = _.find(this.state.todos, todo => todo.task === task);
      foundTodo.isCompleted = !foundTodo.isCompleted;
      this.setState({ todos: this.state.todos });
  }

  createTask(task) {
    this.state.todos.push({
      task,
      isCompleted: false
    });
    this.setState({todos: this.state.todos});
  }

  saveTask (oldTask, newTask) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);

    foundTodo.task = newTask;
    this.setState({ todos: this.state.todos });
  }
  updatePrevTodo(taskToDelete) {
    this.setState({ prevTodo: this.state.prevTodo });
  } 
  deleteTask(taskToDelete) {
    this.updatePrevTodo(taskToDelete);
    _.remove(this.state.todos, todo => todo.task === taskToDelete);
    this.setState({ todos: this.state.todos });
  }

  

}
