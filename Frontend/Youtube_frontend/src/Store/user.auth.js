import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js';  // Import the user reducer

const store = configureStore({
  reducer: {
    user: userReducer,  // Set the user slice reducer
  },
});

export default store;
