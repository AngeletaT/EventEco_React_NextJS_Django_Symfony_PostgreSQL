import { djangoAPI_P, symfonyAPI_P } from "@/services/api";
import Cookies from "js-cookie";
import { Pet } from "@/types/pawnity/Pet";
import { GetPetsParams } from "@/types/pawnity/GetPetsParams";

export const getPets = async (): Promise<Pet[]> => {
    try {
        const response = await djangoAPI_P.get("/pets/listPets?page_size=40");
        const data = response.data as { results: Pet[] };
        const pets = data.results;
        return pets;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events.");
    }
};

export const getPetsPerPage = async ({
    pageParam = 1,
    pageSize = 5,
    gender,
    idorg,
    species,
}: GetPetsParams): Promise<{
    pets: Pet[];
    total_pages: number;
    count: number;
}> => {
    const params = new URLSearchParams({
        page: pageParam.toString(),
        page_size: pageSize.toString(),
    });
    if (gender) params.append("gender", gender);
    if (idorg) params.append("idorg", idorg.toString());
    if (species) params.append("species", species);

    const response = await djangoAPI_P.get(`/pets/listPets?${params.toString()}`);
    const data = response.data as {
        results: Pet[];
        total_pages: number;
        count: number;
    };

    return {
        pets: data.results,
        total_pages: data.total_pages,
        count: data.count,
    };
};

export const getPetsByOrganizer = async (idOrg: number): Promise<any> => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.get(`organizer/${idOrg}/pets`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching pets:", error);
        throw new Error("Failed to fetch pets.");
    }
};

export const getAdoptionsByOrganizer = async (idOrg: number): Promise<any> => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.get(`organizer/${idOrg}/adoptions`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching adoptions:", error);
        throw new Error("Failed to fetch adoptions.");
    }
};

export const getSubscriptionsByOrganizer = async (idOrg: number): Promise<any> => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.get(`organizer/${idOrg}/sponsorships`, { headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        throw new Error("Failed to fetch subscriptions.");
    }
};
