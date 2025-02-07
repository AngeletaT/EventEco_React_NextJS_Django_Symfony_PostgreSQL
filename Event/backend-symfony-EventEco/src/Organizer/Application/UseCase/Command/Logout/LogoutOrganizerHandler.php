<?php

namespace App\Organizer\Application\UseCase\Command\Logout;

use App\Organizer\Application\DTO\Response\LogoutOrganizerResponse;
use App\Organizer\Application\UseCase\InPort\LogoutOrganizerInterface;

class LogoutOrganizerHandler
{
    private LogoutOrganizerInterface $logoutOrganizerService;

    public function __construct(LogoutOrganizerInterface $logoutOrganizerService)
    {
        $this->logoutOrganizerService = $logoutOrganizerService;
    }

    /**
     * Ejecuta el caso de uso de logout a partir del comando y retorna un DTO de respuesta.
     *
     * @param LogoutOrganizerCommand $command
     * @return LogoutOrganizerResponse
     */
    public function __invoke(LogoutOrganizerCommand $command): LogoutOrganizerResponse
    {
        return $this->logoutOrganizerService->logout($command->getOrganizerId());
    }
}