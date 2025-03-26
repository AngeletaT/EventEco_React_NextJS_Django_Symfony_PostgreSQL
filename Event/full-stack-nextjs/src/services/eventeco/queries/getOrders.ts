import { djangoAPI_E, symfonyAPI_E } from "@/services/api";
import Cookies from "js-cookie";

export const getOrders = async () => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await djangoAPI_E.get(`/order/dashboard/`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories.");
    }
};
