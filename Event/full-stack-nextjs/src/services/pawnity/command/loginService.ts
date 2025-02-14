import { djangoAPI_P, symfonyAPI_P } from "../../api";
import Cookies from "js-cookie";
import { Client, Organizer, Admin } from "@/types/User";
import { LoginData } from "@/types/Auth";

export const loginClientService = async (data: LoginData): Promise<Client> => {
    try {
        const response = await djangoAPI_P.post("/client/auth/login", data);
        const user = response.data as Client;
        if (user.accesstoken) {
            localStorage.setItem("accesstoken", user.accesstoken);
            localStorage.setItem("userType", "client");
            Cookies.set("accesstoken", user.accesstoken, { expires: 7 });
            Cookies.set("userType", "client", { expires: 7 });
        }
        return user;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Failed to login. Please check your credentials.");
    }
};

export const loginOrganizerService = async (data: LoginData): Promise<Organizer> => {
    try {
        const response = await symfonyAPI_P.post("/organizer/login", data);
        console.log("response.data", response.data);
        const user = response.data as Organizer;
        if (user.accesstoken) {
            localStorage.setItem("accesstoken", user.accesstoken);
            localStorage.setItem("userType", "organizer");
            Cookies.set("accesstoken", user.accesstoken, { expires: 7 });
            Cookies.set("userType", "organizer", { expires: 7 });
        }
        return user;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Failed to login. Please check your credentials.");
    }
};

export const loginAdminService = async (data: LoginData): Promise<Admin> => {
    try {
        const response = await symfonyAPI_P.post("/admin/login", data);
        console.log("response.data", response.data);
        const user = response.data as Admin;
        if (user.accesstoken) {
            localStorage.setItem("accesstoken", user.accesstoken);
            localStorage.setItem("userType", "admin");
            Cookies.set("accesstoken", user.accesstoken, { expires: 7 });
            Cookies.set("userType", "admin", { expires: 7 });
        }
        return user;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Failed to login. Please check your credentials.");
    }
};
