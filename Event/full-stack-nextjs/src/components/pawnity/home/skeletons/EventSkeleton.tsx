"use client";

import { Skeleton } from "primereact/skeleton";
import styles from "@/styles/eventeco/Home.module.css";

const EventSkeleton = () => {
    return (
        <div className={styles.eventSkeletonContainer}>
            {[...Array(10)].map((_, index) => (
                <Skeleton key={index} width="100%" height="200px" className={styles.eventSkeleton} />
            ))}
        </div>
    );
};

export default EventSkeleton;
