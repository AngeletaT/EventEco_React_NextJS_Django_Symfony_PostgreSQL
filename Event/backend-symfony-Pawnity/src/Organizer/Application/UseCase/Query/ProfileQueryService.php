<?php

declare(strict_types=1);

namespace App\Organizer\Application\UseCase\Query;

use App\Organizer\Application\DTO\Request\ProfileRequest;
use App\Organizer\Application\DTO\Response\ProfileResponse;
use App\Organizer\Application\UseCase\InPort\ProfileInterface;
use App\Organizer\Domain\OutPort\ProfileOrganizerRepositoryInterface;
use App\Organizer\Domain\Exception\ProfileNotFoundException;

class ProfileQueryService implements ProfileInterface
{
    private ProfileOrganizerRepositoryInterface $profileRepository;

    public function __construct(ProfileOrganizerRepositoryInterface $profileRepository)
    {
        $this->profileRepository = $profileRepository;
    }

    /**
     * Obtiene el profile del organizer a partir del id contenido en ProfileRequest.
     *
     * @param ProfileRequest $profileRequest
     * @return ProfileResponse
     * @throws ProfileNotFoundException Si no se encuentra un profile para el organizer.
     */
    public function profile(ProfileRequest $profileRequest): ProfileResponse
    {
        $idOrg = $profileRequest->getIdOrg();
        
        // Se busca el profile mediante el repositorio. Se asume que este método devuelve la entidad o null.
        $profileOrganizer = $this->profileRepository->findOneByOrganizerId($idOrg);
        
        if (null === $profileOrganizer) {
            throw new ProfileNotFoundException(sprintf('No se encontró el profile para el Organizer con id %d.', $idOrg));
        }

        // Se mapea la entidad al DTO de respuesta.
        return new ProfileResponse(
            $profileOrganizer->getIdProfileOrg(),
            $profileOrganizer->getOrganizer()->getIdOrg(),
            $profileOrganizer->getName(),
            $profileOrganizer->getAddress(),
            $profileOrganizer->getUrlLogo(),
            $profileOrganizer->getDescription(),
            $profileOrganizer->getUrlWeb(),
            $profileOrganizer->getUrlImage(),
            $profileOrganizer->getCreatedAt(),
            $profileOrganizer->getUpdatedAt()
        );
    }
}