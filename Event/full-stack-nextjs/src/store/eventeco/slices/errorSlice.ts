import { createSlice } from "@reduxjs/toolkit";

interface ErrorState {
    visible: boolean;
    title: string | null;
    message: string | null;
}

const initialState: ErrorState = {
    visible: false,
    title: null,
    message: null,
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        showError: (state, action) => {
            state.visible = true;
            state.title = action.payload.title || "Error";
            state.message = action.payload.message || "Algo salió mal.";
        },
        hideError: (state) => {
            state.visible = false;
            state.title = null;
            state.message = null;
        },
    },
});

export const { showError, hideError } = errorSlice.actions;
export default errorSlice.reducer;
