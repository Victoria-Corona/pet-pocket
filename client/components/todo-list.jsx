import React from 'react';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  componentDidMount() {
    fetch('/api/todo')
      .then(res => res.json())
      .then(todo => this.setState({ todos: todo }))
      .catch(error => console.error(error.message));
  }

  render() {
    const todos = this.state.todos.map(todo =>
      <div className="todoListItem mt-3" key={todo.todoId}>
        <span className="p-2">{todo.todo}</span><span>{todo.isCompleted}</span>
      </div>
    );

    return (
      <div className="p-2 mt-4">
        <div className="d-flex justify-content-center">
          <h5 style={{ fontWeight: 'bold' }} onClick={this.checkProfileView}><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>ADD TO DO</h5>
        </div>
        <div className="mt-4">
          <h6 style={{ fontWeight: 'bold' }}>TO DO LIST</h6>
          {todos}
        </div>
      </div>

    );
  }
}
