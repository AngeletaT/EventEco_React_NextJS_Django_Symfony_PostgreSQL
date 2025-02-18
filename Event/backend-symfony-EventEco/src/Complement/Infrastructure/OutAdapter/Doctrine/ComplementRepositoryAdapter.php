<?php

namespace App\Complement\Infrastructure\OutAdapter\Doctrine;

use App\Complement\Domain\Entity\Complement;
use App\Complement\Domain\OutPort\ComplementRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;

class ComplementRepositoryAdapter implements ComplementRepositoryInterface
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
         $this->entityManager = $entityManager;
    }

    public function save(Complement $complement): void
    {
         $this->entityManager->persist($complement);
         $this->entityManager->flush();
    }

    public function find(int $id): ?Complement
    {
         return $this->entityManager->getRepository(Complement::class)->find($id);
    }
}