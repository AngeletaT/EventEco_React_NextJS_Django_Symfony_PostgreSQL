"use client";

import React from "react";
import { UserTypeSelectorProps } from "@/types/Auth";
import styles from "@/styles/pawnity/Auth.module.css";

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ userType, setUserType }) => {
    return (
        <fieldset className={styles.fieldset}>
            <div className={styles.toggle}>
                <input
                    type="radio"
                    name="userType"
                    value="client"
                    id="client"
                    checked={userType === "client"}
                    onChange={(e) => setUserType(e.target.value as "client" | "organizer" | "admin")}
                />
                <label htmlFor="client">Cliente</label>

                <input
                    type="radio"
                    name="userType"
                    value="organizer"
                    id="organizer"
                    checked={userType === "organizer"}
                    onChange={(e) => setUserType(e.target.value as "client" | "organizer" | "admin")}
                />
                <label htmlFor="organizer">Organizador</label>

                <input
                    type="radio"
                    name="userType"
                    value="admin"
                    id="admin"
                    checked={userType === "admin"}
                    onChange={(e) => setUserType(e.target.value as "client" | "organizer" | "admin")}
                />
                <label htmlFor="admin">Admin</label>
            </div>
        </fieldset>
    );
};

export default UserTypeSelector;
