"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/eventeco/slices/authSlice";
import { InputSwitch } from "primereact/inputswitch";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import styles from "@/styles/eventeco/Client/ProfilePreferences.module.css";

const ProfilePreferences: React.FC = () => {
    const dispatch = useDispatch();
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [whatsappNotifications, setWhatsappNotifications] = useState(false);
    const [userlocation, setUserLocation] = useState(true);
    const [eventReminders, setEventReminders] = useState(true);
    const [personalizedSuggestions, setPersonalizedSuggestions] = useState(true);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [confirmPaymentDialog, setConfirmPaymentDialog] = useState(false);

    const handleDeleteAccount = () => {
        setConfirmDialog(true);
    };

    const confirmDeleteAccount = () => {
        setConfirmDialog(false);
        dispatch(logoutUser() as any);
    };

    const handleDeletePaymentMethods = () => {
        setConfirmPaymentDialog(true);
    };

    const confirmDeletePaymentMethods = () => {
        setConfirmPaymentDialog(false);
    };

    return (
        <div className={styles.container}>
            <h2>Preferencias del Usuario</h2>

            <Divider />
            <div className={styles.toggleRow}>
                <span>📩 Recibir notificaciones por email</span>
                <InputSwitch checked={emailNotifications} onChange={(e) => setEmailNotifications(e.value)} />
            </div>

            <Divider />
            <div className={styles.toggleRow}>
                <span>💬 Recibir notificaciones por WhatsApp</span>
                <InputSwitch checked={whatsappNotifications} onChange={(e) => setWhatsappNotifications(e.value)} />
            </div>

            <Divider />
            <div className={styles.toggleRow}>
                <span>📍 Activar mi localización</span>
                <InputSwitch checked={userlocation} onChange={(e) => setUserLocation(e.value)} />
            </div>

            <Divider />
            <div className={styles.toggleRow}>
                <span>📅 Recordatorios de eventos</span>
                <InputSwitch checked={eventReminders} onChange={(e) => setEventReminders(e.value)} />
            </div>

            <Divider />
            <div className={styles.toggleRow}>
                <span>🎯 Recomendaciones personalizadas</span>
                <InputSwitch checked={personalizedSuggestions} onChange={(e) => setPersonalizedSuggestions(e.value)} />
            </div>

            <Divider />
            <div className={styles.buttonRow}>
                <Button label="💳 Borrar Métodos de Pago" className="p-button-warning" onClick={handleDeletePaymentMethods} />
            </div>

            <Divider />
            <div className={styles.buttonRow}>
                <Button label="🗑️ Borrar Cuenta" className="p-button-danger" onClick={handleDeleteAccount} />
            </div>

            {/* Dialog de confirmación para borrar cuenta */}
            <Dialog
                header="Confirmar Borrado de Cuenta"
                visible={confirmDialog}
                style={{ width: "400px" }}
                onHide={() => setConfirmDialog(false)}
                footer={
                    <div>
                        <Button label="Cancelar" icon="pi pi-times" onClick={() => setConfirmDialog(false)} className="p-button-text" />
                        <Button label="Confirmar" icon="pi pi-check" onClick={confirmDeleteAccount} className="p-button-danger" />
                    </div>
                }
            >
                <p>
                    ¿Estás seguro de que deseas borrar tu cuenta? <b>Esta acción no se puede deshacer.</b>
                </p>
            </Dialog>

            {/* Dialog de confirmación para borrar métodos de pago */}
            <Dialog
                header="Confirmar Borrado de Métodos de Pago"
                visible={confirmPaymentDialog}
                style={{ width: "400px" }}
                onHide={() => setConfirmPaymentDialog(false)}
                footer={
                    <div>
                        <Button label="Cancelar" icon="pi pi-times" onClick={() => setConfirmPaymentDialog(false)} className="p-button-text" />
                        <Button label="Confirmar" icon="pi pi-check" onClick={confirmDeletePaymentMethods} className="p-button-warning" />
                    </div>
                }
            >
                <p>¿Estás seguro de que deseas borrar todos los métodos de pago?</p>
            </Dialog>
        </div>
    );
};

export default ProfilePreferences;
