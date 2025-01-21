import React, { useState } from 'react';
import axios from 'axios';
import loader_icon from '../assets/images/loader_icon2.svg'

const BASE_URL = 'https://todopankaj-server.vercel.app'; 
// const BASE_URL = 'http://localhost:5000'; 

const AddToDoForm = ({ setTodos }) => {
  const [title, setTitle] = useState('');
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdding(true);

    try {
      
      // Add new to-do to backend
      const response = await axios.post(`${BASE_URL}/todos`, { title });
      console.log(response.data);
      setTodos((prevTodos) => {
        //console.log("Previous todos:", prevTodos);
    
        if (Array.isArray(prevTodos)) {
            //console.log("Previous todos is an array. Adding new data to it.");
            const updatedTodos = [...prevTodos, response.data.todo];
            //console.log("Updated todos:", updatedTodos);
            return updatedTodos;
        } else {
            //console.log("Previous todos is not an array. Initializing with new data.");
            const newTodos = [response.data];
            //console.log("New todos:", newTodos);
            return newTodos;
        }
    }
    );
      setTitle('');
      setAdding(false);
    } catch (error) {
      console.error('Error adding to-do:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 flex gap-[10px]">
      <input
        className='p-[8px] flex-1 border border-[#ccc]; rounded-lg'
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button className={`flex justify-center items-center ${adding&&('bg-[#0056b3]')}`} type="submit" disabled={adding}>
      {adding?(<img className='w-5 h-5 animate-spin invert' src={loader_icon}/>):("Add")}
      </button>
    </form>
  );
};

export default AddToDoForm;
