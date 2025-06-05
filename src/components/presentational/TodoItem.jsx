import React from 'react';
import styles from '../../style/todo.module.scss';

const TodoItem = ({ todo, removeTodo }) => {
  return (
    <li className={styles.todoItem}>
      {todo.text}
      <button onClick={() => removeTodo(todo.id)} className={styles.removeButton}>Remove</button>
    </li>
  );
};

export default TodoItem;
