import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';

const entity = 'users'

export const fetchAllProducers = createAsyncThunk('fetchAllProducers', async () => {
  const response = await axiosInstance.get(`${entity}/producers`);
  return response.data;
});

export const fetchAllActors = createAsyncThunk('fetchAllActors', async () => {
  const response = await axiosInstance.get(`${entity}/actors`);
  return response.data;
});

export const createUser = createAsyncThunk('createUser', async ({ data, setModalData }) => {
  const response = await axiosInstance.post(entity, data);
  setModalData()
  toast.success(response.data.message)
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
      .addCase(fetchAllProducers.fulfilled, (state, action) => {
        state.loading = false;
        state.producers = action.payload;
        state.error = '';
      })
      .addCase(fetchAllActors.fulfilled, (state, action) => {
        state.loading = false;
        state.actors = action.payload;
        state.error = '';
      });
  }
});

export default userSlice.reducer;
