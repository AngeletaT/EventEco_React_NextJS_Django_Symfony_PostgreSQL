"use client";

import React, { useState, useEffect } from "react";
import { usePetsPerPage } from "@/hooks/pawnity/usePets";
import { useOrganizers } from "@/hooks/pawnity/useOrganizers";
import { Organizer } from "@/types/Organizer";
import PawnityLayout from "@/layouts/pawnity/PawnityLayout";
import Filters from "./Filters";
import { PetSkeletonShop } from "@/components/pawnity/skeletons/PetsSkeleton";
import ListPets from "./ListPets";
import Pagination from "./Pagination";

const PawnityAdoptionClient = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [gender, setGender] = useState("");
    const [idorg, setidOrganizer] = useState<number>();
    const [species, setSpecies] = useState("");

    const { data: organizers, isLoading: loadingOrganizers } = useOrganizers<Organizer[]>();

    const resetFilters = () => {
        setPageSize(5);
        setGender("");
        setidOrganizer(1);
        setSpecies("");
    };

    const { data, isLoading, isFetching } = usePetsPerPage({
        page: currentPage,
        pageSize,
        gender,
        idorg,
        species,
    });

    const pets = data?.pets || [];
    const totalPages = data?.total_pages || 1;

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);
    useEffect(() => {
        setCurrentPage(1);
    }, [pageSize, gender, idorg, species]);

    return (
        <PawnityLayout>
            {/* Filtros */}
            {loadingOrganizers ? null : (
                <Filters
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    gender={gender}
                    setGender={setGender}
                    idorg={idorg ?? 1}
                    setidOrganizer={setidOrganizer}
                    species={species}
                    setSpecies={setSpecies}
                    organizers={organizers || []}
                    resetFilters={resetFilters}
                />
            )}

            {/* Lista de Eventos */}
            {isLoading || isFetching ? <PetSkeletonShop /> : <ListPets pets={pets} />}

            {/* Paginación */}
            {pageSize !== 40 && (
                <Pagination
                    hasNextPage={currentPage < totalPages}
                    hasPreviousPage={currentPage > 1}
                    fetchNextPage={handleNextPage}
                    fetchPreviousPage={handlePreviousPage}
                    currentPage={currentPage}
                />
            )}
        </PawnityLayout>
    );
};

export default PawnityAdoptionClient;
