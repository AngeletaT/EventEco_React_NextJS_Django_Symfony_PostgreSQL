export interface Client {
    email: string;
    accesstoken: string;
    userType: "client";
    idclient: number;
    idprofileclient: number;
    firstname: string;
    lastname: string;
    avatarurl: string;
    bio: string;
    dni: string;
    phonenumber: string;
}

export interface Organizer {
    idorganizer: number;
    email: string;
    accesstoken: string;
    userType: "organizer";
    idprofileclient: number;
    firstname: string;
    lastname: string;
    avatarurl: string;
    bio: string;
    dni: string;
    phonenumber: string;
}

export interface Admin {
    idadmin: number;
    email: string;
    accesstoken: string;
    userType: "admin";
    idprofileclient: number;
    firstname: string;
    lastname: string;
    avatarurl: string;
    bio: string;
    dni: string;
    phonenumber: string;
}
