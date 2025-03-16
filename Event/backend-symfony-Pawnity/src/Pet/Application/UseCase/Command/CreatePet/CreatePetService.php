<?php
// src/Pet/Application/UseCase/Command/CreatePet/CreatePetService.php
namespace App\Pet\Application\UseCase\Command\CreatePet;

use App\Pet\Domain\Entity\Pet;
use App\Pet\Infrastructure\OutAdapter\Doctrine\PetRepositoryAdapter;

class CreatePetService
{
    private PetRepositoryAdapter $repository;

    public function __construct(PetRepositoryAdapter $repository)
    {
        $this->repository = $repository;
    }

    public function create(Pet $pet): Pet
    {
        // Aquí se pueden aplicar validaciones y reglas de negocio
        // Por ejemplo, validar que el nombre no esté vacío, que la fecha de nacimiento sea válida, etc.
        return $this->repository->save($pet);
    }
}