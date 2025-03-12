import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubevent } from "@/services/pawnity/command/subevents/createSubevent";
import { updateSubevent, toggleSubevent } from "@/services/pawnity/command/subevents/updateSubevent";
import { Subevent } from "@/types/Subevent";
import { useEventDetails } from "@/hooks/pawnity/useEvents";

export const useSubevents = (eventSlug: string | null) => {
    const { data: event, isLoading, isError, refetch } = useEventDetails(eventSlug);
    const subevents = event?.subevents || [];
    return { subevents, isLoading, isError, refetch };
};

export const useCreateSubevent = () => {
    const queryClient = useQueryClient();

    return useMutation<number, Error, { idevent: number; subeventData: Object }>({
        mutationFn: async ({ idevent, subeventData }: { idevent: number; subeventData: Object }) => {
            await createSubevent({ idevent, subeventData });
            return idevent;
        },
        onSuccess: (idevent) => {
            queryClient.invalidateQueries({ queryKey: ["subevents"] });
        },
    });
};

export const useUpdateSubevent = () => {
    const queryClient = useQueryClient();

    return useMutation<number, Error, { idsubevents: number; subeventData: Object }>({
        mutationFn: async ({ idsubevents, subeventData }: { idsubevents: number; subeventData: Object }) => {
            await updateSubevent({ idsubevents, subeventData });
            return idsubevents;
        },
        onSuccess: (idsubevents) => {
            queryClient.invalidateQueries({ queryKey: ["subevents", idsubevents] });
        },
    });
};

export const useToggleSubevent = () => {
    const queryClient = useQueryClient();

    return useMutation<number, Error, { idsubevents: number }>({
        mutationFn: async ({ idsubevents }: { idsubevents: number }) => {
            await toggleSubevent({ idsubevents });
            return idsubevents;
        },
        onSuccess: (idsubevents) => {
            queryClient.invalidateQueries({ queryKey: ["subevents", idsubevents] });
        },
    });
};
