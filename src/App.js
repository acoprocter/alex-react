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
            reOrder={this.reOrder.bind(this)}
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

  reOrder(taskToMove, where) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === taskToMove);
    const moveOverTodo = _.find(this.state.todos, moveOverTodo => moveOverTodo.order === foundTodo.order + where);
    if (!moveOverTodo)
     { return };
    foundTodo.order = foundTodo.order + where;
    moveOverTodo.order = moveOverTodo.order - where;
    this.setState({ todos: this.state.todos });
  }

}
