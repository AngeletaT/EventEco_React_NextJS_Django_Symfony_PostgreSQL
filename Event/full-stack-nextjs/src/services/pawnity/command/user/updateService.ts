import { djangoAPI_P, symfonyAPI_P } from "@/services/api";
import Cookies from "js-cookie";
import { Client, Organizer, Admin } from "@/types/User";

export const updateClientService = async (updatedData: Partial<Client>): Promise<Client> => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await djangoAPI_P.put("/client/profile/me/update", updatedData, { headers });
        return response.data as Client;
    } catch (error) {
        console.error("Error updating user data:", error);
        throw new Error("Failed to update user data.");
    }
};

export const updateOrganizerService = async (updatedData: Partial<Organizer>): Promise<Organizer> => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.put("/organizer/profile", updatedData, { headers });

        return response.data as Organizer;
    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        throw new Error("No se pudo actualizar el perfil.");
    }
};

export const updateAdminService = async (updatedData: Partial<Admin>): Promise<Admin> => {
    return "updatedData" as unknown as Admin;
};
