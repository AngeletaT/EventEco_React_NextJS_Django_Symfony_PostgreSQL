<?php

namespace App\Organizer\Domain\Service;

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
     * @param string $name
     * @param string $email
     * @param string $password
     * @param string $nif
     * @param string|null $address
     * @param string|null $urlLogo
     * @param string|null $description
     * @param string|null $urlWeb
     * @param string|null $urlImage
     * @return Organizer
     */
    public function createOrganizer(
        string $name,
        string $email,
        string $password,
        string $nif,
        ?string $address,
        ?string $urlLogo,
        ?string $description,
        ?string $urlWeb,
        ?string $urlImage
    ): Organizer {
        $uuid = Uuid::v4();

        $organizer = new Organizer(
            $uuid,
            $name,
            $email,
            $password,
            $nif,
            $address,
            $urlLogo,
            $description,
            $urlWeb,
            $urlImage
        );

        $this->repository->save($organizer);

        return $organizer;
    }
}