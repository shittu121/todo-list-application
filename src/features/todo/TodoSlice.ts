import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { jwtDecode } from 'jwt-decode'; 

// Define types for Todo and the Todo state
interface Todo {
  id: number;
  title: string;
  description: string;
  status: boolean;
  dueDate: string;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

// Utility function to get the user ID (uuid) from the token
const getUserIdFromToken = (token: string | null) => {
  if (!token) return null;
  const decodedToken: { uuid: string } = jwtDecode(token);
  return decodedToken.uuid;
};

// Async thunk for fetching the todos
export const fetchTodos = createAsyncThunk<Todo[], void, { state: RootState }>(
  'todos/fetchTodos',
  async (_, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const userId = getUserIdFromToken(token); // Extract user ID from the token

    if (!userId) {
      return []; // Return empty if no user ID found (user not logged in)
    }

    const todos = JSON.parse(localStorage.getItem(`todos_${userId}`) || '[]');
    return todos; // return the fetched todos from localStorage
  }
);

// Async thunk for adding a new todo
export const addTodo = createAsyncThunk<Todo, Omit<Todo, 'id'>, { state: RootState }>(
  'todos/addTodo',
  async (todoData, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const userId = getUserIdFromToken(token); // Extract user ID from the token

    if (!userId) {
      throw new Error("User not authenticated"); // Handle if no user is logged in
    }

    const todos: Todo[] = JSON.parse(localStorage.getItem(`todos_${userId}`) || '[]');
    const newTodo = {
      ...todoData,
      id: Date.now(), // Use timestamp as unique ID
    };

    todos.push(newTodo);
    localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
    return newTodo; // return the newly added todo
  }
);

// Async thunk for updating a todo
export const updateTodo = createAsyncThunk<Todo, Todo, { state: RootState }>(
  'todos/updateTodo',
  async (updatedTodo, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const userId = getUserIdFromToken(token); // Extract user ID from the token

    if (!userId) {
      throw new Error("User not authenticated"); // Handle if no user is logged in
    }

    const todos: Todo[] = JSON.parse(localStorage.getItem(`todos_${userId}`) || '[]');

    const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      todos[index] = updatedTodo; // Update the todo
      localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
    }
    return updatedTodo; // return the updated todo
  }
);

// Async thunk for deleting a todo
export const deleteTodo = createAsyncThunk<number, number, { state: RootState }>(
  'todos/deleteTodo',
  async (todoId, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const userId = getUserIdFromToken(token); // Extract user ID from the token

    if (!userId) {
      throw new Error("User not authenticated"); // Handle if no user is logged in
    }

    const todos: Todo[] = JSON.parse(localStorage.getItem(`todos_${userId}`) || '[]');

    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
    localStorage.setItem(`todos_${userId}`, JSON.stringify(filteredTodos));
    return todoId; // return the ID of the deleted todo
  }
);

// Define the initial state for todos
const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// Create the slice for Todo
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchTodos
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.todos = action.payload; // Save the fetched todos
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle addTodo
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.loading = false;
      state.todos.push(action.payload); // Add new todo to the list
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle updateTodo
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.loading = false;
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload; // Update the todo in the list
      }
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle deleteTodo
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload); // Remove deleted todo
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default todoSlice.reducer;
