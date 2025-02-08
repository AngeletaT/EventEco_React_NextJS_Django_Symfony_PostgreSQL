"use client";

import { Skeleton } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/Home.module.css";

export const EventSkeleton = () => {
    return (
        <div className={styles.eventSkeletonContainer}>
            {[...Array(10)].map((_, index) => (
                <Skeleton key={index} width="100%" height="200px" className={styles.eventSkeleton} />
            ))}
        </div>
    );
};

export const EventSkeletonShop = () => {
    return (
        <div className={styles.eventSkeletonContainerShop}>
            {[...Array(5)].map((_, index) => (
                <Skeleton key={index} width="100%" height="200px" className={styles.eventSkeleton} />
            ))}
        </div>
    );
};
