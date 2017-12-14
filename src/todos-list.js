import React from 'react';
import TodosListHeader from './todos-list-header';
import _ from 'lodash';
import TodosListItem from './todos-list-item';

export default class TodosList extends React.Component {
    renderItems() {
        const props = _.omit(this.props, 'todos');
        
        return _.map(this.props.todos.filter(todo => todo.isActive), (todo, index) => <TodosListItem key={index} {...todo} {...props} />);
        
    }
    renderDeletedItems() {
        const props = _.omit(this.props, 'todos');
        
        return _.map(this.props.todos.filter(todo => todo.isActive === false), (todo, index) => <TodosListItem key={index} {...todo} {...props} />);
        
    }
    render() {
    const tableStyle = {
        marginTop: 15
    };
    return (
      <div>
          <table align="center" style={tableStyle}>
          <TodosListHeader />
          <tbody>
              {this.renderItems()}
          </tbody>
      </table>
      <br/>
      <br/>
      <br/>
      <p>Deleted Tasks</p>
      <table align="center" style={tableStyle}>
          <TodosListHeader />
          <tbody>
              {this.renderDeletedItems()}
          </tbody>
      </table>
      </div>
    );
  }
}
 