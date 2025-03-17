<?php
// src/Pet/Application/UseCase/Command/TogglePetActive/TogglePetActiveCommandHandler.php

namespace App\Pet\Application\UseCase\Command\TogglePetActive;

use App\Pet\Domain\OutPort\PetRepositoryInterface;
use App\Pet\Application\DTO\Response\TogglePetActiveResponse;

class TogglePetActiveCommandHandler
{
    private PetRepositoryInterface $repository;

    public function __construct(PetRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function handle(TogglePetActiveCommand $command): TogglePetActiveResponse
    {
        $pet = $this->repository->findByUuid($command->getUuid());

        if (!$pet) {
            throw new \Exception("Pet not found.");
        }

        // Cambia el estado actual de isActive (true ↔ false)
        $newStatus = !$pet->isActive();
        $pet->setActive($newStatus);

        $this->repository->save($pet);

        return new TogglePetActiveResponse($pet->getUuid(), $newStatus);
    }
}
