import { djangoAPI_E, symfonyAPI_E } from "@/services/api";
import Cookies from "js-cookie";

export const logoutClientService = async () => {
    try {
        const accesstoken = localStorage.getItem("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        localStorage.removeItem("accesstoken");
        localStorage.removeItem("userType");
        Cookies.remove("accesstoken");
        Cookies.remove("userType");
        const response = await djangoAPI_E.post("/client/auth/logout", {}, { headers });
        window.location.href = "/eventeco/home";
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

        const response = await symfonyAPI_E.post("/organizer/logout", {}, { headers });
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("userType");
        Cookies.remove("accesstoken");
        Cookies.remove("userType");
        window.location.href = "/eventeco/home";
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

        const response = await symfonyAPI_E.post("/admin/logout", {}, { headers });
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("userType");
        Cookies.remove("accesstoken");
        Cookies.remove("userType");
        window.location.href = "/eventeco/home";
        return response.data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Failed to logout. Please check your credentials.");
    }
};
