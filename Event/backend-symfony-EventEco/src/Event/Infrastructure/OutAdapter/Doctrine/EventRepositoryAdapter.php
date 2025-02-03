<?php

namespace App\Event\Infrastructure\OutAdapter\Doctrine;

use App\Event\Domain\Entity\Event;
use App\Event\Domain\OutPort\EventRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class EventRepositoryAdapter implements EventRepositoryInterface
{
    private EntityRepository $repository;

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->repository = $this->entityManager->getRepository(Event::class);
    }

    public function findAll(): array
    {
        return $this->repository->findAll();
    }

    public function findByCategory(int $categoryId): array
    {
        return $this->repository->findBy(['idCategory' => $categoryId]);
    }
}