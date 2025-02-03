<?php

namespace App\Event\Domain\OutPort;

use App\Event\Domain\Entity\Event;

interface EventRepositoryInterface
{
    /**
     * Get all events from the database.
     *
     * @return Event[]
     */
    public function findAll(): array;

    /**
     * Get events filtered by category.
     *
     * @param int $categoryId
     * @return Event[]
     */
    public function findByCategory(int $categoryId): array;
}