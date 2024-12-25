// src/components/AddTodo.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './TodoSlice';

const AddTodo: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAdd = () => {
    const newTodo = {
      title,
      description,
      status: false,
      dueDate,
    };

    dispatch(addTodo(newTodo));

    // Clear the input fields
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div>
      <h2>Add a New Todo</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleAdd}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
