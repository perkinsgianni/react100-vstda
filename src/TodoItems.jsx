import React, { Component } from 'react';

export default class TodoItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      priority: 0,
      editEnabled: false
    };

    this.handleInput = this.handleInput.bind(this);
    this.enableEditing = this.enableEditing.bind(this);
    this.saveTodoItem = this.saveTodoItem.bind(this);
  }

  // click event handlers
  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  enableEditing() {
    this.setState({ editEnabled: true });
  }

  saveTodoItem(index) {
    this.props.editTodoItem(index, this.state.description, this.state.priority);
    this.setState({ editEnabled: false });
  }

  // assign priority color
  todoItemColor(priority) {
    if (priority === '1') {
      return { background: '#dff0d6', color: '#65925e' };
    } else if (priority === '2') {
      return { background: '#fbf8e2', color: '#a69064' };
    } else if (priority === '3') {
      return { background: '#f1dede ', color: '#b16562' };
    }
    return priority;
  }

  render() {
    // assign props to destructured object
    const { todoItem, deleteTodoItem } = this.props;

    return (
      // edit form
      <li style={ this.todoItemColor(todoItem.priority) }>
        {this.state.editEnabled ? (
          <div>
            <label htmlFor='todoItems'>Description</label>
            <textarea
              id='todo-text'
              name='description'
              defaultValue={ todoItem.description }
              onChange={ this.handleInput }
              className='update-todo-text form-control'
            />
            <label style={ { marginTop: '15px' } } htmlFor='priority'>Priority</label>
            <div className='form-group'>
              <select
                id='update-priority'
                name='priority'
                type='number'
                defaultValue={ todoItem.priority }
                onChange={ this.handleInput }
                className='update-todo-priority form-control'
              >
                <option>Select a priority</option>
                <option value='1'>Low</option>
                <option value='2'>Medium</option>
                <option value='3'>High</option>
              </select>
            </div>
            <button
              style={ { width: '15%', fontSize: '16px', marginLeft: '85%' } }
              id='save-todo'
              onClick={ () => this.saveTodoItem(todoItem.priority) }
              className='update-todo btn btn-success btn-block'
            >
              Save
            </button>
          </div>
        ) : (
          // todo list
          <div>
            <div
              style={ this.todoItemColor(todoItem.priority) }
              className='list-group-item'
            >
              <input type='checkbox' />
              {todoItem.description}
              <button
                style={ { color: 'red', float: 'right', marginTop: '-2px' } }
                type='button'
                onClick={ this.props.deleteTodoItem }
                className='delete-todo'
              >
                <span className='glyphicon glyphicon-trash' />
              </button>
              <button
                style={ { color: 'blue', float: 'right', marginTop: '-2px' } }
                type='button'
                onClick={ this.enableEditing }
                className='edit-todo float-right'
              >
                <span className='glyphicon glyphicon-edit' />
              </button>
            </div>
          </div>
        )}
      </li>
    );
  }
}
