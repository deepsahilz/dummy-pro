import React, { useState } from 'react';
import axios from 'axios';
import loader_icon from '../assets/images/loader_icon2.svg'


const BASE_URL = 'https://todopankaj-server.vercel.app';
// const BASE_URL = 'http://localhost:5000';

const ToDoItem = ({ todo, setTodos }) => {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${BASE_URL}/todos/${todo._id}`); // Using axios for the DELETE request
      setTodos((prevTodos) =>
        Array.isArray(prevTodos)
          ? prevTodos.filter((item) => item._id !== todo._id) // Filtering by _id
          : []
      );
    } catch (error) {
      console.error('Error deleting to-do:', error);
    }
    setDeleting(false)
  };

  return (
    <li className="flex border-b items-center justify-between ml-[5px] py-2">
      <span>{todo.title}</span>
      <button disabled={deleting} onClick={handleDelete} className={`flex justify-center items-center  ${deleting&&('bg-[#0056b3]')}`}>
      {deleting?(<img className='w-5 h-5 animate-spin invert' src={loader_icon}/>):("Delete")}
      </button>
    </li>
  );
};

export default ToDoItem;
