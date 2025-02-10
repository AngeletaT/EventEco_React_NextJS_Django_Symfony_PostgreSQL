<?php

namespace App\Organizer\Presentation\Assembler\Response;

use App\Organizer\Application\DTO\Response\LoginOrganizerResponse;

class LoginOrganizerResponseAssembler
{
    /**
     * Convierte el DTO de respuesta en un array asociativo para la salida JSON.
     *
     * @param LoginOrganizerResponse $response
     * @return array
     */
    public static function assemble(LoginOrganizerResponse $response): array
    {
        return [
            'accesstoken'  => $response->getAccessToken(),
        ];
    }
}