<?php

namespace App\Organizer\Application\Handler\Command;

use App\Organizer\Application\Command\CreateOrganizerCommand;
use App\Organizer\Application\DTO\Response\CreateOrganizerResponse;
use App\Organizer\Domain\Entity\Organizer;
use App\Organizer\Domain\Repository\OrganizerRepositoryInterface;
use Symfony\Component\Uid\Uuid;

/**
 * Handles the creation of an organizer.
 */
class CreateOrganizerHandler
{
    private OrganizerRepositoryInterface $repository;

    /**
     * Constructor
     *
     * @param OrganizerRepositoryInterface $repository
     */
    public function __construct(OrganizerRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Handles the creation of a new organizer.
     *
     * @param CreateOrganizerCommand $command
     * @return CreateOrganizerResponse
     */
    public function handle(CreateOrganizerCommand $command): CreateOrganizerResponse
    {
        // Generate a UUID for the organizer
        $uuid = Uuid::v4();

        // Create the Organizer entity
        $organizer = new Organizer(
            $uuid,
            $command->getName(),
            $command->getEmail(),
            $command->getPassword(),
            $command->getNif(),
            $command->getAddress(),
            $command->getUrlLogo(),
            $command->getDescription(),
            $command->getUrlWeb(),
            $command->getUrlImage()
        );

        // Persist the Organizer entity
        $this->repository->save($organizer);

        // Create the response DTO
        return new CreateOrganizerResponse(
            $organizer->getIdOrg(),
            (string) $organizer->getUuid(),
            $organizer->getName(),
            $organizer->getEmail(),
            $organizer->getNif(),
            $organizer->getAddress(),
            $organizer->getUrlLogo(),
            $organizer->getDescription(),
            $organizer->getUrlWeb(),
            $organizer->getUrlImage(),
            $organizer->isActive(),
            $organizer->getCreatedAt()->format('Y-m-d H:i:s'),
            $organizer->getUpdatedAt()->format('Y-m-d H:i:s')
        );
    }
}