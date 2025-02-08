"use client";

import React from "react";
import { Button } from "primereact/button";
import styles from "@/styles/eventeco/Shop.module.css";
import { PaginationProps } from "@/types/eventeco/Shop";

const Pagination: React.FC<PaginationProps> = ({
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    current_page,
    handlePreviousPage,
}) => {
    console.log("previus page: ", hasPreviousPage);
    console.log("current page: ", current_page);
    console.log("next page: ", hasNextPage);

    return (
        <div className={styles.paginationContainer}>
            <Button label="Anterior" icon="pi pi-chevron-left" onClick={handlePreviousPage} disabled={!hasPreviousPage} className="p-button-text" />
            <span className={styles.pageIndicator}>Página {current_page}</span>
            <Button
                label="Siguiente"
                icon="pi pi-chevron-right"
                iconPos="right"
                onClick={fetchNextPage}
                disabled={!hasNextPage}
                className="p-button-text"
            />
        </div>
    );
};

export default Pagination;
