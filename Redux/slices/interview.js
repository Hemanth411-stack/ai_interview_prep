"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchInterviews = createAsyncThunk(
  'interview/fetchInterviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/generate');
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  interviews: [],
  loading: false,
  error: null
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    clearInterviews: (state) => {
      state.interviews = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInterviews.fulfilled, (state, action) => {
        state.loading = false;
        state.interviews = action.payload.data; 
        console.log(`interview list`,state.interviews)// Directly assign the payload
      })
      .addCase(fetchInterviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch interviews';
      });
  }
});

export const { clearInterviews } = interviewSlice.actions;
export default interviewSlice.reducer;