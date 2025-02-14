import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client, Organizer, Admin } from "@/types/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClient, getOrganizer, getAdmin } from "@/services/eventeco/queries/getUser";
import { logoutClientService, logoutOrganizerService, logoutAdminService } from "@/services/eventeco/command/user/logoutService";

interface AuthState {
    user: Client | Organizer | Admin | null;
    userType: "client" | "organizer" | "admin" | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    userType: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
    try {
        const userType = localStorage.getItem("userType");
        if (!userType) throw new Error("No user type available");

        let user: Client | Organizer | Admin;
        switch (userType) {
            case "client":
                user = await getClient();
                break;
            case "organizer":
                user = await getOrganizer();
                break;
            case "admin":
                user = await getAdmin();
                break;
            default:
                throw new Error("Invalid user type");
        }

        return { user, userType };
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        } else {
            return rejectWithValue("An unknown error occurred");
        }
    }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
    try {
        const userType = localStorage.getItem("userType");
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
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<{ user: Client | Organizer | Admin; userType: string }>) => {
                state.user = action.payload.user;
                state.userType = action.payload.userType as "client" | "organizer" | "admin";
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
            })
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
