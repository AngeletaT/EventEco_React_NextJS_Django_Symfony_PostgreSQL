import React from "react";
import { useToggleEvent } from "@/hooks/pawnity/useEvents";
import { Button } from "@/utils/PrimeReactComponents";

const ToggleEvent = ({ eventId, isactive }: { eventId: number; isactive: boolean }) => {
    const toggleEvent = useToggleEvent();

    return (
        <Button
            label={isactive ? "Desactivar" : "Activar"}
            className={isactive ? "p-button-danger" : "p-button-success"}
            onClick={() => toggleEvent.mutate({ id: eventId })}
        />
    );
};

export default ToggleEvent;
