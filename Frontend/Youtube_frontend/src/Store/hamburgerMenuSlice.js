import { createSlice } from "@reduxjs/toolkit";

const hamburgerMenu = createSlice({
    name: "hamburgerMenu",  // Optional but good practice to name your slice
    initialState: {
        isOpen: false
    },
    reducers: {
        setHamburgerMenu: (state) => {
            // Toggle the `isOpen` state
            state.isOpen = !state.isOpen;
        }
    }
});

export const { setHamburgerMenu } = hamburgerMenu.actions;
export default hamburgerMenu.reducer;
