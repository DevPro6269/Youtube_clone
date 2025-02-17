import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    user: null,  // Initially, no user is logged in
    isLoggedIn: false,  // Initially, user is not logged in
  },
  reducers: {
    setLoggedIn: (state, action) => {
      // This action should carry user data (e.g., token, user info)
      state.user = action.payload;  // Set user data from the action payload
      state.isLoggedIn = true;  // Mark user as logged in
    },
    setLoggedOut: (state) => {
      // When logging out, reset the user data and isLoggedIn to false
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = user.actions;

export default user.reducer;
