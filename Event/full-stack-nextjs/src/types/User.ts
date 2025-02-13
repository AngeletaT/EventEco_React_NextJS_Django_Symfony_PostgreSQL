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
    email: string;
    accesstoken: string;
    userType: "organizer";
    idOrg: number;
    idProfileOrg: number;
    nif: string;
    name: string;
    address: string;
    urlImage: string;
    urlLogo: string;
    description: string;
    urlWeb: string;
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
