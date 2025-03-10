<?php

namespace App\Organizer\Application\UseCase\Command\Register;

use App\Organizer\Application\Mapper\OrganizerMapper;
use App\Organizer\Domain\Exception\DuplicateOrganizerException;
use App\Organizer\Domain\OutPort\OrganizerRepositoryInterface;

class RegisterOrganizerHandler
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

    public function handle(RegisterOrganizerCommand $command): void
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