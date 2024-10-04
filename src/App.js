import axios from 'axios';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);      // State to store the list of todos
  const [newTodo, setNewTodo] = useState('');  // State to store the new todo input
  // Fetch the todos from the server when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch all todos from the backend
  const fetchTodos = async () => {
    try {
      axios.get("http://localhost:9009/todos").then((res)=>{
        setTodos(res.data);
      })
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;  // Ensure the input is not empty
    try {
      await axios.post("http://localhost:9009/todos",{newTodo}).then((res)=>{
        setTodos([...todos, res.data]);
        console.log(res.data);
      })
      setNewTodo('');  // Clear the input field
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Function to handle deleting a todo
  const deleteTodo = async (_id) => {
    try {
      await axios.delete("http://localhost:9009/todos/"+_id).then((res)=>{
        setTodos(todos.filter((todo) => todo._id !== _id)); 
      })
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App text-center container">
      <h1>To-Do List</h1>

{/* Input field to add new todo */}
<input
  type="text"
  placeholder="Add new todo"
  value={newTodo}
  onChange={(e) => setNewTodo(e.target.value)}
/>
<button onClick={addTodo}>Add To-Do</button>
<br></br>
{/* Display the list of todos */}
<div className='p-3'>
  {todos.map((todo) => (
    <li key={todo._id}>
      {todo.text}
      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </li>
  ))}
</div>
    </div>
  );
}

export default App;
