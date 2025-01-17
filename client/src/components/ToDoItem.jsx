import React from 'react';

const ToDoItem = ({ todo, setTodos }) => {
  const handleDelete = async () => {
    await fetch(`http://localhost:5000/todos/${todo.id}`, { method: 'DELETE' });
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id));
  };

  return (
    <li className='flex items-center'>
      <span>{todo.title}</span>
      <button onClick={handleDelete} className=''>Delete</button>
    </li>
  );
};

export default ToDoItem;
