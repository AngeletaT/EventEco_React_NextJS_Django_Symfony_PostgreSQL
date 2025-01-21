<?php

namespace App\Organizer\Application\Service;

use App\Organizer\Domain\Entity\Organizer;
use App\Organizer\Domain\Repository\OrganizerRepositoryInterface;
use Symfony\Component\Uid\Uuid;

/**
 * Service to handle organizer business logic.
 */
class OrganizerService
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
     * Creates a new Organizer entity and persists it.
     *
     * @param string $email
     * @param string $password
     * @param string $nif
     * @return Organizer
     */
    public function createOrganizer(
        string $email,
        string $password,
        string $nif
    ): Organizer {
        $uuid = Uuid::v4();

        $organizer = new Organizer(
            $uuid,
            $email,
            $password,
            $nif
        );

        $this->repository->save($organizer);

        return $organizer;
    }
}