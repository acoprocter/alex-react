import React from 'react';
import _ from 'lodash';
import dropdown from 'react-bootstrap/lib/Dropdown';

export default class CreateTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }
    
    renderError() {
        if (!this.state.error) { return null; }

        return <div style={{ color: 'red' }}>{this.state.error}</div>;
    }
    
    renderSuggestions() {
        return null
    }

    render() {
    const createStyle = {
        marginTop: 15
    };
    return (
      <div>
      <form className="dropdown" style={createStyle} onSubmit={this.handleCreate.bind(this)}>
          <input className="dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="text" placeholder="What do I need to do?" ref="createInput" onSelect={this.renderSuggestions()} />
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button className="dropdown-item" type="button">Action</button>
                <button className="dropdown-item" type="button">Another action</button>
                <button className="dropdown-item" type="button">Something else here</button>
            </div>
        

          <button>Create</button>
          {this.renderError()}
      </form>
      </div>
    );
  }

  handleCreate(event) {
      event.preventDefault();
      
      const createInput = this.refs.createInput;
      const task = createInput.value;
      const validateInput = this.validateInput(task);
      
      if (validateInput) {
          this.setState({ error: validateInput });
          return;
      }
      this.setState({ error: null });
      this.props.createTask(task);
      this.refs.createInput.value = '';
  }

  validateInput(task) {
      if (!task) {
          return 'Please enter a task.';
      } else if (_.find(this.props.todos, todo => todo.task === task )) {
          return 'Task already exists.';
      } else {
          return null;
      }
  }
}
 