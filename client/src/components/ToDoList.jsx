import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = ({ todos, setTodos }) => {
  if (!Array.isArray(todos) || todos.length === 0) {
    return <h2 className="text-lg font-medium mt-4">No todos to display</h2>;
  }

  return (
    <ul className=''>
      {todos.map((todo) => (
        <ToDoItem key={todo._id || todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </ul>
  );
};

export default ToDoList;
