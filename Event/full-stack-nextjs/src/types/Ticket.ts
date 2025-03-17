export interface Ticket {
    idticketinfo: number;
    eventSlug: string;
    type: string;
    price: string;
    capacity: number;
    remaining: number;
    descripcion: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
