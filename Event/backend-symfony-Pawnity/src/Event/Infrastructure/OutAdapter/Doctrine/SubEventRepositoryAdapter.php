<?php

namespace App\Event\Infrastructure\OutAdapter\Doctrine;

use App\Event\Domain\Entity\SubEvent;
use App\Event\Domain\OutPort\SubEventRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;

class SubEventRepositoryAdapter implements SubEventRepositoryInterface
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
         $this->entityManager = $entityManager;
    }

    public function save(SubEvent $subEvent): void
    {
         $this->entityManager->persist($subEvent);
         $this->entityManager->flush();
    }

    public function find(int $id): ?SubEvent
    {
         return $this->entityManager->getRepository(SubEvent::class)->find($id);
    }
}