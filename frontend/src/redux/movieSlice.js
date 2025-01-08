import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';

export const fetchMovies = createAsyncThunk('fetchMovies', async (page = 1) => {
  const response = await axiosInstance.get(`movies?page=${page}`);
  return response.data;
});

export const fetchMovie = createAsyncThunk('fetchMovie', async (id) => {
  const response = await axiosInstance.get(`movies/${id}`);
  return response.data;
});

export const createMovie = createAsyncThunk('createMovie', async ({data, navigate}) => {
  await axiosInstance.post('/movies', data);
  navigate()
  toast.success('Movie created.')
});

export const updateMovie = createAsyncThunk('updateMovie', async ({id, data, navigate}) => {
  await axiosInstance.put(`/movies/${id}`, data);
  navigate()
  toast.success('Movie updated.')
});

export const deleteMovie = createAsyncThunk('deleteMovie', async (id) => {
  const response = await axiosInstance.delete(`movies/${id}`);
  return response.data;
});

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    movie: {},
    status: 'idle',
    error: null,
    loading: false,
    currentPage: 1,
    totalPages: 0
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.error = '';
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
        state.error = '';
      })
  }
});

export const { setCurrentPage } = movieSlice.actions;
export default movieSlice.reducer;
