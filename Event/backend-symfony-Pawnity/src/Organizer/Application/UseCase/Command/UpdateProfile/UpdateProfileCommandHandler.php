<?php

declare(strict_types=1);

namespace App\Organizer\Application\UseCase\Command\UpdateProfile;

use App\Organizer\Application\DTO\Response\UpdateProfileResponse;

class UpdateProfileCommandHandler
{
    private UpdateProfileComandService $service;

    public function __construct(UpdateProfileComandService $service)
    {
        $this->service = $service;
    }

    /**
     * Método invocable que procesa el comando y retorna el DTO de respuesta.
     *
     * @param UpdateProfileCommand $command
     * @return UpdateProfileResponse
     */
    public function __invoke(UpdateProfileCommand $command): UpdateProfileResponse
    {
        return $this->service->updateProfile($command->getUpdateProfileRequest());
    }
}