import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './TodoSlice';
import { AppDispatch } from '@/store/store'; 
import { todoSchema, TodoInput } from '@/lib/todoValidation'; // Import Zod schema for validation
import { Input } from '@/components/ui/input';

const AddTodo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Store validation errors

  // Handle form submission
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: TodoInput = {
      title,
      description,
      status: false,  
      dueDate,
    };

    // Validate the input with Zod
    const result = todoSchema.safeParse(newTodo); // safeParse returns a result object

    if (result.success) {
      // If validation passes, dispatch the async action
      dispatch(addTodo(newTodo));

      // Clear the input fields
      setTitle('');
      setDescription('');
      setDueDate('');
      setErrors({}); // Clear errors
    } else {
      // If validation fails, set the errors
      const formattedErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message; // Mapping the error messages
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className=''>
      <h2>Add a New Todo</h2>
      <form className='space-y-10 mt-10'>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='text-2xl w-full h-20'
        />
        {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>} {/* Display error for title */}
  
        <textarea
          placeholder="Description"
          className='w-full text-2xl h-40 resize-none dark:bg-[#252525]'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>} {/* Display error for description */}
  
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="text-2xl h-20 w-full appearance-none date-types relative bg-transparent dark:text-white dark:placeholder-white"
        />
        
        {errors.dueDate && <p style={{ color: 'red' }}>{errors.dueDate}</p>} {/* Display error for dueDate */}
  
        <button onClick={handleAdd}
           className="text-[1.5rem] py-8 w-full bg-[#050c9c] text-white hover:bg-[#03075e] transition-all duration-300 ease-in-out disabled:cursor-not-allowed"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
