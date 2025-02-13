"use client";

import React from "react";
import { Dialog } from "@/utils/PrimeReactComponents";
import { Button } from "@/utils/PrimeReactComponents";
import { SuccessModalProps } from "@/types/Auth";

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, onHide }) => {
    return (
        <Dialog
            header="Registro Exitoso"
            visible={visible}
            style={{ width: "400px" }}
            modal
            onHide={onHide}
            footer={<Button label="Aceptar" icon="pi pi-check" onClick={onHide} className="p-button-success" />}
        >
            <p>Tu registro ha sido exitoso. Por favor, revisa tu correo para validar tu cuenta antes de iniciar sesión.</p>
        </Dialog>
    );
};

export default SuccessModal;
