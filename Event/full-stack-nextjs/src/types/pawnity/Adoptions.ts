import { Organizer } from "../Organizer";

export interface FiltersProps {
    pageSize: number;
    setPageSize: (value: number) => void;
    gender: string;
    setGender: (value: string) => void;
    idorg: number;
    setidOrganizer: (value: number) => void;
    species: string;
    setSpecies: (value: string) => void;
    organizers: Organizer[];
    resetFilters: () => void;
}

export interface PaginationProps {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
    currentPage: number;
}
