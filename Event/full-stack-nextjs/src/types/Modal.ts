export interface GenericModalProps {
    visible: boolean;
    onHide: () => void;
    header: string;
    message: string;
    buttonLabel: string;
    buttonClass: string;
}
