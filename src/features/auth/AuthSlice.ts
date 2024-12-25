import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// The API base URL
const API_URL = 'http://localhost:8000/api/v1/auth/';

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    userData: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log("error:", error.msg)
      return rejectWithValue(error.msg || 'Registration failed');
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const { token } = response.data;

      // Save token in localStorage
      localStorage.setItem('token', token);
      console.log("Token: ", token);

      return token; // return the token if successful
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.msg || 'Login failed');
    }
  }
);


// Define the type for the initial state
interface AuthState {
  loading: boolean;
  error: string | null; // Error can be a string or null if no error exists
  success: boolean;
  token: string | null;
}

// Initial state
const initialState: AuthState = {
  loading: false,
  error: null, // Default to `null` (no error)
  success: false,
  token: localStorage.getItem('token') || null, // Load token from localStorage
};

// Auth slice for registration
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
    },
    logout: (state) => {
        state.token = null; // Clear token
        localStorage.removeItem('token'); // Clear token from localStorage
    },
  },
  extraReducers: (builder) => {
    // Handle registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null; // Reset error on new request
      state.success = false;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null; // Clear error on success
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string; // Store error message
      state.success = false;
    });

    // Handle Auth
    
    builder.addCase(loginUser.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.token = action.payload; // Set token on successful login
    });
      builder.addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false; // Reset success state
    });
  },
});

export const { resetState, logout } = authSlice.actions;

export default authSlice.reducer;
