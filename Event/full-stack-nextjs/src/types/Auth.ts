export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    nif: string;
    repeatpassword: string;
}

export interface LoginFormProps {
    userType: "client" | "organizer" | "admin";
}

export interface RegisterFormProps {
    userType: "client" | "organizer" | "admin";
    onSwitchToLogin: () => void;
}

export interface UserTypeSelectorProps {
    userType: "client" | "organizer" | "admin";
    setUserType: (type: "client" | "organizer" | "admin") => void;
}

export interface GenericModalProps {
    visible: boolean;
    onHide: () => void;
}
