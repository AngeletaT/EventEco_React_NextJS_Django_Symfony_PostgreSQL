<?php

declare(strict_types=1);

namespace App\Organizer\Application\UseCase\Command\UpdateProfile;

use App\Organizer\Application\DTO\Request\UpdateProfileRequest;
use App\Organizer\Application\DTO\Response\UpdateProfileResponse;
use App\Organizer\Application\UseCase\InPort\UpdateProfileInterface;
use App\Organizer\Domain\OutPort\ProfileOrganizerRepositoryInterface;
use App\Organizer\Domain\Exception\ProfileNotFoundException;

class UpdateProfileComandService implements UpdateProfileInterface
{
    private ProfileOrganizerRepositoryInterface $profileRepository;

    public function __construct(ProfileOrganizerRepositoryInterface $profileRepository)
    {
        $this->profileRepository = $profileRepository;
    }

    public function updateProfile(UpdateProfileRequest $request): UpdateProfileResponse
    {
        // Buscar el profile del organizer usando el id extraído del token.
        $profile = $this->profileRepository->findOneByOrganizerId($request->getIdOrg());
        if (null === $profile) {
            throw new ProfileNotFoundException(sprintf('Profile no encontrado para el organizer id %d.', $request->getIdOrg()));
        }

        // Actualizar solo los campos que se hayan enviado (todos son opcionales).
        if (null !== $request->getName()) {
            $profile->setName($request->getName());
        }
        if (null !== $request->getAddress()) {
            $profile->setAddress($request->getAddress());
        }
        if (null !== $request->getUrlLogo()) {
            $profile->setUrlLogo($request->getUrlLogo());
        }
        if (null !== $request->getDescription()) {
            $profile->setDescription($request->getDescription());
        }
        if (null !== $request->getUrlWeb()) {
            $profile->setUrlWeb($request->getUrlWeb());
        }
        if (null !== $request->getUrlImage()) {
            $profile->setUrlImage($request->getUrlImage());
        }

        // Persistir los cambios (se asume que el repositorio gestiona el flush).
        $this->profileRepository->save($profile);

        return new UpdateProfileResponse(
            $profile->getIdProfileOrg(),
            $profile->getOrganizer()->getIdOrg(),
            $profile->getName(),
            $profile->getAddress(),
            $profile->getUrlLogo(),
            $profile->getDescription(),
            $profile->getUrlWeb(),
            $profile->getUrlImage(),
            $profile->getCreatedAt(),
            $profile->getUpdatedAt()
        );
    }
}