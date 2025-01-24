<?php

namespace App\Organizer\Infrastructure\OutAdapter\Doctrine;

use App\Organizer\Domain\Entity\Organizer;
use App\Organizer\Domain\OutPort\OrganizerRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;

/**
 * Adapter for OrganizerRepository to interact with the database using Doctrine ORM.
 */
class OrganizerRepositoryAdapter implements OrganizerRepositoryInterface
{
    private EntityManagerInterface $entityManager;

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

    public function existsByEmail(string $email): bool
    {
        $result = $this->entityManager->getRepository(Organizer::class)->findOneBy(['email' => $email]);
        return $result !== null;
    }

    public function existsByNif(string $nif): bool
    {
        $result = $this->entityManager->getRepository(Organizer::class)->findOneBy(['nif' => $nif]);
        return $result !== null;
    }
}