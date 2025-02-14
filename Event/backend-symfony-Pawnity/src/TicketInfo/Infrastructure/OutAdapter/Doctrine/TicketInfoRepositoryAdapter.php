<?php

namespace App\TicketInfo\Infrastructure\OutAdapter\Doctrine;

use App\TicketInfo\Domain\Entity\TicketInfo;
use App\TicketInfo\Domain\OutPort\TicketInfoRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;

class TicketInfoRepositoryAdapter implements TicketInfoRepositoryInterface
{
    private EntityManagerInterface $entityManager;
    
    public function __construct(EntityManagerInterface $entityManager)
    {
         $this->entityManager = $entityManager;
    }
    
    public function save(TicketInfo $ticketInfo): void
    {
         // Persistir y aplicar flush para guardar los cambios en la BD.
         $this->entityManager->persist($ticketInfo);
         $this->entityManager->flush();
    }
    
    public function find(int $id): ?TicketInfo
    {
         return $this->entityManager->getRepository(TicketInfo::class)->find($id);
    }

    public function findByEventSlug(string $eventSlug): array
    {
         return $this->entityManager
                     ->getRepository(TicketInfo::class)
                     ->findBy(['eventSlug' => $eventSlug]);
    }

    public function findOneByEventSlugAndType(string $eventSlug, string $type): ?TicketInfo
    {
         return $this->entityManager
                     ->getRepository(TicketInfo::class)
                     ->findOneBy([
                         'eventSlug' => $eventSlug,
                         'type' => $type
                     ]);
    }
}