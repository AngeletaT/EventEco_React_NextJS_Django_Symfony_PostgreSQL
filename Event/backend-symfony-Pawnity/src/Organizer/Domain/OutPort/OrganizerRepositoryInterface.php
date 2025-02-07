<?php

namespace App\Organizer\Domain\OutPort;

use App\Organizer\Domain\Entity\Organizer;

/**
 * Organizer repository interface
 */
interface OrganizerRepositoryInterface
{
    public function save(Organizer $organizer): void;

    public function findById(int $idOrg): ?Organizer;

    public function findByUuid(string $uuid): ?Organizer;

    public function findByEmail(string $email): ?Organizer;

    public function existsByEmail(string $email): bool;

    public function existsByNif(string $nif): bool;

    public function update(Organizer $organizer): void;
}