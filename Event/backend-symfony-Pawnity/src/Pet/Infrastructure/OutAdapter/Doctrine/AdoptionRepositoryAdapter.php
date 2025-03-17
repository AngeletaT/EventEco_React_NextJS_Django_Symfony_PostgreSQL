<?php
namespace App\Pet\Infrastructure\OutAdapter\Doctrine;

use App\Pet\Domain\Entity\Adoption;
use App\Pet\Domain\OutPort\AdoptionRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;

class AdoptionRepositoryAdapter implements AdoptionRepositoryInterface
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function findByOrganizerId(int $idOrg): array
    {
        return $this->entityManager->getRepository(Adoption::class)
            ->createQueryBuilder('a')
            ->leftJoin('a.client', 'c')
            ->leftJoin('a.pet', 'p')
            ->where('a.idOrg = :idOrg')
            ->setParameter('idOrg', $idOrg)
            ->getQuery()
            ->getResult();
    }
}
