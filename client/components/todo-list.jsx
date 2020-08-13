import React from 'react';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todo: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch('/api/todo')
      .then(res => res.json())
      .then(todo => this.setState({ todos: todo }))
      .catch(error => console.error(error.message));
  }

  handleSubmit(event) {
    event.preventDefault();
    const todo = {
      todo: this.state.todo
    };
    fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }).then(res => res.json())
      .then(todo => this.setState({ todos: this.state.todos.concat(todo) }))
      .catch(error => console.error(error.message));
  }

  handleChange(event) {
    this.setState({
      todo: event.target.value
    });
  }

  handleDelete(todoId) {
    fetch(`/api/todo/${todoId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(todo => {
        const copyTodos = this.state.todos.slice();
        const newTodos = [];
        const index = copyTodos.findIndex(todos => this.todos.todoId === todo.todoId);
        newTodos.push(index);
        this.setState({ todos: newTodos });
      })
      .catch(error => console.error(error.message));
  }

  render() {
    const todos = this.state.todos.map(todo =>
      <div className="todoListItem d-flex  mt-3 justify-content-between" key={todo.todoId}>
        <span className="p-2 ">{todo.todo}</span>
        <button type="button" className="todoDeleteButton d-flex " onClick={() => this.handleDelete(todo.todoId)}>DELETE</button>
      </div>
    );
    return (
      <div className="p-2 mt-4">
        <div >
          <h5 style={{ fontWeight: 'bold' }}>ADD TO DO</h5>
          <form onSubmit={this.handleSubmit}>
            <input className="form-control" name="todo" type="text" onChange={this.handleChange} />
            <div className=""><button type="submit" className="nextButton mt-3">Add</button></div>
          </form>
        </div>
        <div className="mt-4">
          <h6 style={{ fontWeight: 'bold' }}>TO DO LIST</h6>
          {todos}
        </div>
      </div>
    );

  }
}
