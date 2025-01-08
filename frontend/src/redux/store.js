import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice'; // Import the slice reducer
import userSlice from './userSlice'; // Import the slice reducer

// Create the Redux store using configureStore
const store = configureStore({
  reducer: {
    movie: movieReducer,  // Register movie slice
    user: userSlice,  // Register user slice
  },
});

export default store;