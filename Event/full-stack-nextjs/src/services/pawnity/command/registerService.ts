import { djangoAPI_P, symfonyAPI_P } from "../../api";
import { User } from "@/types/User";
import { RegisterData } from "@/types/Auth";

export const registerClientService = async (data: RegisterData): Promise<User> => {
    try {
        const response = await djangoAPI_P.post("/client/auth/register", data);
        return response.data as User;
    } catch (error) {
        console.error("Error during registration:", error);
        throw new Error("Failed to register. Please try again.");
    }
};

export const registerOrganizerService = async (data: RegisterData): Promise<User> => {
    try {
        const response = await symfonyAPI_P.post("/organizer/register", data);
        return response.data as User;
    } catch (error) {
        console.error("Error during registration:", error);
        throw new Error("Failed to register. Please try again.");
    }
};

export const registerAdminService = async (data: RegisterData): Promise<User> => {
    try {
        const response = await symfonyAPI_P.post("/admin/register", data);
        return response.data as User;
    } catch (error) {
        console.error("Error during registration:", error);
        throw new Error("Failed to register. Please try again.");
    }
};
