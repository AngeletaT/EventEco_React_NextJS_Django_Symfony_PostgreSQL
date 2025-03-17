<?php
// src/Pet/Domain/OutPort/PetRepositoryInterface.php
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

    /**
     * Encuentra un pet por su UUID.
     *
     * @param string $uuid
     * @return Pet|null
     */
    public function findByUuid(string $uuid): ?Pet;
}
