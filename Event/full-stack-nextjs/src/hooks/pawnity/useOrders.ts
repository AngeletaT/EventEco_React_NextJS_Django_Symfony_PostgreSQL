import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/services/pawnity/command/order/createOrder";
import { getOrders } from "@/services/eventeco/queries/getOrders";

export const useOrdersByClient = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => getOrders(),
        staleTime: 1000 * 60 * 5,
    });
};

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
