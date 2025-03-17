<?php
namespace App\Pet\Domain\OutPort;

use App\Pet\Domain\Entity\Sponsorship;

interface SponsorshipRepositoryInterface
{
    /**
     * Encuentra todas las suscripciones de un organizador.
     *
     * @param int $idOrg
     * @return Sponsorship[]
     */
    public function findByOrganizerId(int $idOrg): array;
}
