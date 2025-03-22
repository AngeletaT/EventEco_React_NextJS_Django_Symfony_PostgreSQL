"use client";

import { useQuery } from "@tanstack/react-query";
import {
    getPets,
    getPetsPerPage,
    getPetsByOrganizer,
    getAdoptionsByOrganizer,
    getSubscriptionsByOrganizer,
} from "@/services/pawnity/queries/getPets";
import { Pet } from "@/types/pawnity/Pet";

export const usePets = () =>
    useQuery<Pet[]>({
        queryKey: ["pets"],
        queryFn: getPets as () => Promise<Pet[]>,
        staleTime: 1000 * 60 * 30,
    });

export const usePetsPerPage = ({
    page,
    pageSize,
    gender,
    idorg,
    species,
}: {
    page: number;
    pageSize: number;
    gender?: string;
    idorg?: number;
    species?: string;
}) =>
    useQuery({
        queryKey: ["eventsPerPage", page, pageSize, gender, idorg, species],
        queryFn: () =>
            getPetsPerPage({
                pageParam: page,
                pageSize,
                gender,
                idorg,
                species,
            }),
        staleTime: 1000 * 60,
    });

export const usePetsByOrganizer = (idOrg: number) =>
    useQuery({
        queryKey: ["petsByOrganizer", idOrg],
        queryFn: () => getPetsByOrganizer(idOrg),
        staleTime: 1000 * 60,
    });

export const useAdoptions = (idOrg: number) =>
    useQuery({
        queryKey: ["adoptions", idOrg],
        queryFn: () => getAdoptionsByOrganizer(idOrg),
        staleTime: 1000 * 60,
    });

export const useSuscriptions = (idOrg: number) =>
    useQuery({
        queryKey: ["suscriptions", idOrg],
        queryFn: () => getSubscriptionsByOrganizer(idOrg),
        staleTime: 1000 * 60,
    });
