import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');
  const [all, setAll] = useState('');
  const [dates, setDates] = useState('');

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error getting todos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter your todo");
      return;
    }
    const todoDate = date || new Date().toISOString().slice(0, 10);
    try {
      const response = await axios.post('http://localhost:3000/api/addtodos', { item: input, date: todoDate, completed: false });
      setTodos([...todos, response.data]);
      setInput('');
      setDate('');
      toast.success("Todo added successfully");
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:3000/api/delete-todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdate = async (id, newItem) => {
    try {
      await axios.put(`http://localhost:3000/api/update-todos/${id}`, { item: newItem });
      setTodos(todos.map(todo => (todo._id === id ? { ...todo, item: newItem } : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCheckbox = async (id, completed) => {
    try {
      await axios.put(`http://localhost:3000/api/checked-todos/${id}`, { completed });
      setTodos(todos.map(todo => (todo._id === id ? { ...todo, completed } : todo)));
    } catch (error) {
      console.error('Error checking todo:', error);
    }
  };

  const printtodos = todos.filter(todo => {
    if (all === 'completed') {
      return todo.completed;
    } else if (all === 'active') {
      return !todo.completed;
    }
    return true;
  });

  const dateTodos = dates ? printtodos.filter(todo => todo.date === dates) : printtodos;
  const sameDates = [...new Set(todos.map(todo => todo.date))];

  return (
    <>
      <ToastContainer />
      <div className="max-w-md mx-auto p-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">My Todos</h1>
        </div>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex items-center mb-4">
            <input className="flex-1 appearance-none border rounded py-2 px-3 mr-2" type="text" placeholder="Add Todo" value={input} onChange={e => setInput(e.target.value)} />
            <input className="appearance-none border rounded py-2 px-3 mr-2" type="date" value={date} onChange={e => setDate(e.target.value)} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Add</button>
          </div>
        </form>

        <div className="flex items-center mb-4">
          <select value={all} onChange={(e) => setAll(e.target.value)} className="mr-2">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
          <select value={dates} onChange={(e) => setDates(e.target.value)}>
            <option value="">All Dates</option>
            {sameDates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>

        <ul className="list-none">
          {dateTodos.map(todo => (
            <li key={todo._id} className="flex items-center mb-2">
              <input type="checkbox" checked={todo.completed} onChange={() => handleCheckbox(todo._id, !todo.completed)} className="mr-2" />
              <span>{todo.item} {todo.date}</span>
              <button onClick={() => handleDelete(todo._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-auto mr-2 rounded">Delete</button>
              <button onClick={() => handleUpdate(todo._id, prompt('Enter the edition'))} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Update</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
