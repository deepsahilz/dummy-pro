import React, { useState, useEffect } from 'react';
import ToDoList from './components/ToDoList';
import AddToDoForm from './components/AddToDoForm';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from backend
    fetch('https://todopankaj-server.vercel.app/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app-container font-nb">
      <h1 className="text-4xl font-rejouice font-semibold mb-2">To Do Pankaj</h1>
      <AddToDoForm setTodos={setTodos} />
      {todos.length === 0 ? (
        <h1 className="text-xl font-medium mt-4">No todos yet</h1>
      ) : (
        <ToDoList todos={todos} setTodos={setTodos} />
      )}
    </div>
  );
};

export default App;
