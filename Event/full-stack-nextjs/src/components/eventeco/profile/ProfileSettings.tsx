"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/eventeco";
import { Client } from "@/types/User";
import { fetchUser, updateUser } from "@/store/eventeco/slices/userSlice";
import { Button, InputText } from "@/utils/PrimeReactComponents";
import { Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Profile.module.css";

const ProfileSettings: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isLoading, error } = useSelector((state: RootState) => state.user);
    const [formData, setFormData] = useState<Client | null>(user as Client | null);
    const [isChanged, setIsChanged] = useState(false);
    const [dniError, setDNIError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const toast = useRef<Toast>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value } as Client);
        setIsChanged(true);

        if (name === "dni") {
            const dniRegex = /^[0-9]{8}[A-Za-z]$/;
            if (!dniRegex.test(value)) {
                setDNIError("El DNI no es válido. Por favor, introduce un DNI válido.");
            } else {
                setDNIError("");
            }
        }

        if (name === "phonenumber") {
            const phoneRegex = /^[0-9]{9}$/;
            if (!phoneRegex.test(value)) {
                setPhoneError("El teléfono no es válido. Por favor, introduce un teléfono válido.");
            } else {
                setPhoneError("");
            }
        }
    };

    const handleSubmit = async () => {
        try {
            await dispatch(updateUser(formData as Partial<Client>)).unwrap();
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
        setFormData(user as Client | null);
    }, [user]);

    if (isLoading) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.settingsContainer}>
            <Toast ref={toast} />
            <h2>Ajustes del Perfil</h2>
            {formData && (
                <>
                    <div className={styles.formGroup}>
                        <label>Nombre</label>
                        <InputText name="firstname" value={formData.firstname} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Apellido</label>
                        <InputText name="lastname" value={formData.lastname} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>DNI</label>
                        <InputText name="dni" value={formData.dni} onChange={handleChange} maxLength={9} invalid={dniError || error ? true : false} />
                        {dniError && <small className={styles.error}>{dniError}</small>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Teléfono</label>
                        <InputText
                            name="phonenumber"
                            value={formData.phonenumber}
                            onChange={handleChange}
                            maxLength={9}
                            invalid={phoneError || error ? true : false}
                        />
                        {phoneError && <small className={styles.error}>{phoneError}</small>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Biografía</label>
                        <InputText name="bio" value={formData.bio} onChange={handleChange} />
                    </div>
                    <Button
                        label="Guardar Cambios"
                        onClick={handleSubmit}
                        className="p-button-success"
                        disabled={!isChanged || dniError || phoneError || error ? true : false}
                    />
                </>
            )}
        </div>
    );
};

export default ProfileSettings;
