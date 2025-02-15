"use client";

import React from "react";
import GenericModal from "@/components/shared/GenericModal";

interface ErrorModalProps {
    visible: boolean;
    onHide: () => void;
    message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ visible, onHide, message }) => {
    return <GenericModal visible={visible} onHide={onHide} header="Error" message={message} buttonLabel="Cerrar" buttonClass="p-button-danger" />;
};

export default ErrorModal;
