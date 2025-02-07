<?php

namespace App\Organizer\Application\UseCase\InPort;

use App\Organizer\Application\DTO\Response\LogoutOrganizerResponse;

interface LogoutOrganizerInterface
{
    /**
     * Ejecuta el logout del organizer dado su identificador.
     *
     * @param int $organizerId
     * @return LogoutOrganizerResponse
     */
    public function logout(int $organizerId): LogoutOrganizerResponse;
}