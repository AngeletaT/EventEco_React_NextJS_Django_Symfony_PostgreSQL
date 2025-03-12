"use client";

import { Skeleton } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/Home.module.css";

const CategorySkeleton = () => {
    return (
        <div className={styles.categorySkeletonContainer}>
            {[...Array(5)].map((_, index) => (
                <Skeleton key={index} width="100%" height="150px" className={styles.categorySkeleton} />
            ))}
        </div>
    );
};

export default CategorySkeleton;
