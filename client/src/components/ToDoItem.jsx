import React from 'react';
import axios from 'axios';

const BASE_URL = 'https://todopankaj-server.vercel.app';
// const BASE_URL = 'http://localhost:5000';

const ToDoItem = ({ todo, setTodos }) => {
  const handleDelete = async () => {
    try {
      console.log(todo._id); // Accessing _id instead of id
      await axios.delete(`${BASE_URL}/todos/${todo._id}`); // Using axios for the DELETE request
      setTodos((prevTodos) =>
        Array.isArray(prevTodos)
          ? prevTodos.filter((item) => item._id !== todo._id) // Filtering by _id
          : []
      );
    } catch (error) {
      console.error('Error deleting to-do:', error);
    }
  };

  return (
    <li className="flex items-center">
      <span>{todo.title}</span>
      <button onClick={handleDelete} className="">
        Delete
      </button>
    </li>
  );
};

export default ToDoItem;
