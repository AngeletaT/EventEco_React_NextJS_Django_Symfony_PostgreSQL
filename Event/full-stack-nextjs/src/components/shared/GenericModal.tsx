"use client";

import React from "react";
import { Dialog } from "@/utils/PrimeReactComponents";
import { Button } from "@/utils/PrimeReactComponents";
import { GenericModalProps } from "@/types/Modal";

const GenericModal: React.FC<GenericModalProps> = ({ visible, onHide, header, message, buttonLabel, buttonClass }) => {
    return (
        <Dialog
            header={header}
            visible={visible}
            style={{ width: "400px" }}
            modal
            onHide={onHide}
            footer={<Button label={buttonLabel} icon="pi pi-check" onClick={onHide} className={buttonClass} />}
        >
            <p>{message}</p>
        </Dialog>
    );
};

export default GenericModal;
