"use client";

import React from "react";
import GenericModal from "@/components/shared/GenericModal";
import { GenericModalProps } from "@/types/Modal";

const SuccessModal: React.FC<GenericModalProps> = ({ visible, onHide, buttonClass }) => {
    return (
        <GenericModal
            visible={visible}
            onHide={onHide}
            header="Registro Exitoso"
            message="Tu registro ha sido exitoso. Por favor, revisa tu correo para validar tu cuenta antes de iniciar sesión."
            buttonLabel="Aceptar"
            buttonClass={buttonClass}
        />
    );
};

export default SuccessModal;
