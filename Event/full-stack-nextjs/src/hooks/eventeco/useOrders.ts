import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/services/eventeco/command/order/createOrder";

// export const useOrders = (eventSlug: string) => {
//     return useQuery({
//         queryKey: ["orders", eventSlug],
//         queryFn: () => getOrders(eventSlug),
//         staleTime: 1000 * 60 * 5,
//     });
// };

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, any>({
        mutationFn: async (orderData: any) => {
            const response = await createOrder(orderData);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });
};
