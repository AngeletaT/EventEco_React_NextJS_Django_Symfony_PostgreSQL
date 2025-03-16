<?php
// src/Pet/Domain/Repository/PetRepositoryInterface.php
namespace App\Pet\Domain\OutPort;

use App\Pet\Domain\Entity\Pet;

interface PetRepositoryInterface
{
    /**
     * Persiste la entidad Pet en la base de datos.
     *
     * @param Pet $pet
     * @return Pet
     */
    public function save(Pet $pet): Pet;
    
    // Se pueden definir otros métodos como find, update, delete, etc.
}
