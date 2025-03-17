import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Client, Organizer, Admin } from "@/types/User";
import { UserState } from "@/types/UserState";
import { logoutClientService, logoutOrganizerService, logoutAdminService } from "@/services/pawnity/command/user/logoutService";

const initialState: UserState = {
    user: null,
    userType: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
    try {
        const userType = Cookies.get("userType");
        if (!userType) throw new Error("No user type available");

        switch (userType) {
            case "client":
                await logoutClientService();
                break;
            case "organizer":
                await logoutOrganizerService();
                break;
            case "admin":
                await logoutAdminService();
                break;
            default:
                throw new Error("Invalid user type");
        }

        return null;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        } else {
            return rejectWithValue("An unknown error occurred");
        }
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ user: Client | Organizer | Admin }>) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.userType = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
