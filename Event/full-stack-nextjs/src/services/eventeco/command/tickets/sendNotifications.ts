import { ultramessage, resend } from "@/services/api";

interface EmailBody {
    to: string;
    subject: string;
    html: string;
}

export const sendWhatsapp = async (whatsappBody: any) => {
    try {
        console.log("Sending WhatsApp notification to:", whatsappBody);
        const response = await ultramessage.post(`/payment/notification/`, whatsappBody);
        console.log("WhatsApp notification sent:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending the message:", error);
        throw new Error("Failed to send WhatsApp notification.");
    }
};

export const sendEmail = async (emailBody: EmailBody) => {
    try {
        const response = await resend.post(`/feedback/send/`, emailBody);
        return response.data;
    } catch (error) {
        console.error("Error sending the email:", error);
        throw new Error("Failed to send email notification.");
    }
};
