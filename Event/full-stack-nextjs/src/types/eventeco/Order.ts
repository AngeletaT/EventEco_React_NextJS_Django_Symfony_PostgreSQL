export interface Order {
    idorder: number;
    idclient: number;
    idevent: number;
    event: {
        idevent: number;
        name: string;
        eventslug: string;
        startdate: string;
        enddate: string;
        location: string;
        description: string;
        status: string;
        urlimage: string[];
        urlposter: string;
        idorg: number;
        idcategory: number;
        category: {
            idcategory: number;
            categoryname: string;
            imageurl: string;
            createdat: string;
            categoryslug: string;
            updatedat: string;
        };
        createdat: string;
        updatedat: string;
    };
    subtotaltickets: number;
    subtotalcomplements: number;
    subtotalcommissions: number;
    totalprice: number;
    paymentstatus: string;
    status: string;
    datepurchase: string;
    createdat: string;
    updatedat: string;
    orderlines: {
        idorderline: number;
        idorder: number;
        itemtype: string;
        itemid: number;
        quantity: number;
        discount: string;
        subtotal: string;
        status: string;
        createdat: string;
        updatedat: string;
    }[];
    ticketunits: {
        idticketunit: number;
        idorder: number;
        idticketinfo: number;
        ticketinfo: {
            idticketinfo: number;
            eventslug: string;
            type: string;
            price: string;
            capacity: number;
            remaining: number;
            descripcion: string;
            isactive: boolean;
            createdat: string;
            updatedat: string;
        };
        code: string;
        unitprice: string;
        complements: {
            idcomplement: number;
            name: string;
            description: string;
            price: string;
            imageurl: string | null;
            eventslug: string;
            isactive: boolean;
            createdat: string;
            updatedat: string;
        }[];
        nameassistant: string;
        dniassistant: string;
        status: string;
        createdat: string;
        updatedat: string;
    }[];
}
