<?php

declare(strict_types=1);

namespace App\Organizer\Domain\OutPort;

use App\Organizer\Domain\Entity\ProfileOrganizer;

interface ProfileOrganizerRepositoryInterface
{
    /**
     * Busca el profile asociado a un organizer a partir de su id.
     *
     * @param int $idOrg
     * @return ProfileOrganizer|null Devuelve la entidad ProfileOrganizer si se encuentra, o null en caso contrario.
     */
    public function findOneByOrganizerId(int $idOrg): ?ProfileOrganizer;
}