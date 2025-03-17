import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Client, Organizer, Admin } from "@/types/User";
import { UserState } from "@/types/UserState";
import { getClient, getOrganizer, getAdmin } from "@/services/pawnity/queries/getUser";
import { updateClientService, updateOrganizerService, updateAdminService } from "@/services/pawnity/command/user/updateService";

const initialState: UserState = {
    user: null,
    userType: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
    try {
        const userType = Cookies.get("userType");
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

export const updateUser = createAsyncThunk("auth/updateUser", async (updatedData: Partial<Client | Organizer | Admin>, { rejectWithValue }) => {
    try {
        const userType = Cookies.get("userType");
        if (!userType) throw new Error("No user type available");

        let user: Client | Organizer | Admin;
        switch (userType) {
            case "client":
                user = await updateClientService(updatedData as Partial<Client>);
                break;
            case "organizer":
                user = await updateOrganizerService(updatedData as Partial<Organizer>);
                break;
            case "admin":
                user = await updateAdminService(updatedData as Partial<Admin>);
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

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
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
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<{ user: Client | Organizer | Admin; userType: string }>) => {
                state.user = action.payload.user;
                state.userType = action.payload.userType as "client" | "organizer" | "admin";
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
            });
    },
});

export default userSlice.reducer;
