import React, { Component } from 'react';
import TodoItem from '../presentational/TodoItem';
import styles from '../../style/todo.module.scss';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  handleInputChange(event) {
    this.setState({ newTodo: event.target.value });
  }

  addTodo() {
    if (this.state.newTodo.trim() === '') {
      return; // Don't add empty todos
    }
    this.setState(prevState => ({
      todos: [...prevState.todos, { text: prevState.newTodo, id: Date.now() }],
      newTodo: ''
    }));
  }

  removeTodo(idToRemove) {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== idToRemove)
    }));
  }

  render() {
    return (
      <div className={styles.todoContainer}>
        <h2>Todo List</h2>
        <div className={styles.inputArea}>
          <input
            type="text"
            value={this.state.newTodo}
            onChange={this.handleInputChange}
            placeholder="Add a new todo"
            className={styles.todoInput}
          />
          <button onClick={this.addTodo} className={styles.addButton}>Add</button>
        </div>
        <ul className={styles.todoList}>
          {this.state.todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              removeTodo={this.removeTodo}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;
