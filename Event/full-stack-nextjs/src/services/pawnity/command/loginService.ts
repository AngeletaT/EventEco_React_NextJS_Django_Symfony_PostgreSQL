import { djangoAPI_P, symfonyAPI_P } from "../../api";
import { User } from "@/types/User";
import { LoginData } from "@/types/Auth";

export const loginClientService = async (data: LoginData): Promise<User> => {
    try {
        const response = await djangoAPI_P.post("/client/auth/login", data);
        return response.data as User;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Failed to login. Please check your credentials.");
    }
};

export const loginOrganizerService = async (data: LoginData): Promise<User> => {
    try {
        const response = await symfonyAPI_P.post("/organizer/login", data);
        return response.data as User;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Failed to login. Please check your credentials.");
    }
};

export const loginAdminService = async (data: LoginData): Promise<User> => {
    try {
        const response = await symfonyAPI_P.post("/admin/login", data);
        return response.data as User;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Failed to login. Please check your credentials.");
    }
};
