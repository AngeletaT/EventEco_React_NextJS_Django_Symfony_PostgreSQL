import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client, Organizer, Admin } from "@/types/User";

interface AuthState {
    user: Client | Organizer | Admin | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ user: Client | Organizer | Admin }>) {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
