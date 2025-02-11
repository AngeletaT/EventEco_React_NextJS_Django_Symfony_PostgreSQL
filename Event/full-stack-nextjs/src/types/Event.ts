import { Category } from "./Category";
import { Subevent } from "./Subevent";

export interface Event {
    idevent: number;
    name: string;
    eventslug: string;
    startdate: string;
    enddate: string;
    location: string;
    description: string;
    status: string;
    urlimage: [];
    urlposter: string;
    idorg: number;
    idcategory: number;
    category: Category;
    subevents: Subevent[] | null;
    createdat: string;
    updatedat: string;
}
