import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };
    }
    renderTaskSection () {
        const { task, isCompleted } = this.props;
        const taskStyle = {
            color: isCompleted ? 'red' : 'green',
            textDecoration: isCompleted ? 'line-through' : 'none',
            cursor: 'pointer'
        };
        if (this.state.isEditing) {
            return (
                <td>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type="text" defaultValue={task} ref="editInput" />
                        </form>
                </td>
            )
        }

        return (
            <td style={taskStyle} onClick={this.props.toggleTask.bind(this, task)} >
            {task}
            </td>
        );
    }
    
    renderActionsSection() {
        const { isActive } = this.props;
        if (isActive) {
            if (this.state.isEditing) {
                return (
                    <td>
                    <button onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                    </td>
                );
            }
            return (
                <td>
                    <button onClick={this.onEditClick.bind(this)}>Edit</button>
                    <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
                    <button onClick={this.props.reOrder.bind(this, this.props.task, -1)}>Up</button>
                    <button onClick={this.props.reOrder.bind(this, this.props.task, 1)}>Down</button>
                </td>
                );
        }
        return (
            <td>
                <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Un-Delete</button>
            </td>
            );
    }

    render() {
    return (
             <tr>
                  {this.renderTaskSection()}
                  {this.renderActionsSection()}
              </tr>
    );
  }
  onEditClick() {
      this.setState({ isEditing: true });
  }

  onCancelClick() {
      this.setState({ isEditing: false });
  }

  onSaveClick(event) {
      event.preventDefault();

      const oldTask = this.props.task;
      const newTask = this.refs.editInput.value;
      this.props.saveTask(oldTask, newTask);
      this.setState({ isEditing: false });
  }
}