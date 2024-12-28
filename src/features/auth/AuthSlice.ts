import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { toast } from 'react-toastify';

interface UserData {
  username: string;
  email: string;
  password: string;
}

// The API base URL
const API_URL = process.env.REACT_APP_API_URL;

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    userData: UserData,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error: any) {
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

      // Decode token to get expiration time
      const decodedToken: any = jwtDecode(token);
      
      // Store the expiration time
      localStorage.setItem('expiresIn', decodedToken.exp.toString());

      return token; // return the token if successful
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
  expiresIn: number; // Add expiresIn to track token expiration time
}

// Initial state
const initialState: AuthState = {
  loading: false,
  error: null, 
  success: false,
  token: localStorage.getItem('token') || null, // Load token from localStorage
  expiresIn: parseInt(localStorage.getItem('expiresIn') || '0', 10), // Load expiration time
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
      localStorage.removeItem('expiresIn'); // Clear expiration time
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
      state.token = action.payload;

      // Decode and log the token details
      const token = localStorage.getItem('token');
      const decodedToken: any = jwtDecode(token || '');
      
      // Store expiration time
      localStorage.setItem('expiresIn', decodedToken.exp.toString());

      // Check token expiration
      const now = Math.floor(Date.now() / 1000); // Current time in Unix timestamp
      if (decodedToken.exp < now) {
        localStorage.removeItem('token'); // Remove token
        localStorage.removeItem('expiresIn'); // Remove expiration time
        state.token = null; // Set token to null
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
  },
});

// Periodically check token expiration
setInterval(() => {
  const token = localStorage.getItem('token');
  const decodedToken: any = jwtDecode(token || '');
  const now = Math.floor(Date.now() / 1000); // Current Unix timestamp
  if (decodedToken.exp < now) {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    authSlice.actions.logout(); // Trigger logout
    toast.error("Login Session Expired, login again!")
  }
}, 30 * 1000); // Check every 30 seconds

export const { resetState, logout } = authSlice.actions;

export default authSlice.reducer;
