import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo, updateTodo } from './TodoSlice';
import { RootState } from '@/store/store';
import { Todo } from '@/types';
import { AppDispatch } from '@/store/store';
import { FaToggleOn, FaToggleOff, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import FilterButtons from './FilterButton';
import { EditTodoModalForm } from './EditTodoModal';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Fetch todos from the Redux state
  const { filteredTodos, loading, error } = useSelector((state: RootState) => state.todos);
  const { token } = useSelector((state: RootState) => state.auth);

  // Fetch todos when the component mounts or token changes
  useEffect(() => {
    if (token) {
      dispatch(fetchTodos());
    }
  }, [dispatch, token]);

  // Handle delete action
  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  // Handle status toggle action
  const handleToggleStatus = (todo: Todo) => {
    dispatch(updateTodo({ ...todo, status: !todo.status }));
  };

  // Handle todo update (from the EditTodoModalForm)
  const handleSaveTodo = (updatedTodo: Todo) => {
    dispatch(updateTodo(updatedTodo));
  };

  // Loading or error states
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="border-b border-gray-300 py-5 mx-10 lg:mx-20 md:mx-20 my-10 space-y-14 lg:space-y-5 md:space-y-5">
      <h1 className="text-2xl font-semibold">Your Todo List</h1>

      {/* Filter Button and Search */}
      <FilterButtons />

      {/* Conditional rendering when there are no todos */}
      {filteredTodos.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-xl">You don't have any todos, add one now!</p>
        </div>
      ) : (
        <div className="">
          {/* Render Todos */}
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="mb-4 border-t py-4 hover:bg-gray-50 dark:hover:bg-[#1e1f21] transition-colors duration-200"
            >
              <div className="flex items-center px-4 justify-between dark:text-white">
                {/* Todo Title, Description, and Due Date */}
                <div className="text-xl lg:2xl">
                  <div className="block lg:flex md:flex items-center">
                    <span
                      className={`mr-4 text-2xl font-semibold dark:text-white ${
                        todo.status ? 'line-through text-gray-400' : 'text-gray-800'
                      }`}
                    >
                      {todo.title}
                    </span>
                    <p className="text-gray-600 py-2 dark:text-white lg:py-0 md:py-0 px-0 lg:px-24 md:px-20 pt-2 lg:pt-5 md:pt-5">
                      {todo.description}
                    </p>
                  </div>
                  <p className="text-gray-500 dark:text-white">{todo.dueDate}</p>
                </div>

                {/* Todo Actions */}

                <div className="flex items-center space-x-3 ml-8 mt-2 sm:mt-0">

                  {/* Todo Edit */}
                  
                  <EditTodoModalForm todo={todo} onSave={handleSaveTodo} />

                  {/* Toggle Status Button */}

                  <button
                    className="text-sm p-2 rounded-md sm-hidden transition-colors duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
                    onClick={() => handleToggleStatus(todo)}
                  >
                    {todo.status ? (
                      <FaToggleOff className="text-blue-500 h-10 w-10" />
                    ) : (
                      <FaToggleOn className="text-green-500 h-10 w-10" />
                    )}
                  </button>

                  {/* Delete Button */}
                  <button
                    className="text-sm p-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-red-600 hover:text-white"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <FaTrash className="text-red-500 h-8 w-8" />
                  </button>

                  {/* Mark Completed Button (only show when the todo is not completed) */}
                  {!todo.status && (
                    <button
                      className="text-sm p-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-green-600 hover:text-white"
                      onClick={() => handleToggleStatus(todo)}
                    >
                      <FaCheck className="text-green-500 h-8 w-8" />
                    </button>
                  )}

                  {/* Mark Incomplete Button (only show when the todo is completed) */}
                  {todo.status && (
                    <button
                      className="text-sm p-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-yellow-600 hover:text-white"
                      onClick={() => handleToggleStatus(todo)}
                    >
                      <FaTimes className="text-yellow-500 h-8 w-8" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
