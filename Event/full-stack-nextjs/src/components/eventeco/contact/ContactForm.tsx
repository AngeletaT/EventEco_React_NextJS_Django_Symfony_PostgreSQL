"use client";

import React, { useState, useRef } from "react";
import { InputText, InputTextarea, Button, Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Contact.module.css";

interface ContactFormProps {
    selectedPlan: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ selectedPlan }) => {
    const [form, setForm] = useState({
        company: "",
        email: "",
        eventType: "",
        city: "",
        phone: "",
        message: "",
        selectedPlan,
    });

    const toastRef = useRef<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (toastRef.current) {
            toastRef.current.show({
                severity: "success",
                summary: "Formulario enviado",
                detail: "Nos pondremos en contacto contigo lo antes posible.",
                life: 3000,
            });
        }

        setForm({
            company: "",
            email: "",
            eventType: "",
            city: "",
            phone: "",
            message: "",
            selectedPlan: selectedPlan,
        });
    };

    return (
        <div className={styles.formContainer}>
            <Toast ref={toastRef} />
            <h2>Solicita información</h2>
            <p>Completa este formulario y te contactaremos para ayudarte a hacer tu evento más sostenible.</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <span className="p-float-label">
                    <InputText id="plan" name="plan" value={selectedPlan} disabled className="w-full" />
                    <label htmlFor="plan">Plan Seleccionado</label>
                </span>
                <span className="p-float-label">
                    <InputText id="company" name="company" value={form.company} onChange={handleChange} className="w-full" />
                    <label htmlFor="company">Nombre de la empresa</label>
                </span>
                <span className="p-float-label">
                    <InputText id="email" name="email" value={form.email} onChange={handleChange} className="w-full" />
                    <label htmlFor="email">Correo electrónico</label>
                </span>
                <span className="p-float-label">
                    <InputText id="eventType" name="eventType" value={form.eventType} onChange={handleChange} className="w-full" />
                    <label htmlFor="eventType">Tipo de evento</label>
                </span>
                <span className="p-float-label">
                    <InputText id="city" name="city" value={form.city} onChange={handleChange} className="w-full" />
                    <label htmlFor="city">Ciudad</label>
                </span>
                <span className="p-float-label">
                    <InputText id="phone" name="phone" value={form.phone} onChange={handleChange} className="w-full" />
                    <label htmlFor="phone">Teléfono</label>
                </span>
                <span className={`p-float-label ${styles.twocolumns}`}>
                    <InputTextarea id="message" name="message" value={form.message} onChange={handleChange} rows={4} className="w-full" />
                    <label htmlFor="message">Comentarios adicionales</label>
                </span>
                <Button type="submit" label="Enviar solicitud" className="p-button-success w-full" />
            </form>
        </div>
    );
};

export default ContactForm;
