import { stripe } from "../../../api";

export const processStripePayment = async (paymentBody: any) => {
    try {
        const response = await stripe.post(`/payment`, paymentBody);
        const data = response.data as { clientSecret: string };
        return data.clientSecret;
    } catch (error) {
        throw new Error("Error al procesar el pago con Stripe.");
    }
};
