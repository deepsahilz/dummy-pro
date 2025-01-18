import React, { useState, useEffect } from 'react';
import ToDoList from './components/ToDoList';
import AddToDoForm from './components/AddToDoForm';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from backend (dummy fetch for now)
    fetch('https://todopankaj.vercel.app/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app-container font-nb">
      <h1 className='text-4xl font-rejouice font-semibold mb-2'>To Do Pankaj</h1>
      <AddToDoForm setTodos={setTodos} />
      <ToDoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
