<?php
namespace App\Pet\Domain\OutPort;

use App\Pet\Domain\Entity\Adoption;

interface AdoptionRepositoryInterface
{
    /**
     * Encuentra todas las adopciones de un organizador.
     *
     * @param int $idOrg
     * @return Adoption[]
     */
    public function findByOrganizerId(int $idOrg): array;
}
