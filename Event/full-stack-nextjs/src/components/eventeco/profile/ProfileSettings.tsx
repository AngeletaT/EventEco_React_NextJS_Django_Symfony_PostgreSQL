"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/eventeco";
import { Client } from "@/types/User";
import { fetchUser, updateUser } from "@/store/eventeco/slices/userSlice";
import { Button, InputText } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Profile.module.css";

const ProfileSettings: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isLoading, error } = useSelector((state: RootState) => state.user);
    const [formData, setFormData] = useState<Client | null>(user as Client | null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value } as Client);
    };

    const handleSubmit = () => {
        dispatch(updateUser(formData as Partial<Client>));
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
                        <InputText name="dni" value={formData.dni} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Teléfono</label>
                        <InputText name="phonenumber" value={formData.phonenumber} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Biografía</label>
                        <InputText name="bio" value={formData.bio} onChange={handleChange} />
                    </div>
                    <Button label="Guardar Cambios" onClick={handleSubmit} className="p-button-success" />
                </>
            )}
        </div>
    );
};

export default ProfileSettings;
