import React, { useState } from "react";
import { Todo } from "@/types";
import { Input } from "@/components/ui/input";

interface EditTodoProps {
  todo: Todo;
  onCancel: () => void;
  onSave: (updatedTodo: Todo) => void;
}

  const EditTodo: React.FC<EditTodoProps> = ({ todo, onCancel, onSave }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [dueDate, setDueDate] = useState(todo.dueDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...todo, title, description, dueDate });
  };

  return (
    <div className="px-4">
        <h1>Edit Todo</h1>
        <form onSubmit={handleSubmit} className="space-y-10 mt-10">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className='text-2xl w-full h-20 dark:bg-[#252525]'
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
              className='w-full text-2xl h-40 resize-none dark:bg-[#252525]'
            />
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="dark:bg-[#252525]"
            />
            <button type="submit"
              className="text-[1.5rem] py-8 w-full bg-[#050c9c] text-white hover:bg-[#03075e] transition-all duration-300 ease-in-out disabled:cursor-not-allowed">
              Save
            </button>
            <button type="button" className="hidden" onClick={onCancel}>
              Cancel
            </button>
        </form>
    </div>
  );
};

export default EditTodo;
