"use client";

import React, { useState } from "react";
import { useNominateTickets } from "@/hooks/eventeco/useTickets";
import { sendEmail } from "@/services/eventeco/command/tickets/sendNotifications";
import QRCode from "qrcode";
import { Button, InputText, Toast, Dialog } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/TicketPurchase.module.css";
import { useSelector } from "react-redux";
import { render } from "@react-email/render";
import TicketConfirmationEmail from "./TicketConfirmationEmail";

const StepNominateTickets: React.FC<{ idorder: number | null; ticketUnits: any[]; onPrev: () => void; orderData: any; event: any }> = ({
    idorder,
    ticketUnits,
    onPrev,
    orderData,
    event,
}) => {
    const toast = React.useRef<Toast>(null);
    const nominateTickets = useNominateTickets();
    const user = useSelector((state: any) => state.user.user);
    const [ticketAssignments, setTicketAssignments] = useState(
        ticketUnits.map((ticket) => ({
            ticketunitid: ticket.idticketunit,
            ticketunitcode: ticket.code,
            nameassistant: "",
            dniassistant: "",
        }))
    );
    const [dialogVisible, setDialogVisible] = useState(false);

    const handleInputChange = (index: number, field: keyof (typeof ticketAssignments)[0], value: string) => {
        setTicketAssignments((prev) => prev.map((ticket, i) => (i === index ? { ...ticket, [field]: value } : ticket)));
    };

    const handleNominate = async () => {
        if (!idorder || ticketAssignments.some((ticket) => !ticket.nameassistant || !ticket.dniassistant)) {
            toast.current?.show({
                severity: "warn",
                summary: "Atención",
                detail: "Debes completar todos los campos antes de continuar.",
                life: 3000,
            });
            return;
        }

        const results = await Promise.all(
            ticketAssignments.map(async (ticket) => {
                try {
                    await nominateTickets.mutateAsync(ticket);
                    return { success: true, ticket };
                } catch (error) {
                    return { success: false, ticket, error };
                }
            })
        );

        const failedTickets = results.filter((result) => !result.success);

        const processedTickets = await Promise.all(
            results.map(async (result) => {
                const { ticket } = result;

                if (!result.success) return null;

                const qrData = `${ticket.ticketunitcode}-${ticket.nameassistant}-${ticket.dniassistant}`;
                // const qrImage = await QRCode.toDataURL(qrData, { width: 150, margin: 1 });
                const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

                return { ...ticket, qr: qrImage };
            })
        );

        const filteredTickets = processedTickets.filter((ticket) => ticket !== null);

        const emailData = {
            user: user,
            event: event,
            order: orderData,
            tickets: filteredTickets,
        };

        const emailHtml = await render(<TicketConfirmationEmail emailData={emailData} />);

        const emailBody = {
            to: user.email,
            subject: "Eventeco - Detalles de la compra",
            html: emailHtml,
        };

        const emailNotification = await sendEmail(emailBody);

        if (failedTickets.length > 0) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: `No se pudo nominar ${failedTickets.length} entradas.`,
                life: 3000,
            });
        } else {
            toast.current?.show({
                severity: "success",
                summary: "Éxito",
                detail: "Entradas nominadas correctamente.",
                life: 3000,
            });
            setDialogVisible(true);
        }
    };

    return (
        <div className={styles.stepContainer}>
            <Toast ref={toast} />
            <h2>Nomina las Entradas</h2>

            <div className={styles.nominateList}>
                {ticketAssignments.map((ticket, index) => (
                    <div key={ticket.ticketunitid} className={styles.nominateItem}>
                        <h3>
                            Entrada {index + 1} - {ticket.ticketunitcode}
                        </h3>
                        <label>Nombre Completo</label>
                        <InputText value={ticket.nameassistant} onChange={(e) => handleInputChange(index, "nameassistant", e.target.value)} />
                        <label>DNI</label>
                        <InputText value={ticket.dniassistant} onChange={(e) => handleInputChange(index, "dniassistant", e.target.value)} />
                    </div>
                ))}
            </div>

            <div className={styles.navigationButtons}>
                <Button label="Atrás" icon="pi pi-chevron-left" className="p-button-secondary" onClick={onPrev} />
                <Button label="Confirmar Nominación" icon="pi pi-check" className="p-button-primary" onClick={handleNominate} />
            </div>

            {/* Dialog for confirmation */}
            <Dialog
                header="Nominación Completada"
                visible={dialogVisible}
                style={{ width: "400px" }}
                onHide={() => setDialogVisible(false)}
                footer={
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            label="Ir al Perfil"
                            icon="pi pi-user"
                            className="p-button-secondary"
                            onClick={() => {
                                setDialogVisible(false);
                                window.location.href = "/eventeco/profile";
                            }}
                        />
                        <Button
                            label="Finalizar Compra"
                            icon="pi pi-check"
                            className="p-button-primary"
                            onClick={() => {
                                setDialogVisible(false);
                                window.location.href = "/eventeco/home";
                            }}
                        />
                    </div>
                }
            >
                <p>Las entradas han sido nominadas correctamente.</p>
                <p>Recibirás las entradas por correo electrónico y por teléfono.</p>
            </Dialog>
        </div>
    );
};

export default StepNominateTickets;
