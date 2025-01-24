<?php

namespace App\Organizer\Application\UseCase\Command;

use App\Organizer\Application\Mapper\OrganizerMapper;
use App\Organizer\Domain\Exception\DuplicateOrganizerException;
use App\Organizer\Domain\OutPort\OrganizerRepositoryInterface;
use App\Organizer\Domain\Entity\Organizer;

class CreateOrganizerHandler
{
    private OrganizerRepositoryInterface $repository;
    private OrganizerMapper $mapper;

    public function __construct(
        OrganizerRepositoryInterface $repository,
        OrganizerMapper $mapper
    ) {
        $this->repository = $repository;
        $this->mapper = $mapper;
    }

    public function handle(CreateOrganizerCommand $command): void
    {
        // Validar duplicados
        if ($this->repository->existsByEmail($command->getEmail())) {
            throw new DuplicateOrganizerException('Email already exists.');
        }

        if ($this->repository->existsByNif($command->getNif())) {
            throw new DuplicateOrganizerException('NIF already exists.');
        }

        // Crear Organizer
        $organizer = $this->mapper->toDomain($command);

        // Guardar Organizer
        $this->repository->save($organizer);
    }

    public function getRepository(): OrganizerRepositoryInterface
    {
        return $this->repository;
    }
}