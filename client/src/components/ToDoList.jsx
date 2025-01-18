import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = ({ todos, setTodos }) => {
  return (
    <ul>
      {todos.length === 0 || todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </ul>
  );
};

export default ToDoList;
