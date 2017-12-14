import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import _ from 'lodash'; 
import Undo from './undo';

const todos = [
  {
    order: 0,
    task: 'feed the cat',
    isCompleted: false,
    isActive: true
  },
  { 
    order: 2,
    task: 'make my bed',
    isCompleted: true,
    isActive: true

  },
  {
    order: 1,
    task: 'water the garden',
    isCompleted: true,
    isActive: true
  },
  {
    order: 3,
    task: 'I am Not Active and should be hidden!',
    isCompleted: true,
    isActive: false
  }
]

const prevTodo = false

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
            deleteTask={this.toggleDeleteTask.bind(this)}
            moveUp={this.moveUp.bind(this)}
            moveDown={this.moveDown.bind(this)}
             />
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
      isCompleted: false,
      isActive: true
    });
    this.setState({todos: this.state.todos});
  }

  saveTask (oldTask, newTask) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
    foundTodo.task = newTask;
    this.setState({ todos: this.state.todos });
  }
   
  toggleDeleteTask(taskToDelete) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === taskToDelete);
    foundTodo.isActive = !foundTodo.isActive;
    foundTodo.isCompleted = true;
    this.setState({ todos: this.state.todos });
  }

  moveUp(taskToMove) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === taskToMove);
    const foundPriorTodo = _.find(this.state.todos, priorTodo => priorTodo.order === foundTodo.order - 1);
    if (foundTodo.order === 0) {
      return
     };
    foundTodo.order = foundTodo.order - 1;
    foundPriorTodo.order = foundPriorTodo.order + 1;
    this.setState({ todos: this.state.todos });
  }

  moveDown(taskToMove) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === taskToMove);
    const foundPriorTodo = _.find(this.state.todos, priorTodo => priorTodo.order === foundTodo.order + 1);
    // if (foundTodo.order === IS LAST IN OBJECT ) { return };
    foundTodo.order = foundTodo.order + 1;
    foundPriorTodo.order = foundPriorTodo.order - 1;
    this.setState({ todos: this.state.todos });
  }
  

}
