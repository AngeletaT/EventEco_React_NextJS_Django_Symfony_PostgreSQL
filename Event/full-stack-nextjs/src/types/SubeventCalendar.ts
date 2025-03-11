export interface subeventCalendar {
    id: number;
    text: string;
    start: string;
    end: string;
    barColor: string;
    resource: any;
    data: {
        idsubevents: number;
        name: string;
        description: string;
        startdate: string;
        enddate: string;
        isactive: boolean;
        urlposter: string;
        status: string;
        idevent: number;
    };
}
