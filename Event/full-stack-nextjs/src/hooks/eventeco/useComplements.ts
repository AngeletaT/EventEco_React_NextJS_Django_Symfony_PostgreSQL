import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComplements } from "@/services/eventeco/queries/getComplements";
import { createComplement } from "@/services/eventeco/command/complements/createComplement";
import { updateComplement, toggleComplement } from "@/services/eventeco/command/complements/updateComplement";
import { Complement } from "@/types/Complement";

export const useComplements = (eventSlug: string) => {
    return useQuery<Complement[]>({
        queryKey: ["complements", eventSlug],
        queryFn: () => getComplements(eventSlug),
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateComplement = () => {
    const queryClient = useQueryClient();

    return useMutation<string, Error, { eventSlug: string; complementData: Partial<Complement> }>({
        mutationFn: async ({ eventSlug, complementData }: { eventSlug: string; complementData: Partial<Complement> }) => {
            await createComplement({ eventSlug, complementData });
            return eventSlug;
        },
        onSuccess: (eventSlug) => {
            queryClient.invalidateQueries({ queryKey: ["complements", eventSlug] });
        },
    });
};

export const useUpdateComplement = () => {
    const queryClient = useQueryClient();

    return useMutation<number, Error, { idComplement: number; complementData: Partial<Complement> }>({
        mutationFn: async ({ idComplement, complementData }: { idComplement: number; complementData: Partial<Complement> }) => {
            await updateComplement({ idComplement, complementData });
            return idComplement;
        },
        onSuccess: (idComplement, { complementData }) => {
            queryClient.invalidateQueries({ queryKey: ["complements", complementData.eventSlug] });
        },
    });
};

export const useToggleComplement = () => {
    const queryClient = useQueryClient();

    return useMutation<number, Error, { idComplement: number; complementData: Partial<Complement> }>({
        mutationFn: async ({ idComplement, complementData }: { idComplement: number; complementData: Partial<Complement> }) => {
            await toggleComplement({ idComplement, complementData });
            return idComplement;
        },
        onSuccess: (idComplement: number, { complementData }: { complementData: Partial<Complement> }) => {
            queryClient.invalidateQueries({ queryKey: ["complements", complementData.eventSlug] });
        },
    });
};
