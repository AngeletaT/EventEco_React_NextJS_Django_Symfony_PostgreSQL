<?php
// src/Pet/Infrastructure/OutAdapter/Doctrine/PetRepositoryAdapter.php
namespace App\Pet\Infrastructure\OutAdapter\Doctrine;

use App\Pet\Domain\Entity\Pet;
use App\Pet\Domain\OutPort\PetRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;

class PetRepositoryAdapter implements PetRepositoryInterface
{
    private EntityManagerInterface $entityManager;
    
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    
    /**
     * Persiste la entidad Pet usando Doctrine.
     *
     * @param Pet $pet
     * @return Pet
     */
    public function save(Pet $pet): Pet
    {
        $this->entityManager->persist($pet);
        $this->entityManager->flush();
        
        return $pet;
    }
}
