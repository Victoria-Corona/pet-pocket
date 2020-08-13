import React from 'react';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todo: '',
      view: 'list'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const todos = this.state.todos.map(todo =>
      <div className="todoListItem mt-3" key={todo.todoId}>
        <span className="p-2">{todo.todo}</span>
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
