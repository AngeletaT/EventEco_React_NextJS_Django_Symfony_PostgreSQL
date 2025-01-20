<?php

namespace App\Organizer\Infrastructure\Repository;

use App\Organizer\Domain\Entity\Organizer;
use App\Organizer\Domain\Repository\OrganizerRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;

/**
 * Doctrine implementation of OrganizerRepositoryInterface
 */
class OrganizerRepository implements OrganizerRepositoryInterface
{
    private EntityManagerInterface $entityManager;

    /**
     * Constructor
     *
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function save(Organizer $organizer): void
    {
        $this->entityManager->persist($organizer);
        $this->entityManager->flush();
    }

    public function findById(int $idOrg): ?Organizer
    {
        return $this->entityManager->getRepository(Organizer::class)->find($idOrg);
    }

    public function findByUuid(string $uuid): ?Organizer
    {
        return $this->entityManager->getRepository(Organizer::class)->findOneBy(['uuid' => $uuid]);
    }
}