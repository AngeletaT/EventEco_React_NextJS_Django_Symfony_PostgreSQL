import { Category } from "./Category";
import { Complement } from "./Complement";
import { Ticket } from "./Ticket";
import { Subevent } from "./Subevent";

export interface Event {
    idevent: number;
    name: string;
    eventslug: string;
    startdate: string;
    enddate: string;
    location: string;
    position: string;
    description: string;
    status: string;
    urlimage: [];
    urlposter: string;
    idorg: number;
    idcategory: number;
    category: Category;
    subevents: Subevent[] | [];
    complements: Complement[] | [];
    tickets: Ticket[] | [];
    isactive: boolean;
    createdat: string;
    updatedat: string;
}
