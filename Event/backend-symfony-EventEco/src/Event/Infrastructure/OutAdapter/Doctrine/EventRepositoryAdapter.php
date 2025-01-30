<?php

namespace App\Event\Infrastructure\OutAdapter\Doctrine;

use App\Event\Domain\Entity\Event;
use App\Event\Domain\OutPort\EventRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

/**
 * Doctrine repository for Event entity
 */
class EventRepositoryAdapter implements EventRepositoryInterface
{
    private EntityRepository $repository;

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->repository = $this->entityManager->getRepository(Event::class);
    }

    /**
     * Get all events from the database.
     *
     * @return Event[]
     */
    public function findAll(): array
    {
        return $this->repository->findAll();
    }
}