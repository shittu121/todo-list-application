// src/types.ts

// Type definition for a single Todo item
export interface Todo {
    id: number;           // Unique identifier for each Todo item (e.g., 1, 2, 3)
    title: string;        // Title of the Todo (e.g., "Buy groceries")
    description: string;  // Description of the Todo (e.g., "Buy milk, eggs, and bread")
    dueDate: string;      // The due date for the Todo (e.g., '2024-12-31')
    status: boolean;      // Status indicating whether the Todo is completed (true) or not (false)
  }
  
  // Type definition for the Todo state in Redux
  export interface TodoState {
    todos: Todo[];        // List of Todo items
    loading: boolean;     // Boolean indicating if data is being loaded
    error: string | null; // Error message, if any, or null if no error
  }
  