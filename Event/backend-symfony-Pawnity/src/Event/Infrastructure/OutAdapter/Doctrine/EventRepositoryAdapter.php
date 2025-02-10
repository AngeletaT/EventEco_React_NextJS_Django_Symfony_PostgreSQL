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

    public function findAllPaginated(int $offset, int $limit): array
    {
        return $this->entityManager->createQueryBuilder()
            ->select('e')
            ->from(Event::class, 'e')
            ->orderBy('e.startDate', 'ASC')
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    public function countAll(): int
    {
        return $this->entityManager->getRepository(Event::class)
            ->createQueryBuilder('e')
            ->select('COUNT(e.idEvent)')
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function findByOrganizerId(int $orgId): array
    {
        return $this->repository->findBy(['orgId' => $orgId]);
    }

    public function save(Event $event): void
    {
        $this->entityManager->persist($event);
        $this->entityManager->flush();
    }
}