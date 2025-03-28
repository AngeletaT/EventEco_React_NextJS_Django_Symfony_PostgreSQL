import { djangoAPI_P, symfonyAPI_P } from "@/services/api";
import Cookies from "js-cookie";

export const logoutClientService = async () => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        localStorage.removeItem("accesstoken");
        localStorage.removeItem("userType");
        Cookies.remove("accesstoken");
        Cookies.remove("userType");

        const response = await djangoAPI_P.post("/client/auth/logout", {}, { headers });
        window.location.href = "/pawnity/home";
        return response.data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Failed to logout. Please check your credentials.");
    }
};

export const logoutOrganizerService = async () => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.post("/organizer/logout", {}, { headers });
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("userType");
        Cookies.remove("accesstoken");
        Cookies.remove("userType");
        window.location.href = "/pawnity/home";
        return response.data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Failed to logout. Please check your credentials.");
    }
};

export const logoutAdminService = async () => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.post("/admin/logout", {}, { headers });
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("userType");
        Cookies.remove("accesstoken");
        Cookies.remove("userType");
        window.location.href = "/pawnity/home";
        return response.data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Failed to logout. Please check your credentials.");
    }
};
