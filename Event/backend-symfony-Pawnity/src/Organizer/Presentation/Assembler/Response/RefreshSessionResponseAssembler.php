<?php

namespace App\Organizer\Presentation\Assembler\Response;

use App\Organizer\Application\DTO\Response\RefreshSessionResponse;

class RefreshSessionResponseAssembler
{
    /**
     * Transforma el DTO de respuesta en un array para la respuesta HTTP.
     *
     * @param RefreshSessionResponse $response
     * @return array
     */
    public function toArray(RefreshSessionResponse $response): array
    {
        return [
            'organizer'    => $response->getOrganizer(),
            'access_token' => $response->getAccessToken(),
        ];
    }
}