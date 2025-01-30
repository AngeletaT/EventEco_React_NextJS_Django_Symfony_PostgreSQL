<?php

namespace App\Event\Domain\OutPort;

use App\Event\Domain\Entity\Event;

/**
 * Interface for Event Repository
 */
interface EventRepositoryInterface
{
    /**
     * Get all events from the database.
     *
     * @return Event[]
     */
    public function findAll(): array;
}