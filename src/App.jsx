import React, { Component } from 'react';
import TodoItems from './TodoItems';

class App extends Component {
  // initialize state
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      priority: 0,
      todoItems: [],
    };

    // event binding for updating state values
    this.handleInput = this.handleInput.bind(this);
    this.newTodoItem = this.newTodoItem.bind(this);
    this.editTodoItem = this.editTodoItem.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
  }

  // click event handlers
  handleInput(e) {
    // update state value
    this.setState({ [e.target.name]: e.target.value });
  }

  newTodoItem() {
    // assign todoItems (component) state to new arr
    const newTodoItems = [...this.state.todoItems];
    // if selected priority > 0, push new entries into arr
    if (this.state.priority > 0) {
      newTodoItems.push({
        description: this.state.description,
        priority: this.state.priority
      });
      // update state value
      this.setState({ todoItems: newTodoItems });
    } else {
      alert('Please select a priority for your todo item!');
    }
  }

  editTodoItem(index, description, priority) {
    // assign todoItems state to new arr
    const editTodoItems = [...this.state.todoItems];
    // create object for new todo items
    const newTodoItem = {
      description,
      priority
    };
    // assign new todo items to index of new arr
    editTodoItems[index] = newTodoItem;
    // update state value
    this.setState({ todoItems: editTodoItems });
  }

  deleteTodoItem(index) {
    // assign todoItems state to new arr
    const deleteTodoItems = [...this.state.todoItems];
    // // remove new todo items
    deleteTodoItems.splice(index, 1);
    // update state value
    this.setState({ todoItems: deleteTodoItems });
  }

  render() {
    return (
      <div className='container'>
        <div className='page-header'>
          <h1 style={ { color: 'white' } }>Very Simple Todo App</h1>
          <p style={ { color: 'white', fontSize: '20px' } }>Track all of the things</p>
        </div>
        <div className='tagline' />

        {/* <AddNewTodo */}
        <div className='row'>
          <div className='col-sm-4'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add New Todo</div>
              <div className='panel-body'>
                <label htmlFor='todoItems'>I want to...</label>
                <textarea
                  id='todo-text'
                  name='description'
                  defaultValue={ this.state.description }
                  onChange={ this.handleInput }
                  className='create-todo-text form-control'
                />
                <label style={ { marginTop: '15px' } } htmlFor='priority'>How much of a priority is this?</label>
                <div className='form-group'>
                  <select
                    id='priority'
                    name='priority'
                    defaultValue={ this.state.priority }
                    onChange={ this.handleInput }
                    className='create-todo-priority form-control'
                  >
                    <option>Select a priority</option>
                    <option value='1'>Low</option>
                    <option value='2'>Medium</option>
                    <option value='3'>High</option>
                  </select>
                </div>
              </div>
              <div className='panel-footer'>
                <button
                  style={ { height: '40px', fontSize: '18px' } }
                  id='add-button'
                  type='button'
                  onClick={ this.newTodoItem }
                  className='create-todo btn btn-success btn-block'
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* <ViewTodos /> */}
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>View Todos</div>
              <div className='panel-body'>
                {/* default greeting */}
                <ul style={ { marginLeft: '-16px', marginRight: '-15px', marginTop: '-15px', height: '30px' } } className='list-group'>
                  {this.state.todoItems.length === 0 ? (
                    <li style={ { background: '#daedf8', color: '#4e7f9e', height: '65px' } } className='list-group-item'>
                      <span style={ { fontWeight: 'bold' } }>Welcome to Very Simple Todo App!</span><br />
                      <span>Get started now by adding a new todo on the left.</span>
                    </li>
                  ) : (
                    // todo list
                    <div style={ { width: '100.05%' } } className='list-group-item'>
                      {this.state.todoItems.map((todoItem, index) =>
                        <li style={ { fontWeight: 'bold' } } className='list-unstyled'>
                          <TodoItems
                            index={ index }
                            todoItem={ todoItem }
                            handleInput={ this.handleInput }
                            editTodoItem={ this.editTodoItem }
                            deleteTodoItem={ this.deleteTodoItem }
                          /></li>
                      )}
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
