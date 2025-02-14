import { Client, Organizer, Admin } from "@/types/User";

export interface UserState {
    user: Client | Organizer | Admin | null;
    userType: "client" | "organizer" | "admin" | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
