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

    /**
     * Get a paginated list of all events.
     *
     * @param int $offset The offset of the first event to return.
     * @param int $limit The maximum number of events to return.
     * @return Event[] A list of events.
     */
    public function findAllPaginated(int $offset, int $limit): array;

    /**
     * Count the total number of events.
     *
     * @return int The total number of events.
     */
    public function countAll(): int;

    /**
     * @param int $orgId
     * @return Event[]
     */
    public function findByOrganizerId(int $orgId): array;

    public function save(Event $event): void;
}