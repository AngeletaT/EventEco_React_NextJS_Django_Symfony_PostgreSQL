<?php

namespace App\Organizer\Application\UseCase\Command;

use App\Organizer\Application\InPort\CreateOrganizer;
use App\Organizer\Domain\Entity\Organizer;
use App\Organizer\Domain\OutPort\OrganizerRepositoryInterface;
use App\Organizer\Presentation\DTO\Request\CreateOrganizerRequest;
use App\Organizer\Presentation\DTO\Response\CreateOrganizerResponse;
use Symfony\Component\Uid\Uuid;
use App\Organizer\Domain\Exception\DuplicateOrganizerException;

/**
 * Handler for CreateOrganizerCommand
 */
class CreateOrganizerHandler implements CreateOrganizer
{
    private OrganizerRepositoryInterface $repository;

    public function __construct(OrganizerRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function handle(CreateOrganizerRequest $request): CreateOrganizerResponse
    {
        // Validar duplicados                   
        if ($this->repository->existsByEmail($request->email)) {
        throw new DuplicateOrganizerException('Email already exists.');
        }
        if ($this->repository->existsByNif($request->nif)) {
            throw new DuplicateOrganizerException('NIF already exists.');
        }

        // Crear organizador
        $organizer = new Organizer(
            Uuid::v4(),
            $request->email,
            password_hash($request->password, PASSWORD_BCRYPT),
            $request->nif
        );

        // Guardar en el repositorio
        $this->repository->save($organizer);

        // Crear respuesta
        return new CreateOrganizerResponse(
            (string) $organizer->getIdOrg(),
            $organizer->getUuid(),
            $organizer->getEmail(),
            $organizer->getNif(),
            $organizer->isActive(),
            $organizer->getCreatedAt()->format('Y-m-d H:i:s'),
            $organizer->getUpdatedAt()->format('Y-m-d H:i:s')
        );
    }
}