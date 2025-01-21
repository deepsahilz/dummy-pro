import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://todopankaj-server.vercel.app'; 
// const BASE_URL = 'http://localhost:5000'; 

const AddToDoForm = ({ setTodos }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add new to-do to backend
      const response = await axios.post(`${BASE_URL}/todos`, { title });
      console.log(response.data);
      setTodos((prevTodos) => {
        console.log("Previous todos:", prevTodos);
    
        if (Array.isArray(prevTodos)) {
            console.log("Previous todos is an array. Adding new data to it.");
            const updatedTodos = [...prevTodos, response.data.todo];
            console.log("Updated todos:", updatedTodos);
            return updatedTodos;
        } else {
            console.log("Previous todos is not an array. Initializing with new data.");
            const newTodos = [response.data];
            console.log("New todos:", newTodos);
            return newTodos;
        }
    });

      setTitle('');
    } catch (error) {
      console.error('Error adding to-do:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
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
