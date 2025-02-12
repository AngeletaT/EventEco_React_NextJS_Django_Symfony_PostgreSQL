"use client";

import React from "react";
import { RadioButton } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/Auth.module.css";

interface UserTypeSelectorProps {
    userType: "client" | "organization" | "admin";
    setUserType: (type: "client" | "organization" | "admin") => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ userType, setUserType }) => {
    return (
        <div className={styles.selectorContainer}>
            <div className={styles.radioButton}>
                <RadioButton inputId="client" name="userType" value="client" onChange={(e) => setUserType(e.value)} checked={userType === "client"} />
                <label htmlFor="client">Cliente</label>
            </div>

            <div className={styles.radioButton}>
                <RadioButton
                    inputId="organization"
                    name="userType"
                    value="organization"
                    onChange={(e) => setUserType(e.value)}
                    checked={userType === "organization"}
                />
                <label htmlFor="organization">Organización</label>
            </div>

            <div className={styles.radioButton}>
                <RadioButton inputId="admin" name="userType" value="admin" onChange={(e) => setUserType(e.value)} checked={userType === "admin"} />
                <label htmlFor="admin">Administrador</label>
            </div>
        </div>
    );
};

export default UserTypeSelector;
