import React, { useState } from 'react';

const AddToDoForm = ({ setTodos }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add new to-do to backend
    const response = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    const newTodo = await response.json();
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className='mb-5 '>
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddToDoForm;
