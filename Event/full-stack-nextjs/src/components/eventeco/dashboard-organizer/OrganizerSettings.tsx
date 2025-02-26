"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/eventeco";
import { updateUser, fetchUser } from "@/store/eventeco/slices/userSlice";
import { InputText, InputTextarea, Button, Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Organizer/DashboardOrganizer.module.css";
import { Organizer } from "@/types/User";

const OrganizerSettings: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isLoading, error } = useSelector((state: RootState) => state.user);
    const [formData, setFormData] = useState<Organizer | null>(user as Organizer | null);
    const [isChanged, setIsChanged] = useState(false);
    const toast = useRef<Toast>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value } as Organizer);
        setIsChanged(true);
    };

    const handleSubmit = async () => {
        try {
            await dispatch(updateUser(formData as Partial<Organizer>)).unwrap();
            toast.current?.show({ severity: "success", summary: "Éxito", detail: "Perfil actualizado correctamente", life: 3000 });
            setIsChanged(false);
        } catch (err) {
            toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar el perfil", life: 3000 });
        }
    };

    useEffect(() => {
        if (!user) {
            dispatch(fetchUser() as any);
        }
    }, [dispatch, user]);

    useEffect(() => {
        setFormData(user as Organizer | null);
    }, [user]);

    if (isLoading || !formData) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.SettingsContainer}>
            <Toast ref={toast} />
            <h2>Editar Perfil</h2>
            <label>Nombre</label>
            <InputText name="name" value={formData.name} onChange={handleChange} />

            <label>Dirección</label>
            <InputText name="address" value={formData.address} onChange={handleChange} />

            <label>Logo URL</label>
            <InputText name="urlLogo" value={formData.urlLogo} onChange={handleChange} />

            <label>Descripción</label>
            <InputTextarea name="description" value={formData.description} onChange={handleChange} rows={4} />

            <label>Página Web</label>
            <InputText name="urlWeb" value={formData.urlWeb} onChange={handleChange} />

            <label>Imagen de Portada</label>
            <InputText name="urlImage" value={formData.urlImage} onChange={handleChange} />

            <Button label="Guardar Cambios" type="submit" loading={isLoading} disabled={!isChanged || error ? true : false} onClick={handleSubmit} />
        </div>
    );
};

export default OrganizerSettings;
