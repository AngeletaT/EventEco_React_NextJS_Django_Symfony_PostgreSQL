import { djangoAPI_P, symfonyAPI_P } from "@/services/api";
import { Client, Organizer, Admin } from "@/types/User";

export const getClient = async (): Promise<Client> => {
    try {
        const accesstoken = localStorage.getItem("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const authResponse = await djangoAPI_P.get("/client/auth/me", { headers });
        const authUser = authResponse.data as Client;

        const profileResponse = await djangoAPI_P.get("/client/profile/me", { headers });
        const profileUser = profileResponse.data as Client;

        const user = { ...authUser, ...profileUser };
        return user;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error("Failed to fetch user data.");
    }
};

export const getOrganizer = async (): Promise<Organizer> => {
    try {
        const accesstoken = localStorage.getItem("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const authResponse = await symfonyAPI_P.get("/organizer/current_user", { headers });
        const authUser = authResponse.data as Organizer;
        console.log("authUser", authUser);

        const profileResponse = await symfonyAPI_P.get("/organizer/profile", { headers });
        const profileUser = profileResponse.data as Organizer;
        console.log("profileUser", profileUser);

        const user = { ...authUser, ...profileUser };

        console.log("user", user);
        return user;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error("Failed to fetch user data.");
    }
};

export const getAdmin = async (): Promise<Admin> => {
    try {
        const accesstoken = localStorage.getItem("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const authResponse = await symfonyAPI_P.get("/admin/me", { headers });
        const authUser = authResponse.data as Admin;

        const profileResponse = await symfonyAPI_P.get("/admin/profile/me", { headers });
        const profileUser = profileResponse.data as Admin;

        const user = { ...authUser, ...profileUser };

        console.log("user", user);
        return user;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error("Failed to fetch user data.");
    }
};
