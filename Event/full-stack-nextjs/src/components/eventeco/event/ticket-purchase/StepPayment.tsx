"use client";

import React, { useState } from "react";
import { useCreateOrder } from "@/hooks/eventeco/useOrders";
import { useSelector } from "react-redux";
import { RootState } from "@/store/eventeco";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { processStripePayment } from "@/services/eventeco/command/order/processPayment";
import { sendWhatsapp } from "@/services/eventeco/command/tickets/sendNotifications";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Toast, Checkbox, InputText } from "@/utils/PrimeReactComponents";
import LegalModal from "@/components/shared/LegalModal";
import styles from "@/styles/eventeco/TicketPurchase.module.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const StepPayment: React.FC<{
    orderData: any;
    setIdOrder: (id: number) => void;
    setTicketUnits: (ticketUnits: any[]) => void;
    onNext: () => void;
    onPrev: () => void;
}> = ({ orderData, setIdOrder, setTicketUnits, onNext, onPrev }) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm orderData={orderData} setIdOrder={setIdOrder} setTicketUnits={setTicketUnits} onNext={onNext} onPrev={onPrev} />
        </Elements>
    );
};

const PaymentForm: React.FC<{
    orderData: any;
    setIdOrder: (idorder: number) => void;
    setTicketUnits: (ticketUnits: any[]) => void;
    onNext: () => void;
    onPrev: () => void;
}> = ({ orderData, setIdOrder, setTicketUnits, onNext, onPrev }) => {
    const stripe = useStripe();
    const elements = useElements();
    const toast = React.useRef<Toast>(null);
    const [loading, setLoading] = useState(false);

    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

    const openModal = (type: "privacy" | "terms") => {
        setModalType(type);
        setShowModal(true);
    };

    const createOrder = useCreateOrder();
    const user = useSelector((state: RootState) => state.user) as any;

    const handlePayment = async () => {
        setLoading(true);

        try {
            const order = await createOrder.mutateAsync(orderData);

            setIdOrder(order.idorder);
            setTicketUnits(order.ticketunits);
            const paymentBody = {
                orderId: order.idorder,
                totalAmount: order.totalprice,
            };

            const clientSecret = await processStripePayment(paymentBody);

            if (!stripe || !elements) {
                throw new Error("Stripe no está cargado.");
            }

            const result = await stripe.confirmCardPayment(clientSecret as string, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            });

            if (result.error) {
                throw new Error(result.error.message || "Error en el pago.");
            }

            const whatsappBody = { phone: user.user.phonenumber };
            await sendWhatsapp(whatsappBody);

            toast.current?.show({
                severity: "success",
                summary: "Pago Completado",
                detail: "Tu compra ha sido confirmada. Revisa tu correo y WhatsApp para más detalles.",
                life: 5000,
            });

            onNext();
        } catch (error) {
            console.error("Payment error:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error en el Pago",
                detail: error instanceof Error ? error.message : "No se pudo completar el pago.",
                life: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.stepContainer}>
            <Toast ref={toast} />
            <h2>Resumen de tu Pedido</h2>

            <div className={styles.orderSummary}>
                <h3>Entradas Seleccionadas</h3>
                {orderData.tickets.map((ticket: any, index: number) => (
                    <div key={index}>
                        <p>
                            {ticket.quantity}x {ticket.type} - {ticket.quantity * ticket.price}€
                        </p>
                        {ticket.entries.map((entry: any, entryIndex: number) => (
                            <div key={entryIndex} className={styles.complementSummary}>
                                <h4>Complementos:</h4>
                                {entry.info.map((complement: any, complementIndex: number) => (
                                    <li key={complementIndex}>
                                        {complement.type} - {complement.price}€
                                    </li>
                                ))}
                                <p>Subtotal Complementos: {entry.subtotalComplements}€</p>
                            </div>
                        ))}
                    </div>
                ))}
                <h3>
                    Total:{" "}
                    {orderData.tickets
                        .reduce((sum: number, ticket: any) => {
                            const ticketTotal = ticket.quantity * ticket.price;
                            const feesTotal = ticket.quantity * 5;
                            const complementsTotal = ticket.entries.reduce(
                                (entrySum: number, entry: any) => entrySum + parseFloat(entry.subtotalComplements || 0),
                                0
                            );
                            return sum + ticketTotal + complementsTotal + feesTotal;
                        }, 0)
                        .toFixed(2)}
                    €
                </h3>
                <p>Gastos de Gestión: {(orderData.tickets.length * 5).toFixed(2)}€</p>
            </div>

            <div className={styles.paymentSection}>
                <h3>Introduce los datos de tu tarjeta</h3>
                <InputText placeholder="Nombre del titular" className={styles.cardHolder} />
                <CardElement className={styles.cardElement} />
            </div>

            <div className={`field-checkbox ${styles.privacyCheckbox}`}>
                <Checkbox inputId="privacy" checked={acceptedPrivacy} onChange={(e) => setAcceptedPrivacy(e.checked!)} />
                <label htmlFor="privacy">
                    He leído y acepto la{" "}
                    <a onClick={() => openModal("privacy")} style={{ textDecoration: "underline", cursor: "pointer" }}>
                        política de privacidad
                    </a>
                    .
                </label>
            </div>

            <div className={styles.navigationButtons}>
                <Button label="Atrás" icon="pi pi-chevron-left" className="p-button-secondary" onClick={onPrev} disabled={loading} />
                <Button label="Pagar con Stripe" icon="pi pi-credit-card" className="p-button-primary" onClick={handlePayment} loading={loading} />
            </div>

            {modalType && (
                <LegalModal
                    visible={showModal}
                    type={modalType}
                    onHide={() => {
                        setModalType(null);
                        setShowModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default StepPayment;
