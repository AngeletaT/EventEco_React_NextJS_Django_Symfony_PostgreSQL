<?php

declare(strict_types=1);

namespace App\Organizer\Infrastructure\OutAdapter\Doctrine;

use App\Organizer\Domain\Entity\ProfileOrganizer;
use App\Organizer\Domain\OutPort\ProfileOrganizerRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Organizer\Domain\Entity\Organizer;

class ProfileOrganizerRepositoryAdapter implements ProfileOrganizerRepositoryInterface
{
    private EntityManagerInterface $entityManager;
    
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    
    /**
     * Busca el profile asociado a un organizer a partir de su id utilizando métodos del ORM.
     *
     * @param int $idOrg
     * @return ProfileOrganizer|null
     */
    public function findOneByOrganizerId(int $idOrg): ?ProfileOrganizer
    {
        // Se obtiene una referencia al organizer sin necesidad de cargar toda la entidad.
        $organizerReference = $this->entityManager->getReference(Organizer::class, $idOrg);

        // Se utiliza el repositorio de Doctrine para buscar el ProfileOrganizer asociado.
        return $this->entityManager
            ->getRepository(ProfileOrganizer::class)
            ->findOneBy(['organizer' => $organizerReference]);
    }
}