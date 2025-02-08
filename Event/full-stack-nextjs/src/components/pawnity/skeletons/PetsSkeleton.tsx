"use client";

import { Skeleton } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/Home.module.css";

export const PetsSkeleton = () => {
    return (
        <section className={styles.petGallery}>
            <h2>Conoce a las Mascotas</h2>
            <div className={styles.petGrid}>
                {[...Array(4)].map((_, index) => (
                    <div key={index} className={styles.petCard}>
                        <Skeleton shape="circle" size="100px" className={styles.petImage} />
                        <Skeleton width="60%" height="20px" className={styles.petName} />
                        <Skeleton width="40%" height="20px" className={styles.petAge} />
                        <Skeleton width="50%" height="20px" className={styles.petStatus} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export const PetSkeletonShop = () => {
    return (
        <div className={styles.EventSkeletonContainerShop}>
            {[...Array(5)].map((_, index) => (
                <Skeleton key={index} width="100%" height="200px" className={styles.petSkeleton} />
            ))}
        </div>
    );
};
