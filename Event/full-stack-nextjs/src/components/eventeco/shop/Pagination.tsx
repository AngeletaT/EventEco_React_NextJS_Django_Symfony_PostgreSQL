"use client";

import React from "react";
import { Button } from "@/utils/PrimeReactComponents";
import { PaginationProps } from "@/types/eventeco/Shop";
import styles from "@/styles/eventeco/Shop.module.css";

const Pagination: React.FC<PaginationProps> = ({ hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage, currentPage }) => {
    return (
        <div className={styles.paginationContainer}>
            {hasPreviousPage && <Button label="" icon="pi pi-chevron-left" onClick={fetchPreviousPage} className="p-button-text" />}
            <span className={styles.pageIndicator}>Página {currentPage}</span>
            {hasNextPage && <Button label="" icon="pi pi-chevron-right" iconPos="right" onClick={fetchNextPage} className="p-button-text" />}
        </div>
    );
};

export default Pagination;
