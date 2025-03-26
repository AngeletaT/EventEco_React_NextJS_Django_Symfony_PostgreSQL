"use client";

import React from "react";
import { Dialog } from "primereact/dialog";
import PrivacyPolicyModalContent from "./PrivacyPolicyModalContent";
import OrganizerTermsModalContent from "./OrganizerTermsModalContent";

interface LegalModalProps {
    visible: boolean;
    onHide: () => void;
    type: "privacy" | "terms";
}

const LegalModal: React.FC<LegalModalProps> = ({ visible, onHide, type }) => {
    const renderContent = () => {
        if (type === "privacy") return <PrivacyPolicyModalContent />;
        if (type === "terms") return <OrganizerTermsModalContent />;
        return null;
    };

    return (
        <Dialog
            header={type === "privacy" ? "Política de Privacidad" : "Términos y Condiciones"}
            visible={visible}
            style={{ width: "60vw", maxHeight: "80vh" }}
            modal
            onHide={onHide}
            dismissableMask
        >
            <div style={{ overflowY: "auto", maxHeight: "60vh" }}>{renderContent()}</div>
        </Dialog>
    );
};

export default LegalModal;
