<?php

namespace App\Complement\Domain\OutPort;

use App\Complement\Domain\Entity\Complement;

interface ComplementRepositoryInterface
{
    public function save(Complement $complement): void;
    public function find(int $id): ?Complement;
    /**
     * @param string $eventSlug
     * @return Complement[]
     */
    public function findByEventSlug(string $eventSlug): array;
}