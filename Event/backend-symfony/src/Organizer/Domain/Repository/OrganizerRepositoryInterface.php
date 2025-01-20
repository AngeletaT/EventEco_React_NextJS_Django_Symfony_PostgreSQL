<?php

namespace App\Organizer\Domain\Repository;

use App\Organizer\Domain\Entity\Organizer;

/**
 * Organizer repository interface
 */
interface OrganizerRepositoryInterface
{
    public function save(Organizer $organizer): void;

    public function findById(int $idOrg): ?Organizer;

    public function findByUuid(string $uuid): ?Organizer;
}