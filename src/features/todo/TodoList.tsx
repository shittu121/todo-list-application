// src/components/TodoList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo, updateTodo } from './TodoSlice';
import { RootState } from '@/store/store';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchTodos());
    }
  }, [dispatch, token]);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleStatus = (todo: { id: number; status: boolean }) => {
    dispatch(updateTodo({ ...todo, status: !todo.status }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Your Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>{todo.dueDate}</p>
            <p>{todo.status ? 'Completed' : 'Not Completed'}</p>
            <button onClick={() => handleToggleStatus(todo)}>Toggle Status</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
