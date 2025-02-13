import { djangoAPI_P, symfonyAPI_P } from "../../api";

export const logoutClientService = async () => {
    try {
        const accesstoken = localStorage.getItem("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        localStorage.removeItem("accesstoken");
        localStorage.removeItem("userType");
        const response = await djangoAPI_P.post("/client/auth/logout", {}, { headers });
        return response.data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Failed to logout. Please check your credentials.");
    }
};

export const logoutOrganizerService = async () => {
    try {
        const accesstoken = localStorage.getItem("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.post("/organizer/logout", {}, { headers });
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("userType");
        return response.data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Failed to logout. Please check your credentials.");
    }
};

export const logoutAdminService = async () => {
    try {
        const accesstoken = localStorage.getItem("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.post("/admin/logout", {}, { headers });
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("userType");
        return response.data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Failed to logout. Please check your credentials.");
    }
};
