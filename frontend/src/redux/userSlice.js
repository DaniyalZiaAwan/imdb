import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';

export const fetchAllProducers = createAsyncThunk('fetchAllProducers', async () => {
  const response = await axiosInstance.get('users/producers');
  return response.data;
});

export const fetchAllActors = createAsyncThunk('fetchAllActors', async () => {
  const response = await axiosInstance.get('users/actors');
  return response.data;
});

export const createUser = createAsyncThunk('createUser', async ({ data, setModalData }) => {
  await axiosInstance.post('/users', data);
  setModalData()
  toast.success(`${data.type} created.`)
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    producers: [],
    actors: [],
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllActors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducers.fulfilled, (state, action) => {
        state.loading = false;
        state.producers = action.payload;
        state.error = '';
      })
      .addCase(fetchAllActors.fulfilled, (state, action) => {
        state.loading = false;
        state.actors = action.payload;
        state.error = '';
      })
      .addCase(fetchAllProducers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllActors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  }
});

export default userSlice.reducer;
