import { djangoAPI_E, symfonyAPI_E } from "@/services/api";
import { Client, Organizer, Admin } from "@/types/User";

export const updateClientService = async (updatedData: Partial<Client>): Promise<Client> => {
    try {
        const accesstoken = localStorage.getItem("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await djangoAPI_E.put("/client/profile/me/update", updatedData, { headers });
        return response.data as Client;
    } catch (error) {
        console.error("Error updating user data:", error);
        throw new Error("Failed to update user data.");
    }
};

export const updateOrganizerService = async (updatedData: Partial<Organizer>): Promise<Organizer> => {
    try {
        const accesstoken = localStorage.getItem("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_E.put("/organizer/profile", updatedData, { headers });

        return response.data as Organizer;
    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        throw new Error("No se pudo actualizar el perfil.");
    }
};

export const updateAdminService = async (updatedData: Partial<Admin>): Promise<Admin> => {
    return "updatedData" as unknown as Admin;
};
