import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import ToDoList from './components/ToDoList';
import AddToDoForm from './components/AddToDoForm';

// const BASE_URL = 'http://localhost:5000';
const BASE_URL = 'https://todopankaj-server.vercel.app'; 

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch todos from backend using axios
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/todos`); // Use axios to get data
        setTodos(data);
      } catch (err) {
        setError(err.message); // Handle any errors
        console.error(err);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return <h1 className="text-xl font-medium mt-4">Loading...</h1>;
  }

  // if (error) {
  //   return <h1 className="text-xl font-medium mt-4 text-red-500">{`Error: ${error}`}</h1>;
  // }

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
