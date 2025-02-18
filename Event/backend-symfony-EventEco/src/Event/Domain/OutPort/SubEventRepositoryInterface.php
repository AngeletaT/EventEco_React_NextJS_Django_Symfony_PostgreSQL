<?php

namespace App\Event\Domain\OutPort;

use App\Event\Domain\Entity\SubEvent;

interface SubEventRepositoryInterface
{
    public function save(SubEvent $subEvent): void;
    public function find(int $id): ?SubEvent;
    // Otros métodos si son necesarios...
}