// src/types.ts

// Type definition for Todo item
export interface Todo {
    id: number;           
    title: string;        
    description: string;  
    dueDate: string;      
    status: boolean;     
  }
  
  // Type definition for the Todo state in Redux
  export interface TodoState {
    todos: Todo[];        
    loading: boolean;     
    error: string | null; 
  }
  