<?php
namespace App\Pet\Infrastructure\OutAdapter\Doctrine;

use App\Pet\Domain\Entity\Sponsorship;
use App\Pet\Domain\OutPort\SponsorshipRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;

class SponsorshipRepositoryAdapter implements SponsorshipRepositoryInterface
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function findByOrganizerId(int $idOrg): array
    {
        return $this->entityManager->getRepository(Sponsorship::class)
            ->createQueryBuilder('s')
            ->leftJoin('s.client', 'c')
            ->leftJoin('s.pet', 'p')
            ->where('s.idOrg = :idOrg')
            ->setParameter('idOrg', $idOrg)
            ->getQuery()
            ->getResult();
    }
}
